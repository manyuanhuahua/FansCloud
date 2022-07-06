const express = require('express')
const {User, Song, Album} = require('../../db/models');
const { route } = require('./song');

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')
const {requireAuth,createrAuth}=require('../../utils/auth')


const router = express.Router();

const validateAlbumSong = [
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

const validateAlbum = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Album title is required.'),

    check('previewImage')
        .exists({ checkFalsy: true })
        .withMessage('Album preview image is required.'),

    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Descrtiption is required.'),
    handleValidationErrors
];


router.post('/:albumId/new',requireAuth, validateAlbumSong, async(req, res, next)=>{
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

router.get('/', async (req,res,next)=>{
    const albums = await Album.findAll()
    if(albums){
        res.json(albums)
    }else{
        res.json({})
    }
})

router.get('/:albumId', async (req, res, next)=>{
    const {albumId} = req.params
    const album = await Album.scope('artistScope','songScope').findOne({where: { id: albumId }})

    if(album){
        res.json(album)
    }else{
        const err = new Error ("Album couldn't be found")
        err.status = 404
        next(err)
    }
})

router.post('/new', requireAuth, validateAlbum, async (req, res, next)=>{
    const { title, description, previewImage } = req.body
    const userId = req.user.dataValues.id
    const album = await Album.create({
            'userId': userId,
            title,
            description,
            previewImage
        })
        res.json(album)
    })




module.exports= router
