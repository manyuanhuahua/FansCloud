const express = require('express');
const router = express.Router();

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


router.get('/api/csrf/restore',(req, res)=>{
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    })
})






module.exports = router;
