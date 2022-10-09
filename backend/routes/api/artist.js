const express = require('express')
const {User, Song, Album, Playlist} = require('../../db/models');
const { route } = require('./song');
require('dotenv').config();
const { sequelize } = require('../../db/models');

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')
const {requireAuth}=require('../../utils/auth')
// const { Model } = require('sequelize/types');
const { Op } = require('sequelize');

// const { sequelize } = require('sequelize');

//Get details of an Artist from an id
const router = express.Router();

router.get('/:userId', async (req, res, next)=>{
    const {userId} = req.params




const artist = await User.findByPk(userId)
if(!artist){
    const err = new Error("Artist couldn't be found")
    err.status = 404
    next(err)
}

const artistData = artist.toJSON()
    const totalAlbum = await Album.count({
        where:{userId},
    })

    const totalSong = await Song.count({
        where:{userId},
    })
    res.json({
        id: artistData.id,
        username: artistData.username,
        totalSongs: totalSong,
        totalAlbum: totalAlbum,
        previewImage: artistData.previewImage
    })


})

//Get all Songs of an Artist from an id
router.get('/:userId/songs', async (req, res, next)=>{
    const { userId } = req.params

    const songs = await Song.findAll({
        where:{
            userId
        }
    })

    if(songs.length){
        res.json({
            Songs: songs})
    }else{
        const err = new Error("Artist couldn't be found")
        err.status= 404
        next(err)
    }
})


//Get all Albums of an Artist from an id
router.get('/:userId/albums', async (req, res, next)=>{
    const { userId }= req.params
    const albums = await Album.findAll({
        where:{
            userId
        }
    })

    if(albums.length){
        res.json({
            Albums: albums
        })
    }else{
        const err = new Error("Artist couldn't be found")
        err.status= 404
        next(err)
    }
})


//Get all Playlists of an Artist from an id
router.get('/:userId/playlists', async (req, res, next)=>{
    const {userId} = req.params
    const playlists = await Playlist.findAll({
        where:{
            userId
        }
    })

    if(playlists.length){
        res.json({
            Playlists: playlists
        })
    }else{
        const err = new Error("Artist couldn't be found")
        err.status= 404
        next(err)
    }
})



module.exports= router
