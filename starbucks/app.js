var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/orders');

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

var loginPath = '/login'
app.use(loginPath, loginRouter);

var orderPath = '/order'
app.use(orderPath, orderRouter);


// Execute App
app.listen(3001, () => {
  console.log('Starbucks Backend running on Port: ',3001);
});