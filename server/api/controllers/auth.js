'use strict';

var util = require('util');
var fs = require('fs');
var lxd = require('lxd');

module.exports = {
  signin: signin
};

var config = process.env;

var users = {
  john: {
    id: 'john',
    password: 'password',
    name: 'John Doe',
    apiKey: '12345API_KEY'
  }
};

function signin(req, res) {

  if (
    !req.body.username ||
    !req.body.password
  ) {
    return res.json({
      error: 'Invalid credentials'
    }).code(500);
  }

  var account = users[req.body.username];
  if (!account) {
   return res.json({
      error: 'Invalid credentials'
    }).code(500);
  }

  res.json({
    apiKey: account.apiKey
  });
}
