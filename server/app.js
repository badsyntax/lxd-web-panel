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

  const port = env.PORT || 3000;
  const host = env.HOST || '0.0.0.0';

  // install middleware
  swaggerExpress.register(app);

  app.listen(port, host, function() {
    console.log('App started on ' + host + ':' + port);
  });
});
