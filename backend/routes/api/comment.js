const express = require('express')
const {User, Song, Comment} = require('../../db/models');
const { route } = require('./song');

const {check}=require('express-validator');
const {handleValidationErrors}=require('../../utils/validation')
const {requireAuth,properAuth}=require('../../utils/auth')


const router = express.Router();


const validateComment = [
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Comment body is required.'),
    handleValidationErrors
];


router.get('/', async (req,res,next)=>{
    const comments = await Comment.findAll()
    if(comments){
        res.json(comments)
    }else{
        res.json({})
    }
})

router.put('/:commentId',requireAuth, validateComment, async(req, res, next)=>{
    const { commentId } = req.params

    const id = req.user.toJSON().id
    const artist = await User.findByPk(id)

    const comment = await Comment.findByPk(commentId)

    const { body } = req.body
    if(comment){
        if(artist.isArtist && id === comment.userId){
            comment.update({
                body
            })
            res.json(comment)
        }else{
            return next(properAuth())
        }
    }else{
        const err = new Error("Comment couldn't be found")
        err.status = 404
        return next(err)
    }

})


router.delete('/:commentId',requireAuth, async(req, res, next)=>{
    const { commentId } = req.params
    const comment = await Comment.findByPk(commentId)

    const userId = req.user.toJSON().id
    const artist = await User.findByPk(userId)
    if(comment){
        if(artist.isArtist && comment.userId === userId){
            await comment.destroy()
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            })
        }else{
            return next(properAuth())
        }
    }else{
        const err = new Error("Comment couldn't be found")
        err.status = 404
        return next(err)
    }
})



module.exports= router
