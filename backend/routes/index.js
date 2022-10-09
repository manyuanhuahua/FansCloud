const express = require('express');
const router = express.Router();
const {aws} = require('../config')
// router.get('/hello/world', function(req,res){
//     res.cookie('SCRF-TOKEN', req.csrfToken());
//     res.send('Hello world!');
// });
const apiRouter = require('./api')


router.use('/api',apiRouter)

/*The `csurf` middleware will add a `_csrf` cookie that is HTTP-only (can't be
read by JavaScript) to any server response. It also adds a method on all
requests (`req.csrfToken`) that will be set to another cookie (`XSRF-TOKEN`)
later on. These two cookies work together to provide CSRF (Cross-Site Request
    Forgery) protection for your application. The `XSRF-TOKEN` cookie value needs to
    be sent in the header of any request with all HTTP verbs besides `GET`. This
header will be used to validate the `_csrf` cookie to confirm that the
request comes from your site and not an unauthorized site.
*/

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
      );
    });

      // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.json({});
    });
  }


router.get('/',(req,res)=>{
    res.send("Hello! Welcome to my website!")
})



router.get('/api/csrf/restore',(req, res)=>{
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken,
    })
})

router.get('/api/awskey', async(req, res, next)=>{

  access = aws.access
  secret = aws.secret

  return res.json(
    {
      access:access,
      secret:secret
    })
})




module.exports = router;
