'use strict';

var SwaggerHapi = require('swagger-hapi');
var Hapi = require('hapi');
var server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});
var helpers = require('./api/helpers');

var swaggerConfig = {
  appRoot: __dirname
  // swaggerSecurityHandlers: {
  //   token: helpers.auth.tokenHandler
  // }
};

var env = process.env;

module.exports = server;

SwaggerHapi.create(swaggerConfig, function(err, swaggerHapi) {
  if (err) { throw err; }

  server.connection({
    port: env.PORT,
    host: env.HOST
  });

  server.register(swaggerHapi.plugin, onAppRegister);

  function onAppRegister(err) {
    if (err) { return console.error('Failed to load plugins:', err); }
    server.start(onAppStart);
  }

  function onAppStart() {
    console.log('API Server started at http://' + env.HOST + ':' + env.PORT);
  }
});
