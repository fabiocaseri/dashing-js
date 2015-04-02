var logger = require('./logger');

var InMemoryHistory = module.exports = function() {
  var self = this;

  self._event_data = {};

  self.record = function(id, body) {
    self._event_data[id] = body;
  };

  self.last_by_id = function(id) {
    return self._event_data[id];
  };

  self.forEach = function(func) {
    var history = self._event_data;
    for (var id in history) {
      func(id, history[id]);
    }
  };

  return self;
};
