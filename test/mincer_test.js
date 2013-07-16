var path = require('path')
  , assert = require('assert')
  , Mincer = require('mincer');

describe('Mincer', function() {
  var templateProjectPath = path.resolve(__dirname, '../templates/project');

  var mincer = {};
  mincer.environment = new Mincer.Environment();
  mincer.assets_prefix = '/assets';
  mincer.environment.appendPath(templateProjectPath + '/assets/javascripts');
  mincer.environment.appendPath(templateProjectPath + '/assets/stylesheets');
  mincer.environment.appendPath(templateProjectPath + '/assets/fonts');
  mincer.environment.appendPath(templateProjectPath + '/assets/images');
  mincer.environment.appendPath(templateProjectPath + '/widgets');
  mincer.environment.appendPath(path.resolve(__dirname, '../javascripts'));

  describe('application.js', function() {
    it('should compile without errors', function(done) {
      mincer.environment.findAsset('application.js').compile(function(err, asset) {
        done();
      });
    });
  });
  

  describe('application.css', function() {
    it('should compile without errors', function(done) {
      mincer.environment.findAsset('application.css').compile(function(err, asset) {
        done();
      });
    });
  });

  /* Mincer 0.5.x */
  /*
  describe('application.js', function() {
    it('should compile without errors', function(done) {
      if (mincer.environment.findAsset('application.js')) {
        done();
      }
    });
  });
  

  describe('application.css', function() {
    it('should compile without errors', function(done) {
      if (mincer.environment.findAsset('application.css')) {
        done();
      }
    });
  });
  */

});
