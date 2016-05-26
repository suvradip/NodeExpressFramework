var db = require('../db.js');

exports.create = function(userId, password, done) {
  var values = [userId, password, new Date().toISOString()];
  
  db.get().query('INSERT INTO users (username, password, date) VALUES(?, ?, ?)', values, function(err, result) {
    if (err) return done(err);
    if(result.affectedRows > 0 ) console.log("insertion successfull..");
  });
};

exports.getAll = function(done) {
  db.get().query('SELECT * FROM users', function (err, rows) {
    if (err) return done(err);
    done(null, rows);
  });
};

exports.getAllByUser = function(userId) {
  db.get().query('SELECT * FROM users WHERE id = ?', userId, function (err, rows, result){
    if (err) console.log("from insert query"+err);
    else return rows;
  });
};  


