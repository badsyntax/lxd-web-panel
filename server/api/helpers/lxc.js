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

  return new Promise((resolve, reject) => {
    handleProcess('lxc', [ 'remote', 'list' ])
    .then(parseTable)
    .then((results) => {
      var servers = results
      .filter((server) => {
        return (server.NAME !== LOCAL_SERVER_NAME);
      })
      .map(ServerModel);
      return servers;
    })
    .then(resolve)
    .catch(reject);
  });
}

function getRemoteImages(serverName) {
  return new Promise((resolve, reject) => {
    handleProcess('lxc', [ 'image', 'list', serverName + ':' ])
    .then(parseTable)
    .then((results) => {
      var images = results
      .filter(function(image) {
        return Boolean(image.ALIAS);
      })
      .map(ImageModel);
      return images;
    })
    .then(resolve)
    .catch(reject);
  });
}

function addServer(data) {
  return new Promise((resolve, reject) => {
    handleProcess('lxc', [ 'remote', 'add', data.name, data.url ])
    .then(resolve)
    .catch(reject);
  })
}

function handleProcess(command, args) {
  return new Promise((resolve, reject) => {

    var proc = spawn(command, args);
    var table = '';

    proc.stdout.on('data', (data) => {
      table += data.toString();
    });
    proc.stdout.on('end', () => {
      resolve(table);
    });
    proc.on('error', reject);
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

function makeBool(field) {
  return ((field || '').toLowerCase() === 'yes');
}

function ServerModel(server) {
  var model = getSanitizedModel(server);
  model.public = makeBool(module.public);
  return model;
}

function ImageModel(image) {
  var model = getSanitizedModel(image);
  model.alias = model.alias.replace(/ \(.*?\)$/, '');
  model.public = makeBool(model.public);
  return model;
}
