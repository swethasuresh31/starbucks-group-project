var express = require('express');
var router = express.Router();
var connection = require('../db/connection')

/* POST payment */
router.post('/', function (req, res, next) {
  //TODO
  //TODO
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

  if (!req.body.amount || req.body.amount === '' || isNaN(parseFloat(req.body.amount))) {
    res.status(400).send("Please specify a valid amount to deduct")
    return;
  }
  
  if (!req.body.product || req.body.product === '') {
    res.status(400).send("Please specify a valid product for purchase")
    return;
  }

  console.log("Trying to make a purchase")

  var query = "START TRANSACTION; "
  var params = []

  connection.query(query, params, function (error, results, fields) {
    if (error) {
      console.log(error)
      connection.query("ROLLBACK;")
      res.status(500).send(error);
    } else {
      var query1 = "SELECT balance FROM cards WHERE username=? AND card_id=? AND card_code=?; "
      var params1 = [req.body.username, req.body.cardId, req.body.cardCode]

      connection.query(query1, params1, function (error, results, fields) {
        
        if (error) {
          console.log(error)
          connection.query("ROLLBACK;")
          res.status(500).send(error);
        } else {
          if (results.length === 0) {
            console.log("Card Not Found")
            connection.query("ROLLBACK;")
            res.status(400).send("Card Not Found");
          } else {
            if (results[0].balance < req.body.amount) {
              console.log("Insufficient balance")
              connection.query("ROLLBACK;")
              res.status(400).send("Insufficient balance");
            } else {
              console.log("Card found with sufficient balance")
              
              var query2 = "UPDATE cards SET balance=balance-? WHERE username=? AND card_id=? AND card_code=?; "
              var params2 = [req.body.amount, req.body.username, req.body.cardId, req.body.cardCode]

              connection.query(query2, params2, function (error, results, fields) {
                
                if (error) {
                  console.log(error)
                  connection.query("ROLLBACK;")
                  res.status(500).send(error);
                } else {
                  console.log("Deducted amount from card")
                  
                  var query3 = "INSERT INTO orders(username,card_id,product,amount,purchase_ts) VALUES(?,?,?,?,NOW()); "
                  var params3 = [req.body.username, req.body.cardId, req.body.product, req.body.amount]

                  connection.query(query3, params3, function (error, results, fields) {
                    
                    if (error) {
                      console.log(error)
                      connection.query("ROLLBACK;")
                      res.status(500).send(error);
                    } else {
                      console.log("Order placed")
                      connection.query("COMMIT;")
                      res.status(200).send("Success");
                    }
                  })
                }
              })
            }
          }
        }
      });
    }
  });
});
module.exports = router;
