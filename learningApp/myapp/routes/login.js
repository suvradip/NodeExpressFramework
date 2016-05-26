var express = require('express');
var router = express.Router();
var login = require('../model/loginAction');

/*get login page. */
router.get('/', function(req, res, next) {
  res.render('login/index', {title: "This is a login page"});
});

/*get loginAction page. */
router.post('/loginAction', function(req, res, next) {
  
  //login.create(req.body.user, req.body.pass, next);
  console.log(login.getAllByUser(6));
  res.render('user/index', {name: req.body.user });
});


module.exports = router;
