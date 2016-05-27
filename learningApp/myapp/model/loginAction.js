var db = require('../db.js');

exports.create = function(userId, password, done) {
  var values = [userId, password, new Date().toISOString()];
  
  db.get().query('INSERT INTO users (username, password, date) VALUES(?, ?, ?)', values, function(err, result) {
    if (err) return done(err);
    if(result.affectedRows > 0 ) console.log("insertion successfull..");
  });
};

exports.getAll = function(callback) {
  db.get().query('SELECT * FROM users', function (err, rows) {
    if (err) callback(err, null);
    callback(null, rows);
  });
};

exports.getAllByUser = function(userId, callback) {
  db.get().query('SELECT * FROM users WHERE username = ?', userId, function (err, rows){
    if (err) callback(err, null);
    else callback(null,rows);
  });
};  


