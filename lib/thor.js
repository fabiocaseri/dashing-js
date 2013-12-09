var fs = require('fs-extra')
  , path = require('path')
  , scaffold = require('./scaffold');

exports.Thor = {
  source_root: path.resolve(__dirname, '../templates'),
  directory: function(src, dest, locals, options) {
    dest = dest || src;
    locals = locals || {};
    locals.Thor = this;
    options = options || {};

    scaffold([this.source_root, src].join(path.sep), dest, {
      engine: 'ejs',
      engine_opts: {
        open: '{{',
        close: '}}'
      },
      ext: 'tt',
      namepre: '%',
      namesuf: '%',
      data: locals,
      filterFile: function(file, stat) {
        return !file.match(/\.empty_directory$/);
      }
    }, function(err) {
      if (err) console.error(err);
    });
  },
  empty_directory: function(dest, options) {
    fs.mkdirp(dest, function(err) {
      if (err) console.error(err);
    });
  },
  Util: {
    camel_case: function(str) {
      if (str.charAt(0) !== '_') str = '_' + str;
      return str.replace(/(_[a-z0-9])/mg, function(s) {return s.replace('_', '').toUpperCase()});
    },
    dash_case: function(str) {
      if (str.charAt(0) >= 'A' && str.charAt(0) <= 'Z') str = str.substring(0,1).toLowerCase() + str.substring(1);
      return str.replace(/([A-Z])/g, function(s){return '-' + s.toLowerCase()});
    },
    snake_case: function(str) {
      if (str.charAt(0) >= 'A' && str.charAt(0) <= 'Z') str = str.substring(0,1).toLowerCase() + str.substring(1);
      return str.replace(/([A-Z])/g, function(s){return '_' + s.toLowerCase()});
    }
  }
};