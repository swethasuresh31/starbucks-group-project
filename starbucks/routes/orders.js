var express = require('express');
var router = express.Router();
var connection = require('../db/connection')

/* GET order */
router.get('/', function (req, res, next) {
  console.log("request params:"+ req.query);

  if (!req.query.username || req.query.username === '') {
    res.status(400).send("Username cannot be empty");
    return;
  }

  else {
    console.log("Order history request for user: " + req.query.username);

    if (!(req.query.from === undefined || req.query.from === '') && !(req.query.to === undefined || req.query.to === '')) {
      console.log("Getting history in the given time period...");
      var pattern = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/);
      var from = req.query.from;
      var to = req.query.to;
      if(pattern.test(from) && pattern.test(to)){
        console.log("To and from dates in right format");
        var query = "SELECT * FROM orders WHERE username=? AND purchase_ts BETWEEN ? AND ?;"
        var params = [req.query.username,req.query.from,req.query.to];
        connection.query(query, params, function (error, results, fields) {
          if (error) {
            console.log(error)
            res.status(500).send(error);
          } else {
            res.status(200).send(results);
          }
        });
     }
     else{
      res.status(400).send("To and from dates are expected in YYYY-MM-DD format");
     }
    }
    else {
      console.log("Getting complete history...");
      var query = "SELECT * FROM orders WHERE username=?;"
      var params = [req.query.username]
      connection.query(query, params, function (error, results, fields) {
        if (error) {
          console.log(error)
          res.status(500).send(error);
        } else {
          res.status(200).send(results);
        }
      });
    }
  }
});

module.exports = router;
