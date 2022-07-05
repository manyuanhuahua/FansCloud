const express = require('express')



const {setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User }= require('../../db/models');

const { check }=require('express-validator');
const { handleValidationErrors} = require('../../utils/validation')

const router = express.Router();




//user logout api route
router.delete('/',(_req, res)=>{
    res.clearCookie('token');
    return res.json({message:'success'})
})





const validateLogin = [
  check('credential')
  .exists({ checkFalsy: true })
  .notEmpty()
  .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
]

//custom(validator)
/*
app.post(
  '/create-user',
  check('password').exists(),
  check(
    'passwordConfirmation',
    'passwordConfirmation field must have the same value as the password field',
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
  loginHandler,
);
*/



router.post('/', validateLogin, async (req,res,next)=>{
    const { credential, password, token }= req.body;
    console.log(token)
    const user = await User.login({ credential, password });


    if(!user){
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Login failed';
        err.errors=['The provided credentials were invalid.'];
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
        id : user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: ''
    })
})

router.get('/currentUser',restoreUser,async (req,res)=>{


    if(req.user){
        return res.json(
            req.user
        )
    }else return res.json({})
})







module.exports = router;
