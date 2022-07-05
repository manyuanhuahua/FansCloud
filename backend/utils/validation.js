const { validationResult } = require('express-validator');
const handleValidationErrors = (req, _res, next)=>{
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        const errors = validationErrors
                .array()
                .map((error)=>(`${error.param}: ${error.msg}`))[0];

        const err = Error('Bad request.');
        err.errors=errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err)
    };
    next();


};

const emailExistedErrors = (req, _res, next)=>{
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        const errors = validationErrors
                .array()
                .map((error)=>(`${error.param}: ${error.msg}`))[1];

        const err = Error('User already exists');
        err.errors= errors;
        err.status = 403;
        err.title = 'Bad request.';
        next(err)
    };
    next();


};

const usernameExistedErrors = (req, _res, next)=>{
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        const errors = validationErrors
                .array()
                .map((error)=>(`${error.param}: ${error.msg}`))[2];

        const err = Error('User already exists');
        err.errors= errors;
        err.status = 403;
        err.title = 'Bad request.';
        next(err)
    };
    next();


};







module.exports={
    handleValidationErrors,
    emailExistedErrors,
    usernameExistedErrors
}
