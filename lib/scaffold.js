/**
 * scaffold.js
 *
 * [Forked from hardhat (https://github.com/cpsubrian/hardhat/)]
 * Copy files and directorys from `in` to `out`, applying templating and data.
 */

var fs = require('fs')
  , utils = require('./utils')
  , async = require('async')
  , cons = require('consolidate')
  , walker = require('walker');

var Array = {
  unique: function(array){
    var a = [];
    for(var i = 0, l = array.length; i < l; i++) {
      for(var j = i + 1; j < l; j++) {
        // If this[i] is found later in the array
        if (array[i] === array[j]) j = ++i;
      }
      a.push(array[i]);
    }
    return a;
  }
};

// `options` can be omitted to fallback to the defaults.
// If you are using templates, set the template data on `options.data`.
module.exports = function(dirIn, dirOut, options, callback) {

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Which consolidate-supported templating engine to use.
  options.engine = options.engine || 'handlebars';

  options.engine_opts = options.engine_opts || {};

  // Which extension hardhat should apply templating to.
  // HardHat will run '*.[ext]'' files through the templating engine and
  // remove '.[ext]' from the resulting file.
  //
  // For example: 'index.html.tpl' will run through the engine and be copied to
  // the destination as 'index.html'.
  options.ext = options.ext || 'tpl';

  // The data option is passed to consolidate for templating.
  options.data = options.data || {};

  // All templatable files are assumed to be utf8 by default.
  options.encoding = 'utf8';
  
  options.namepre = options.namepre || '{{';
  options.namesuf = options.namesuf || '}}';

  options.filterFile = options.filterFile || function(){return true};

  for (var key in options.engine_opts) {
    options.data[key] = options.engine_opts[key];
  }

  // Ensure dirIn exists.
  if (!fs.existsSync(dirIn)) {
    return callback(new Error('The input directory does not exist (' + dirIn + ').'));
  }
  // If dirOut does not exist, try to create it.
  if (!fs.existsSync(dirOut)) {
    if (!utils.mkdir.sync(dirOut)) {
      return callback(new Error('Could not create the output directory (' + dirOut + ').'));
    }
  }

  // Ensure the caller has chosen a real templating engine.
  if (!cons[options.engine]) {
    return callback(new Error('The templating engine `' + options.engine + '` does not exist.'));
  }

  function evalFileName(name, data) {
    var matches = name.match(new RegExp(options.namepre + '\\w+' + options.namesuf, 'g'));
    if (matches) {
      matches = Array.unique(matches);
      for (var i in matches) {
        var val = matches[i].substring(1, matches[i].length - 1);
        if (data[val]) {
          name = name.replace(new RegExp(matches[i], 'g'), data[val]);
        }
      }
    }
    return name;
  }

  var files = [];

  // Recurse through dirIn. Create any directories found and build an array of
  // file paths to copy over.
  walker(dirIn)
    .on('error', function(err, entry, stat) {
      console.log('Got error ' + err + ' on entry ' + entry);
    })
    .on('dir', function(dir, stat) {
      dir = evalFileName(dir, options.data);
      utils.mkdir.sync(dir.replace(dirIn, dirOut));
    })
    .on('file', function(file, stat) {
      if (options.filterFile(file, stat)) {
        files.push(file);
      }
    })
    .on('end', function() {
      // Now copy over all the files, applying templating where necessary.
      var tasks = [];
      for (var i in files) {
        (function(file) {
          var dest = file.replace(dirIn, dirOut);
          tasks.push(function(done) {
            dest = evalFileName(dest, options.data);
            // If the file does not end with `.[ext]`, just copy it.
            if (!file.match(new RegExp('.*\.' + options.ext + '$'))) {
              utils.copy(file, dest, done);
            } else {
              // Otherwise, we need to run this file through the templating engine.
              dest = dest.replace('.' + options.ext, '');
              cons[options.engine](file, options.data, function(err, templated) {
                if (err) return done(err);
                utils.write(dest, templated, {encoding: options.encoding}, done);
              });
            }
          });
        })(files[i]);
      }
      async.parallel(tasks, callback);
    });
};
