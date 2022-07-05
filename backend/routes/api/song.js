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

router.get('/:songId',async (req,res)=>{
    const { songId } = req.params

    Song.addScope('artistScope',{

            include: [{
              model: User,
              where: {
                isArtist: true
              },
              attributes: ['id','username','previewImage']
            }]
          });
    Song.addScope('albumScope',{
          include:[{
            model: Album,
            attributes: ['id','title','previewImage']
          }]
          });

    const song = await Song.scope('artistScope','albumScope').findOne({where:{id : songId},})

    if(song){
        return res.json(song)
    }else{
        return res.json({})
    }

})



module.exports= router
