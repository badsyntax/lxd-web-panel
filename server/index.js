'use strict';

var fs = require('fs');
var lxd = require('lxd');
var config = process.env;
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  port: parseInt(config.PORT, 10) || 3000,
  host: '0.0.0.0'
});

var lxdClient = new lxd.LXD({
  uri: config.LXD_URI,
  client: {
    strictSSL: false,
    agentOptions: {
      cert: fs.readFileSync(config.LXD_CERT),
      key: fs.readFileSync(config.LXD_KEY)
    }
  }
});

// lxdClient.getApis().then(function(res) {
//   console.log('api info', res);
// 	return lxdClient.getServerInfo();
// }).then(function(res) {
// 	console.log('server info', res);
// 	return lxdClient.getContainers();
// }).then(function(res) {
// 	console.log('containers', res);
// });


server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply({
      msg: 'Hello, world!'
    }).code(200);
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.route({
  method: 'GET',
  path: '/containers',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
