var dashing = require('./lib/dashing');

module.exports = {
  Dashing: dashing.Dashing,
  logger: dashing.logger,

  // Exports utility modules
  async: require('async'),
  'fs-extra': require('fs-extra'),
  request: require('request'),
  walker: require('walker')
};