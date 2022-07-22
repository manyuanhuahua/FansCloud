const express = require('express')

const {setTokenCookie}= require('../../utils/auth');
const {User} = require('../../db/models')

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')



const router = express.Router();



const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('email')
        .custom(async function(email){
            const existedEmail = await User.findOne({where:{email,}})
            if(existedEmail) return Promise.reject('Email is also exist')
        })
        .withMessage('User with that email already exists'),


    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('username')
        .custom(async function(username){
            const existedUserName = await User.findOne({where: {username}})
            if(existedUserName) return Promise.reject('Username is also exist')
        })
        .withMessage('User with that username already exists'),


        check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
        check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
        check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required.'),
        check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required.'),
        handleValidationErrors

    ];


router.post('/',validateSignup,async (req,res)=>{
  const {email, password, username, firstName, lastName, isArtist, previewImage}=req.body;



  const user = await User.signup({email, username, password, firstName, lastName, isArtist, previewImage});



  await setTokenCookie(res, user);

  return res.json({
    id : user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    token: ''
  })
})






module.exports= router
