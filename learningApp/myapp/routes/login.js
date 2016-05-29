var express = require('express');
var router = express.Router();
var login = require('../controller/login');

/*get login page. */
router.get('/', function(req, res, next) {
  res.render('login/index', {title: "This is a login page"});
});

/*get loginAction page. */
router.post('/loginAction', function(req, res, next) {
	if(req.body.user !== '' && req.body.pass !== '')
  	login.loginValidate(req.body.user, req.body.pass, res);
  else
  	res.render('login/index', {title: "This is a login page", message: 'Invalid login.'});
});

router.get('/loginAction', function(req,res){
	res.render('login/index', {title: "This is a login page", message: 'Invalid login.'});
});

module.exports = router;
