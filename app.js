'use strict';

/*
Location Data RESTful API
@author Nick Crawford
*/

/* 
This function allows us to use require() as if we
are already in the root of our application.
As our project directory structure grows deeper,
this prevents annoying relative path require calls like:
var Article = require('../../../models/article');
*/
GLOBAL.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

let express = require('express');
let fs = require("fs");

let configure = require('./app/helpers/configure');
let config = require('./app/config/config');
let log = require('./app/helpers/logger');
let routes = require('./app/routes');
let locations = require('./app/locations/locations');

//Make our application
let app = express();
let router = express.Router();

// Connect to database
let url = process.env.MONGO_URI || config.mongo.uri;

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.", db.s.databaseName);
//   datab = db;
// });

// Initialize configuration
configure.app(app, router);

app.get('/', function(req, res) {
	res.send("Welcome to the location data api. For help, check out our <a href='/help'>documentation</a>");
	log.info("Welcome to the location data API. Visit ");
});

/* Debug and Tests */
app.get('/debug/makeGeo2d', locations.makeGeo2d);

app.get('/locations', locations.findAll);

module.exports.app = app;
module.exports.router = router;

routes(router);

var server = app.listen(config.port, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})