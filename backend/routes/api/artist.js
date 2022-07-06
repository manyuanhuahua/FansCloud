const express = require('express')
const {User, Song, Album} = require('../../db/models');
const { route } = require('./song');
require('dotenv').config();
const { sequelize } = require('../../db/models');

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')
const {requireAuth}=require('../../utils/auth')
// const { Model } = require('sequelize/types');
const { Op } = require('sequelize');
const user = require('../../db/models/user');
// const { sequelize } = require('sequelize');


const router = express.Router();

router.get('/:userId', async (req, res, next)=>{
    const {userId} = req.params

    const artist = await User.findByPk(userId,{
        include:{
            model: Song
        },
        attributes:{
            include:[
            [sequelize.fn('COUNT', sequelize.col('Songs.id')), "totalSongs"]]
        },
})

    if(!artist.length){
        const err = new Error("Artist couldn't be found")
        err.status = 404
        next(err)
    }
    const totalAlbum = await Album.count({where:{userId}})

    const artistData = artist.toJSON()

    res.json({
        id: artistData.id,
        username: artistData.username,
        totalSongs: artistData.totalSongs,
        totalAlbum: totalAlbum,
        previewImage: artistData.previewImage
    })


})





module.exports= router
