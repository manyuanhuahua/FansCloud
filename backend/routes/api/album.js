const express = require('express')
const {User, Song, Album} = require('../../db/models');
const { route } = require('./song');

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')
const {requireAuth,createrAuth}=require('../../utils/auth')


const router = express.Router();

const validateSong = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Song title is required.'),

    check('audioUrl')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required.'),

    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Descrtiption is required.'),
    handleValidationErrors
];



router.post('/:albumId/new',requireAuth, validateSong, async(req, res, next)=>{
    const { albumId } = req.params
    const { title, description, audioUrl, previewImage } = req.body
    const album = await Album.findOne({
        where:{
            id: albumId
        }
    })
    
    const id = req.user.dataValues.id
    const artist = await User.findByPk(id)
    if(album){
        // check if current user is the album's owner and if it is an artist
        if (artist.dataValues.isArtist && id === album.userId){
            const song = await Song.create({
                'userId': album.userId,
                'albumId': album.id,
                title,
                description,
                audioUrl,
                previewImage
            })
            res.json(song)
        }else{
            const err = new Error("Forbidden");
            err.title= 'Permission Unauthorized';
            err.errors = ['Permission Unauthorized'];
            err.status = 403;
            return next(err)
        }
    }else{
        const err = new Error("Album couldn't be found")
        err.status = 404;
        next(err)
    }
})









module.exports= router
