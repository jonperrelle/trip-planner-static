'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swig = require('swig');
const morgan = require('morgan');
const router = require('./routes');
const models = require('./models');
var Place = require('./models/place');
var Hotel = require('./models/hotel');
var Restaurant = require('./models/restaurant');
var Activity = require('./models/activity');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

app.use(morgan("dev"));

models.sync()
.then(function() {
	app.listen(3000, function() {
		console.log("Listening on Port 3000!");
	});
})
.catch(console.error);

app.use("/", router);

app.use(express.static(path.join(__dirname, "/public")));
app.use('/jquery', express.static(path.join(__dirname, "/bower_components/jquery/dist")));
app.use('/bootstrap', express.static(path.join(__dirname, "/bower_components/bootstrap/dist")));
app.use('/bootstrap-select', express.static(path.join(__dirname, "/bower_components/bootstrap-select/dist")));

app.use(function(req, res, next) {
	var err = new Error('Not found')
	err.status = 404;
	next(err);
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err)
  res.render('error', {message: "There was an Error", error: err});
});




