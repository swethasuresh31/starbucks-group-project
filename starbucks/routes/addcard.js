var express = require('express');
var router = express.Router();
var connection = require('../db/connection')

/* POST add card */
router.post('/', function (req, res, next) {
  
  if (!req.body.username || req.body.username === '') {
    res.status(400).send("Username cannot be empty")
    return;
  }

  if (!req.body.cardId || req.body.cardId === '') {
    res.status(400).send("Card Id cannot be empty")
    return;
  }

  if (req.body.cardId.length !== 9 || isNaN(req.body.cardId)) {
    res.status(400).send("Card Id must be a number with 9 digits")
    return;
  }

  if (!req.body.cardCode || req.body.cardCode === '') {
    res.status(400).send("Card Code cannot be empty")
    return;
  }

  if (req.body.cardCode.length !== 3 || isNaN(req.body.cardCode)) {
    res.status(400).send("Card Code must be a number with 3 digits")
    return;
  }

  if (!req.body.cardBalance || req.body.cardBalance === '' || isNaN(parseFloat(req.body.cardBalance))) {
    res.status(400).send("Please specify a valid card balance")
    return;
  }

  console.log("Adding card: " + req.body.cardId + " for user: " + req.body.username)

  var query = "INSERT INTO cards(username, card_id, card_code, balance) VALUES(?,?,?,?)"
  var params = [req.body.username, req.body.cardId, req.body.cardCode, req.body.cardBalance]

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
