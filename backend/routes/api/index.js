const router = require('express').Router();
const sessionRouter = require('./session.js')
const userRouter = require('./user.js')
const songRouter = require('./song.js')
const albumRouter = require('./album.js')
const commentRouter = require('./comment.js')
const artistRouter = require('./artist.js')
const playlistRouter = require('./playlist.js')

const {restoreUser}=require('../../utils/auth.js')

// router.post('/test', (req,res)=>{
//     res.json({requestBody: req.body})
// })

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'JohnSmith'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

router.use(restoreUser);





//  const { requireAuth} = require('../../utils/auth.js');
// router.get('/require-auth',requireAuth,(req,res)=>{
//             return res.json(res)
// })

router.use('/session',sessionRouter)

router.use('/users',userRouter);

router.use('/songs',songRouter);

router.use('/albums',albumRouter);

router.use('/comments',commentRouter);

router.use('/artists',artistRouter);

router.use('/playlists',playlistRouter);

router.post('/test',(req,res)=>{
    res.json({requestBody: req.body})
})



module.exports = router;
