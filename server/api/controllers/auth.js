'use strict';

var helpers = require('../helpers');

module.exports = {
  signin
};

function signin(req, reply) {
  helpers.auth.authenticate({
    username: req.body.username,
    password: req.body.password
  }, (err, token) => {
    if (err) {
      reply.status(422);
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
