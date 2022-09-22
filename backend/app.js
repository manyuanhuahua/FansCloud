const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser  = require('cookie-parser')

const { environment }= require('./config');
const isProduction = environment === 'production';

const app = express();

const routes = require('./routes');
// const { routes } = require('./routes');
// const { HostNotFoundError } = require('sequelize');

const { ValidationError } = require('sequelize');



app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if(!isProduction){
    app.use(cors());
    //cors policy debug
    // app.use(
    //     cors({
    //       credentials: true,
    //       methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //       allowedHeaders: ['Content-Type', 'Authorization'],
    //       origin: ['http://localhost:3000', 'http://localhost:8000'], // whatever ports you used in frontend
    //     })
    //   );

}//enable cors only in development



app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}));



app.use(
    csurf({
        cookie:{
            secure:isProduction,
            sameSite:isProduction && 'Lax',
            httpOnly: true
        }
    })
);

app.use(routes);




//resource not found error
app.use((_req,_res,next)=>{
    const err = new Error("The requested resource couldn't be HostNotFoundError.");
    err.title = "Resource not found";
    err.errors = ["The requested resource couldn't be found"];
    err.status = 404;
    next(err);
});

//sequelize error
app.use((err, _req, _res, next)=>{
    if(err instanceof ValidationError){
        err.errors = err.errors.map((e)=>e.message);
        err.title = "Validation error";
    }
    next(err);
});

//error format error
app.use((err,_req,res,_next)=>{
    res.status(err.status || 500);
    console.log(err);
    res.json({
        // title: err.title || "Server Error",
        statusCode: err.status || 500,
        message: err.message,
        errors: err.errors,
        // stack: isProduction ? null : err.stack

    })
});


module.exports = app
