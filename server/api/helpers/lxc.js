var Promise = require('bluebird');
var asciiparse = require('asciiparse');
var spawn = require('child_process').spawn;

module.exports = {
  getRemoteImages: function(serverName) {
    return new Promise(function(resolve, reject) {
      getRemoteImages(serverName, resolve, reject);
    });
  }
};

function getRemoteImages(serverName, resolve, reject) {

  var proc = spawn('lxc', [
    'image',
    'list',
    serverName + ':'
  ]);

  var table = '';

  proc.stdout.on('data', function(data) {
    table += data.toString();
  });
  proc.stdout.on('end', parseTable);
  proc.on('error', reject);

  function parseTable() {
    asciiparse.parseString(table, {
      rowSeparator: '-',
      colSeparator: '|',
      multiline: true,
      junction: '+',
      header: true,
      multiline: false
    }, onTableParse);
  }

  function onTableParse(err, results) {
    if (err) { return reject(err); }

    var images = results
    .filter(function(image) {
      return Boolean(image.ALIAS);
    })
    .map(newImageModel);

    resolve(images);
  }

  function newImageModel(image) {
    var newImage = Object.keys(image).reduce(function(obj, key) {
      var newKey = key.toLowerCase().replace(/ /g, '_');
      obj[newKey] = image[key];
      return obj;
    }, {})
    newImage.alias = newImage.alias.replace(/ \(.*?\)$/, '');
    newImage.public = (newImage.public === 'yes');
    return newImage;
  }
}
