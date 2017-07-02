'use strict';

module.exports = function (router) {

	let locations = require('./locations/locations');

	router.get('/locations', locations.findAll);

	/* Near or Circle Queries */
	router.get('/near/:lat,:long/:max?-:min?', locations.near);
	router.get('/near/:lat,:long/:max?', locations.near);
	router.get('/near/:lat-:long', locations.near);

	/* Poly Queries */
	router.get('/poly/:coordinates', locations.polygon);

	/* Debug and Tests */
	router.get('/debug/makeGeo2d', locations.makeGeo2d);
}