var current_valuation = 0;
var current_karma = 0;

setInterval(function() {
  var last_valuation = current_valuation;
  var last_karma = current_karma;
  current_valuation = Math.floor(Math.random() * 100);
  current_karma = Math.floor(Math.random() * 200000);

  send_event('valuation', {current: current_valuation, last: last_valuation});
  send_event('karma', {current: current_karma, last: last_karma});
  send_event('synergy', {value: Math.floor(Math.random() * 100)});
}, 2 * 1000);
