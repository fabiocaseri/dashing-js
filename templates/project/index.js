var dashing = require('dashing-js').Dashing({
  // optional override for overriding dashing server settings
});

// Set your auth token here
//dashing.auth_token = 'YOUR_AUTH_TOKEN';

/*
dashing._protected = function(req, res, next) {
  // Put any authentication code you want in here.
  // This method is run before accessing any resource.
  // if (true) next();
}
*/

// Set your default dashboard here
//dashing.default_dashboard = 'mydashboard';

// export dashing.app to be used within another module
exports = module.exports = dashing.app;
