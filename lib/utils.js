var fs = require('fs-extra');

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */
exports.emptyDirectory = function(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
};

/**
 * cp src dest.
 *
 * @param {String} src
 * @param {String} dest
 * @param {Function} fn
 */
exports.copy = function(src, dest, fn) {
  fs.copy(src, dest, function(err) {
    if (err) throw err;
    console.log('      \x1b[36mcreate\x1b[0m  ' + dest);
    fn && fn();
  });
};

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 * @param {Object} options
 * @param {Function} fn
 */
exports.write = function(path, str, options, fn) {
  fs.writeFile(path, str, options, function(err) {
    if (err) throw err;
    console.log('      \x1b[36mcreate\x1b[0m  ' + path);
    fn && fn();
  });
};

/**
 * mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */
exports.mkdir = function(path, fn) {
  fs.mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('      \033[36mcreate\033[0m  ' + path);
    fn && fn();
  });
};

/**
 * mkdir -p (sync).
 *
 * @param {String} path
 */
exports.mkdir.sync = function(path) {
  var r = fs.mkdirp.sync(path, 0755);
  r && console.log('      \033[36mcreate\033[0m  ' + path);
  return r;
};

/**
 * mv.
 *
 * @param {String} src
 * @param {String} dest
 * @param {Function} fn
 */
exports.mv = function(src, dest, fn) {
  fs.rename(src, dest, function(err){
    if (err) throw err;
    console.log('      \033[36mmove\033[0m    ' + src + ' -> ' + dest);
    fn && fn();
  });
};

/**
 * mv (sync).
 *
 * @param {String} src
 * @param {String} dest
 */
exports.mv.sync = function(src, dest) {
  var r = fs.renameSync(src, dest);
  console.log('      \033[36mmove\033[0m    ' + src + ' -> ' + dest);
};

/**
 * Exit with the given `str`.
 *
 * @param {String} str
 */
exports.abort = function(str) {
  console.error(str);
  process.exit(1);
};
