'use strict';

var Promise = require('bluebird');
var asciiparse = require('asciiparse');
var spawn = require('child_process').spawn;

module.exports = {
  getRemoteImages,
  getServers,
  addServer
};

function getServers(resolve, reject) {

  const LOCAL_SERVER_NAME = 'local';

  return handleProcess('lxc', [ 'remote', 'list' ])
    .then(parseTable)
    .then((results) => {
      var servers = results
      .filter((server) => {
        return (server.NAME !== LOCAL_SERVER_NAME);
      })
      .map(ServerModel);
      return servers;
    });
}

function getRemoteImages(serverName) {
  return handleProcess('lxc', [ 'image', 'list', serverName + ':' ])
    .then(parseTable)
    .then((results) => {
      var images = results
      .filter(function(image) {
        return Boolean(image.ALIAS);
      })
      .map(ImageModel);
      return images;
    });
}

function addServer(data) {
  return handleProcess('lxc', [ 'remote', 'add', data.name, data.url ]);
}

function handleProcess(command, args) {
  return new Promise((resolve, reject) => {

    var proc = spawn(command, args);
    var stdout = '';
    var stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    proc.stdout.on('end', () => {
      resolve(stdout);
    });
    proc.stderr.on('data', (data) => {
      stderr += data.toString();
      reject(new Error(stderr));
    });
    proc.on('error', (err) => reject(new Error(err)));
  });
}

function parseTable(table) {
  return new Promise((resolve, reject)=> {
    asciiparse.parseString(table, {
      rowSeparator: '-',
      colSeparator: '|',
      multiline: true,
      junction: '+',
      header: true,
      multiline: false
    }, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    })
  });
}

function getSanitizedModel(data) {
  var model = Object.keys(data).reduce((obj, key) => {
    var newKey = key.toLowerCase().replace(/ /g, '_');
    obj[newKey] = data[key];
    return obj;
  }, {})
  return model;
}

function makeFieldBoolean(field) {
  return ((field || '').toLowerCase() === 'yes');
}

function ServerModel(server) {
  var model = getSanitizedModel(server);
  model.public = makeFieldBoolean(module.public);
  return model;
}

function ImageModel(image) {
  var model = getSanitizedModel(image);
  model.alias = model.alias.replace(/ \(.*?\)$/, '');
  model.public = makeFieldBoolean(model.public);
  return model;
}
