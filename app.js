var createError = require('http-errors');
var express = require('express');
let exphbs = require('express-handlebars')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var htmlRoutes = require('./controllers/routes/htmlRoutes');
var apiRoutes = require('./controllers/routes/apiRoutes');

var app = express();

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraper_db'

var db = require('./models')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
// view engine setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials'
}))
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
