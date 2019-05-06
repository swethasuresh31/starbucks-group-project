var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'starbucks.cyrcre3ud7ep.us-east-2.rds.amazonaws.com',
  user: 'rootuser',
  password: 'rootpass',
  database: 'starbucks',
  multipleStatements: true,
  dateStrings: true
});

db.connect(err => {
    if (err)
    throw err;
    else 
    console.log("Connected to mysql db")
})

module.exports = db;