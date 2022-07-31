const express = require('express')
const {User, Song, Album} = require('../../db/models');
const { route } = require('./song');

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')
const {requireAuth, properAuth}=require('../../utils/auth')
const { Sequelize } = require('sequelize');

const router = express.Router();

const validateAlbumSong = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Song title is required.'),
    check('title')
        .custom(async function(title){
            const existedTitle = await Song.findOne({where:{title}})
            if(existedTitle) return Promise.reject('Title is also exist')
        })
        .withMessage('Song with that title already exists'),

    check('audioUrl')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required.'),
    check('audioUrl')
        .custom(async function(audioUrl){
            const existedAudioUrl = await Song.findOne({where:{audioUrl}})
            if(existedAudioUrl) return Promise.reject('Audio link is also exist')
        })
        .withMessage('Song with that audio already exists'),

    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Descrtiption is required.'),
    handleValidationErrors
];

const validateAlbum = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Album title is required.'),
    check('title')
        .custom(async function(title){
            const existedTitle = await Album.findOne({where:{title}})
            if(existedTitle) return Promise.reject('Title is also exist')
        })
        .withMessage('Album with that title already exists'),

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

    const id = req.user.toJSON().id
    const artist = await User.findByPk(id)
    if(album){
        // check if current user is the album's owner and if it is an artist
        if (artist.isArtist && id === album.userId){
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

            return next(properAuth())
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
    const userId = req.user.toJSON().id
    console.log("userId",userId)
    const album = await Album.create({
            'userId': userId,
            title,
            description,
            previewImage
        })
        res.json(album)
    })


router.put('/:albumId',requireAuth, validateAlbum, async (req, res, next)=>{
    const { albumId } = req.params
    const album = await Album.findByPk(albumId)

    const { title, description, previewImage} = req.body

    const id = req.user.toJSON().id
    const artist = await User.findByPk(id)
    if(album){
        if (artist.isArtist && id === album.userId){
            album.update({
                title,
                description,
                previewImage
            })
            res.json(album)
        }else{
            return next(properAuth())
        }
    }else{
        const err = new Error("Album couldn't be found")
        err.status = 404
        return next(err)
    }
})

router.delete('/:albumId', requireAuth, async (req, res, next)=>{
    const { albumId } = req.params
    const album = await Album.findByPk(albumId)

    const id = req.user.toJSON().id
    const artist = await User.findByPk(id)
    if(album){
        if (artist.isArtist && id === album.userId){
            await album.destroy()
            res.json({
                message: "Successfully deleted",
                statusCode : 200
            })
    }else {
        return next(properAuth())
    }
    }else{
        const err = new Error("Album couldn't be found")
        err.status = 404
        return next(err)
    }
    }
)


module.exports= router
