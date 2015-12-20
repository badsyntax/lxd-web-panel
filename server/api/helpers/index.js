var fs = require('fs');
var lxd = require('lxd');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

var config = process.env;

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

var auth = (function() {

  var algorithm = 'HS256';
  var privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

  var accounts = [{
    id: 123,
    username: 'rich'
  }];

  var options = { algorithm: algorithm };

  return {
    tokenHandler: tokenHandler,
    authenticate: authenticate
  };

  function tokenHandler(req, authOrSecDef, token, cb) {
    console.log('Verify token', token);
    jwt.verify(token, privateKey, options, cb);
  }

  function authenticate(user, cb) {
    console.log('Authenticating user', user);
    var foundUser = accounts.filter(function(account) {
      return user.username === account.username;
    })[0];
    if (!foundUser) {
      return cb('Invalid credentials');
    }
    var token = jwt.sign(foundUser, privateKey, options);
    cb(null, token);
  }

}());

module.exports = {
  getLXDClient: function() {
    return lxdClient;
  },
  auth: auth
};
