var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Login'
  });
});

// router.get('/chat' function(req, res, next){
//   res.render('index', {
//     title: "Socket Chat"
//   });
// });

module.exports = router;