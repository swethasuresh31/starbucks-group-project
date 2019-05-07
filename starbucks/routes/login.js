var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var connection = require('../db/connection')

/* POST login */
router.post('/', function (req, res, next) {
  //TODO
  if (!req.body.username && req.body.username === '') {
    res.status(400).send("Username cannot be empty")
    return;
  }

  if (!req.body.password && req.body.password === '') {
    res.status(400).send("Password cannot be empty")
    return;
  }

  console.log("Login with user: " + req.body.username + " and password: " + req.body.password)

  var query = "SELECT password FROM users WHERE username=?"
  var params = [req.body.username]
  connection.query(query, params, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(500).send(error);
    } else if(results.length === 0) {
      res.status(401).send("User not found")
    } else {
      bcrypt.compare(req.body.password, results[0].password, function (error, response) {
        if (!response) {
          res.status(401).send("Username and password do not match")
        } else {
          res.status(200).send("Success");
        }
      });
    }
  });
});

module.exports = router;
