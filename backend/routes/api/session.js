const express = require('express')



const {setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const {User, Album, Song, Playlist} = require('../../db/models')

const { check }=require('express-validator');
const { handleValidationErrors} = require('../../utils/validation');
const playlists = require('../../db/models/playlists');
// const { Model } = require('sequelize/types');

const router = express.Router();




//user logout api route
router.delete('/logout',(_req, res)=>{
    res.clearCookie('token');
    return res.json({message:'success'})
})





const validateLogin = [
  check('credential')
  .exists({ checkFalsy: true })
  .notEmpty()
  .withMessage('Credential is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required.'),
  handleValidationErrors
]

//custom(validator)
/*
app.post(
  '/create-user',
  check('password').exists(),
  check(
    'passwordConfirmation',
    'passwordConfirmation field must have the same value as the password field',
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
  loginHandler,
);
*/



router.post('/', validateLogin, async (req,res,next)=>{
    const { credential, password }= req.body;
    // console.log(token)
    const user = await User.login({ credential, password });


    if(!user){
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Login failed';
        err.errors=['The provided credentials were invalid.'];
        return next(err);
    }

    await setTokenCookie(res, user);
    // console.log(req.user)
    return res.json({
        id : user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: ''
    })
})

router.get('/currentUser',restoreUser,async (req,res)=>{


    if(req.user){
        return res.json(
            req.user
        )
    }else return res.json({})
})


router.get('/currentUser/songs',requireAuth, async (req,res)=>{

  const songs = await Song.findAll(
    {
      where:{
        userId : req.user.id
      }
    }
  )



  if(songs.length){

    return res.json(songs)


  }else{
      return res.json({})
  }

})

router.get('/albums', requireAuth, async (req,res,next)=>{
    const userId = req.user.toJSON().id
    
    const albums = await Album.findAll({
      where:{
        userId
      }
    })

    if(albums){
      res.json(albums)
    }else{
      return res.json({})
  }
})

router.get('/playlists', requireAuth, async (req,res,next)=>{

  const userId = req.user.toJSON().id
  const playlists = await Playlist.findAll({
    where:{
      userId: req.user.id
    },
    include:{
        model: Song,
        through:{
            attributes:{}
        }
    }

})


  if(playlists){
    return res.json({playlists})

  }else{
    return res.json({})
}
})



module.exports = router;
