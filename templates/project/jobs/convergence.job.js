// Populate the graph with some random points
var points = [];
for (var i = 1; i <= 10; i++) {
  points.push({x: i, y: Math.floor(Math.random() * 50)});
}
var last_x = points[points.length - 1].x;

setInterval(function() {
  points.shift();
  points.push({x: ++last_x, y: Math.floor(Math.random() * 50)});

  send_event('convergence', {points: points});
}, 2 * 1000);
