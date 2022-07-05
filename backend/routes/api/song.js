const express = require('express')

// const {setTokenCookie, requireAuth}= require('../../utils/auth');
const {User, Album, Song} = require('../../db/models')

// const {check}=require('express-validator');
// const {handleValidationErrors, emailExistedErrors,usernameExistedErrors}=require('../../utils/validation')
// const { Op } = require('sequelize');


const router = express.Router();

router.get('/',async (req,res)=>{
    const songs = await Song.findAll()
    if(songs.length){
        return res.json(songs)
    }else{
        return res.json({})
    }

})

router.get('/:songId',async (req,res,next)=>{
    const { songId } = req.params

    Song.addScope('artistScope',{

            include: [{
              model: User,
              where: {
                isArtist: true
            },
            attributes: ['id','username','previewImage'],

            }],
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
        const err = new Error("Song couldn't be found");
        err.status = 404;
        err.title = 'Find song failed';
        // err.errors=['The song id is invalid.'];
        return next(err);
    }

})



module.exports= router
