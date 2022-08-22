const express = require('express')
const {User, Song, Album, Playlist, SongPlaylist} = require('../../db/models');
const { route } = require('./song');
require('dotenv').config();
const { sequelize } = require('../../db/models');

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')
const {requireAuth, properAuth}=require('../../utils/auth')
// const { Model } = require('sequelize/types');
const { Op, Model } = require('sequelize');
const router = express.Router();



const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Playlist name is required.'),

    check('previewImage')
        .exists({ checkFalsy: true })
        .withMessage('Playlist preview image is required.'),
    handleValidationErrors
];


router.get('/',async(req, res, next)=>{
    const playlists = await Playlist.findAll()
    if(playlists){
        res.json(playlists)
    }else{
        res.json({})
    }
})



router.post('/new', requireAuth, validatePlaylist, async(req, res, next)=>{
    const { name, previewImage } = req.body
    const userId = req.user.toJSON().id

    const playlist = await Playlist.create({
        userId,
        name,
        previewImage
    })
    res.json(playlist)
})


//Add a Song to a Playlist based on the Playlists's id

router.post('/:playlistId/new', requireAuth, async(req, res, next)=>{
    const { playlistId }= req.params
    const playlist = await Playlist.findByPk(playlistId)
    // console.log(`PLAYLIST--ID---${playlistId}`)


    if(!playlist){
        const err = new Error("Playlist couldn't be found")
        err.status = 404
        next(err)
    }


    const { songId } = req.body
    const song = await Song.findByPk(songId)
    if(!song){
        const err = new Error("Song couldn't be found")
        err.status = 404
        next(err)
    }



    const user = req.user.toJSON()
    if(user.id === playlist.userId ){


        const songPlaylist = await SongPlaylist.create({
            playlistId: parseInt(playlistId),
            songId: parseInt(songId)
        })



        // const test = await SongPlaylist.findByPk(5)
        console.log(songPlaylist.toJSON())
        res.json({
            id: songPlaylist.id,
            playlistId: songPlaylist.playlistId,
            songId: songPlaylist.songId
        })
    }else{
        return next(properAuth())
    }

})


//Get details of a Playlist from an id
router.get('/:playlistId', async (req, res, next)=>{
    const {playlistId}= req.params
    const playlist = await Playlist.findByPk(playlistId,{
        include:{
            model: Song,
            through:{
                attributes:[]
            }
        },

    })
    if(playlist){
        res.json(playlist)
    }else{
        const err = new Error( "Playlist couldn't be found")
        err.status = 404
        next(err)
    }
})


//Edit a Playlist
router.put('/:playlistId', requireAuth, validatePlaylist, async (req, res, next)=>{
    const { playlistId }= req.params
    const {name, previewImage}=req.body

    const playlist = await Playlist.findByPk(playlistId)

    const id = req.user.toJSON().id
    const artist = await User.findByPk(id)
    if(playlist){
        if(playlist.userId === id){
        playlist.update({
            name,
            previewImage
        })
        res.json(playlist)
    }else{
        return next(properAuth())
    }
    }else{
        const err = new Error("Playlist couldn't be found")
        err.status = 404
        return next(err)
    }
})


//Delete a Playlist
router.delete('/:playlistId',requireAuth,async(req, res, next)=>{
    const {playlistId}= req.params
    const playlist = await Playlist.findByPk(playlistId)

    const id = req.user.toJSON().id
    const artist = await User.findByPk(id)

    if(playlist){
        if(playlist.userId === id){
        await playlist.destroy()
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })}else{
            return next(properAuth())
        }
    }else{
        const err = new Error("Playlist couldn't be found")
        err.status = 404
        return next(err)
    }
})


module.exports= router
