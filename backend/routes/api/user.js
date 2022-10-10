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
    check('email')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Please provide an email address with at least 3 characters.'),
    check('email')
        .exists({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage('Please provide an email address with maximum 50 characters.'),

    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Please provide a username with maximum 30 characters.'),
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
    check('previewImage')
        .custom(async function(previewImage){

            const split = previewImage.split('.')
            const last=split[(split.length)-1]
            const suffix = ['jpg','png','jpeg']
            if(suffix.indexOf(last) == -1 ) return Promise.reject('Profile image need to be .jpg/.jpeg/.png format.')
        })
        .withMessage('Profile image need to be .jpg/.jpeg/.png format.'),
        handleValidationErrors

    ];


router.post('/',validateSignup,async (req,res)=>{
  const {email, password, username, firstName, lastName, previewImage}=req.body;



  const user = await User.signup({email, username, password, firstName, lastName, previewImage});



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

//get all users
// router.get('/',validateSignup,async (req,res)=>{
//     const users= await User.findAll()
//     if(users){
//         return
//     }
// })



module.exports= router
