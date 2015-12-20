'use strict';

var SwaggerExpress = require('swagger-express-mw');
var helpers = require('./api/helpers');
var app = require('express')();
var env = process.env
module.exports = app; // for testing

var config = {
  appRoot: __dirname,
  swaggerSecurityHandlers: {
    token: helpers.auth.tokenHandler
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.listen(env.PORT, env.HOST, function() {
    console.log('App started on ' + env.HOST + ':' + env.PORT);
  });
});
