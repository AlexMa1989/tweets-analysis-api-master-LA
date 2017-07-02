'use strict';

let cors = require('cors');
//let compress = require('compression');
let bodyParser = require('body-parser');
let express = require('express');
//let error = require('./error');
let config = rootRequire('app/config/config');
let log = require('./logger');

module.exports = {

  app: (app, router) => {
    app.use(cors()); // Enable Cross Origin Requests
    //app.use(compress()); // Compress the response body
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //app.use(error);
    app.use(config.prefix, router);
    app.set('json spaces', 2);
    router.use((req, res, next) => {
      log.info(`[${req.method}] ${req.path}`);
      next();
    });
  },

};