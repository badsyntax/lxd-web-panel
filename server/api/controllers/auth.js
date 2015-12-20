'use strict';

var util = require('util');
var fs = require('fs');
var lxd = require('lxd');
var helpers = require('../helpers');

module.exports = {
  signin: signin
};

var config = process.env;

function signin(req, reply) {
  helpers.auth.authenticate({
    username: req.body.username,
    password: req.body.password
  }, function(err, token) {
    if (err) {
      return reply.json({
        error: err
      });
    }
    reply.json({
      token: token
    });
  });
}
