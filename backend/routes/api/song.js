const express = require('express')

const {setTokenCookie, requireAuth}= require('../../utils/auth');
const {User, Album, Song} = require('../../db/models')

const {check}=require('express-validator');
const {handleValidationErrors, emailExistedErrors,usernameExistedErrors}=require('../../utils/validation')
const { Op } = require('sequelize');


const router = express.Router();

router.get('/',async (req,res)=>{
    const songs = await Song.findAll()
    if(songs.length){
        return res.json(songs)
    }else{
        return res.json({})
    }

})

module.exports= router
