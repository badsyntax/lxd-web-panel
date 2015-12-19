'use strict';

var SwaggerHapi = require('swagger-hapi');
var Hapi = require('hapi');
var app = new Hapi.Server();
var lxd = require('lxd');
var fs = require('fs');

module.exports = app; // for testing

var swaggerConfig = {
  appRoot: __dirname // required config
};

var config = process.env;

SwaggerHapi.create(swaggerConfig, function(err, swaggerHapi) {
  if (err) { throw err; }

  app.connection({
    port: config.PORT,
    host: config.HOST
  });

  app.register(swaggerHapi.plugin, onAppRegister);

  function onAppRegister(err) {
    if (err) { return console.error('Failed to load plugin:', err); }
    app.start(onAppStart);
  }

  function onAppStart() {
    console.log('API Server started at http://' + config.HOST + ':' + config.PORT);

    if (swaggerHapi.runner.swagger.paths['/hello']) {
      console.log('try this:\ncurl http://' + config.HOST + ':' + config.PORT + '/hello?name=Scott');
    }
  }
});
