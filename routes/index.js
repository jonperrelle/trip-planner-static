'use strict'
const express = require('express');
const router = express.Router();
const models = require('../models');
const Promise = require('bluebird');
var Place = require('../models/place');
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
module.exports = router;

router.get('/', function (req, res, next) {
	var p1 = Hotel.findAll();
	var p2 = Restaurant.findAll();
	var p3 = Activity.findAll()
	 
	Promise.all([p1, p2, p3])
	.spread(function(hotels, restaurants, activities) {
		res.render('index', {hotels: hotels, activities: activities, restaurants: restaurants});
	}) 
	.catch(next)
})