var jwt = require('jsonwebtoken');

module.exports = {
  tokenHandler: tokenHandler,
  authenticate: authenticate
};

var algorithm = 'HS256';
var privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

var accounts = [{
  id: 123,
  username: 'rich'
}];

var options = { algorithm: algorithm };

function tokenHandler(req, authOrSecDef, token, cb) {
  jwt.verify(token, privateKey, options, cb);
}

function authenticate(user, cb) {
  var foundUser = accounts.filter(function(account) {
    return user.username === account.username;
  })[0];
  if (!foundUser) {
    return cb('Invalid credentials');
  }
  var token = jwt.sign(foundUser, privateKey, options);
  cb(null, token);
}
