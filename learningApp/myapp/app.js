var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db');
var session = require('client-sessions');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
//var session = require('./controller/session');
var app = express();

//socket
var server = require('http').Server(app);
var io = require('socket.io')(server);

// global.__mysessionObj = {};
// app.use(function(req, res, next){
//   session.createSession(req.ip);
//   next();
// });

io.on('connection', function(socket, req){
    console.log('a user connected');
    
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat_object', function(_chartObj){
      var time = new Date();
      time = time.getHours() + ':'+ time.getMinutes();
      io.emit('chat message', {msg:_chartObj.msg, time:time, username:_chartObj.username, posi:'right'});
    });
});

//setting up session
// app.use(session({
//   cookieName: 'session',
//   secret: 'dnfjdfuid452#$&(&wf7we46578sfhsvh!2347' + Math.round(Math.random() *100),
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000,
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
      console.log('Database connection successfull...');
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = {app: app, server: server};
