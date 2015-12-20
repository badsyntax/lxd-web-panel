'use strict';

var helpers = require('../helpers');

module.exports = {
  signin: signin
};

function signin(req, reply) {
  helpers.auth.authenticate({
    username: req.body.username,
    password: req.body.password
  }, function(err, token) {
    if (err) {
      reply.status(500);
      reply.json({
        message: String(err)
      });
    } else {
      reply.json({
        token: token
      });
    }
  });
}
