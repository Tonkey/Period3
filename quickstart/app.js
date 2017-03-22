var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var jokeApi = require('./routes/jokeApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret_3162735', saveUninitialized: true, resave: true }));

app.use(function (req, res, next) {
  var string = res.url + "";
  if(string.search("/api/")){
      // req.session.userName = "api";
      return next();
  }else if (req.session.userName) {
    return next();
  } else if (req.body.userName) {
    req.session.userName = req.body.userName;
    res.redirect('/');
  } else {
    req.url = "/login"; //We will create this page in the next step
    return next();
  }
});

app.use('/', index);
app.use('/api', jokeApi);

// catch 404 and forward to error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
