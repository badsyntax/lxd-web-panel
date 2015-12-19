'use strict';

var SwaggerHapi = require('swagger-hapi');
var Hapi = require('hapi');
var server = new Hapi.Server();
var lxd = require('lxd');
var fs = require('fs');

module.exports = server; // for testing

var swaggerConfig = {
  appRoot: __dirname // required config
};

var config = process.env;

SwaggerHapi.create(swaggerConfig, function(err, swaggerHapi) {
  if (err) { throw err; }

  server.connection({
    port: config.PORT,
    host: config.HOST
  });

  server.register(swaggerHapi.plugin, onAppRegister);

  function onAppRegister(err) {
    if (err) { return console.error('Failed to load plugin:', err); }
    server.start(onAppStart);
  }

  function onAppStart() {
    console.log('API Server started at http://' + config.HOST + ':' + config.PORT);

    if (swaggerHapi.runner.swagger.paths['/hello']) {
      console.log('try this:\ncurl http://' + config.HOST + ':' + config.PORT + '/hello?name=Scott');
    }
  }
});
