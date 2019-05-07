var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var connection = require('./db/connection')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var orderRouter = require('./routes/orders');
var addCardRouter = require('./routes/addcard');
var paymentRouter = require('./routes/pay');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

//Routes
//Base Route
var basePath = '/'
app.use(basePath, indexRouter);

var loginPath = '/api/v1/starbucks/login'
app.use(loginPath, loginRouter);

var signupPath = '/api/v1/starbucks/signup'
app.use(signupPath, signupRouter);

var orderPath = '/api/v1/starbucks/order'
app.use(orderPath, orderRouter);

var addCardPath = '/api/v1/starbucks/card/add'
app.use(addCardPath, addCardRouter);

var paymentPath = '/api/v1/starbucks/pay'
app.use(paymentPath, paymentRouter);


// Execute App
app.listen(3001, () => {
  console.log('Starbucks Backend running on Port: ',3001);
});