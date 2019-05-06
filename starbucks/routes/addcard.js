var express = require('express');
var router = express.Router();
var connection = require('../db/connection')

/* POST add card */
router.post('/', function (req, res, next) {
  //TODO
  //add card query

  console.log("Adding card: " + req.params.courseUid)
  var query = ""
  var params = []
  connection.query(query, params, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.status(500).send(error);
    } else {
      res.status(200).send("Success");
    }
  });
});

module.exports = router;
