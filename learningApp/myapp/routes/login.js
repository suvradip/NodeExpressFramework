var express = require('express');
var router = express.Router();
var login = require('../controller/login');

/*get login page. */
router.get('/', function(req, res, next) {
  res.render('login/index', {title: "This is a login page"});
});

/*get loginAction page. */
router.post('/loginAction', function(req, res, next) {
  login.loginValidate(req.body.user, req.body.pass, res);
});


module.exports = router;
