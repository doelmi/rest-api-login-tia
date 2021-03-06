var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Users');
var logsRouter = require('./routes/Logs')
var loginRouter = require('./routes/Login')
var clientRouter = require('./routes/Client')
var Auth = require('./Middleware/Auth')

var cors = require('cors')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', Auth.login, usersRouter);
app.use('/logs', Auth.login, logsRouter)
app.use('/login', loginRouter)
app.use('/client', clientRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  let error = {
    message: "Method Not Found",
    code: 404
  }
  res.status(404)
  res.json({
    error: error
  })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
