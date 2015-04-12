var Promise = require("bluebird")
    , logger = require('./logger');

var InMemoryHistory = module.exports = function() {
  var self = this;

  self._event_data = {};

  self.record = function(id, body) {
    self._event_data[id] = body;
  };

  self.last_by_id = function(id) {
    return self._event_data[id];
  };

  self.getAll = function() {
    var values = Object
      .keys(self._event_data)
      .map( function(key) {
        return self._event_data[key];
      });

    return Promise.resolve(values);
  };

  return self;
};
