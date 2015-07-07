var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express3-handlebars');
var cors = require('cors');

var passport = require('passport');

var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var handlebars = exphbs.create({
    defaultLayout:'user_main',
    extname:'.html',
    helpers:require('./lib/helpers')
});
app.engine('html',handlebars.engine);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret:'this is a test secret',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());


require('./middleware/passport')(passport);

app.use('/public',express.static(path.join(__dirname, 'public')));

app.use('/',require('./totalRouter/public_router'));
app.use('/user',require('./totalRouter/user_router'));
app.use('/sys',require('./totalRouter/sys_router'));
app.use('/api/v1',cors(),require('./totalRouter/api_v1_router'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      layout:false
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    layout:false
  });
});


module.exports = app;
