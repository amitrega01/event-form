const port = process.env.PORT || 3001;

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var EventUser = require('./api/models/userSignedModel');
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Eventdb');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

var routes = require('./api/routes/eventUsersRoutes');
routes(app);

app.listen(port);

console.log('event form api on localhost:' + port);
module.exports = app;
