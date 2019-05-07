var express = require('express');
const bcrypt = require('bcrypt');
var connection = require('../db/connection')
const saltRounds = 10;
var router = express.Router();

/* POST signup */
router.post('/', function (req, res, next) {
  //TODO
  //signup query
  if (!req.body.username && req.body.username === '') {
    res.status(400).send("Username cannot be empty")
    return;
  }

  if (!req.body.password && req.body.password === '') {
    res.status(400).send("Password cannot be empty")
    return;
  }

  console.log("Signup with user: " + req.body.username + " and password: " + req.body.password)

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    var query = "INSERT INTO users(username, password) VALUES(?,?)"
    var params = [req.body.username, hash]
    connection.query(query, params, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.status(500).send(error);
      } else {
        res.status(200).send("Success");
      }
    });
  });
});

module.exports = router;
