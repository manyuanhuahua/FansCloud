const express = require('express')

const {setTokenCookie, requireAuth}= require('../../utils/auth');
const {User, Song, Comment} = require('../../db/models')

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation');
const { ResultWithContext } = require('express-validator/src/chain');
// const { Op } = require('sequelize');

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


    const validateComment = [
            check('body')
                .exists({ checkFalsy: true })
                .withMessage('Comment body is required.'),
            handleValidationErrors
        ];


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


router.delete('/:songId', requireAuth,async (req, res, next)=>{
    const { songId } = req.params
    const song = await Song.findByPk(songId)

    const id = req.user.dataValues.id
    const artist = await User.findByPk(id)
    if(song){
        // check if current user is the album's owner and if it is an artist
        if (artist.isArtist && id === song.userId){

            await song.destroy()
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            })
        }else{
            const err = new Error("Forbidden");
            err.title= 'Permission Unauthorized';
            err.errors = ['Permission Unauthorized'];
            err.status = 403;
            return next(err)
        }
    }else{
        const err = new Error("Song couldn't be found")
        err.status = 404
        return next(err)
    }
})


router.put('/:songId', validateSong, async(req,res,next)=>{
    const { songId } = req.params
    const song = await Song.findByPk(songId)

    const { title, description, audioUrl, previewImage} = req.body

    const id = req.user.dataValues.id
    const artist = await User.findByPk(id)
    if(song){
        // check if current user is the album's owner and if it is an artist
        if (artist.isArtist && id === song.userId){
            song.update({
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
        const err = new Error("Song couldn't be found")
        err.status = 404
        return next(err)
    }



})


router.get('/:songId/comments', async(req, res, next)=>{
    const { songId } = req.params

    const comments = await Comment.scope('userScope').findAll({where:{songId}})

    if(comments.length){
        return res.json(
            {'Comments' : comments})
    }else{
        const err = new Error("Song couldn't be found");
        err.status = 404;
        err.title = 'Find song failed';
        // err.errors=['The song id is invalid.'];
        return next(err);
    }
})


router.post('/:songId/comments/new',requireAuth, validateComment, async(req, res, next)=>{
    const { songId } = req.params
    const song = await Song.findByPk(songId)
    const { body } = req.body

    const userId = req.user.dataValues.id

    if(song){
        const comment = await Comment.create({
            userId,
            songId,
            body
        })
        res.json(comment)
    }else{
        const err = new Error("Song couldn't be found");
        err.status = 404;
        err.title = 'Find song failed';
        // err.errors=['The song id is invalid.'];
        return next(err);
    }
})







module.exports= router
