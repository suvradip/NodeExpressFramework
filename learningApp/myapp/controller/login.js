var loginInfo = require("../model/loginAction");

exports.loginValidate = function(user, pass, res){
    loginInfo.getAllByUser(user, function(err, rows){
    if(!err && rows.length >0){
      if(user === rows[0].username && pass === rows[0].password){
        res.render('user/index', {name: user, username:user });
      }
      else
        res.render('login/index', {message: "Invalid username/password." });
    }
  });
};