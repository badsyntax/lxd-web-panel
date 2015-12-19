'use strict';

var fs = require('fs');
var lxd = require('lxd');
var config = process.env;
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
  port: parseInt(config.PORT, 10) || 3000
});


var client = new lxd.LXD({
  uri: config.LXD_URI,
  client: {
    strictSSL: false,
    agentOptions: {
      cert: fs.readFileSync(config.LXD_CERT),
      key: fs.readFileSync(config.LXD_KEY)
    }
  }
});

// client.getApis().then(function(res) {
//   console.log('api info', res);
// 	return client.getServerInfo();
// }).then(function(res) {
// 	console.log('server info', res);
// 	return client.getContainers();
// }).then(function(res) {
// 	console.log('containers', res);
// });


server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
