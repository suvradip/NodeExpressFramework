var loginInfo = require("../model/loginAction"),
    test;

exports.loginValidate = function(user, pass, res){
    loginInfo.getAllByUser(user, function(err, rows){
    if(!err && rows.length >0){
      if(user === rows[0].username && pass === rows[0].password){
        test = user;
        res.render('user/index', {name: user, username:user });
      }
      else
        res.render('login/index', {message: "Invalid username/password." });
    }
  });
};



exports.chartcontroler = function(socket_io, io){

    
    console.log('a user connected');
    socket_io.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket_io.on('chat_object', function(_chartObj){
      var time = new Date();
      console.log(test);
      time = time.getHours() + ':'+ time.getMinutes();
      io.emit('chat message', {msg:_chartObj.msg, time:time, username:_chartObj.username, posi:'right'});
    });
};