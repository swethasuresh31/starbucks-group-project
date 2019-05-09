var express = require('express');
var router = express.Router();
var connection = require('../db/connection')

/* GET order */
router.post('/', function(req, res, next) {
  if (!req.body.username || req.body.username === '') {
    res.status(400).send("Username cannot be empty")
    return;
  }

  console.log("Order history rqeuest for user: " + req.params.courseUid)
  var query = "SELECT * FROM orders WHERE username=?;"
  var params = [req.body.username]
  connection.query(query, params, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = router;
