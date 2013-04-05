
var fs = require('fs');

/**
 * Loads config source for the given filename.
 *
 *      var shared = require(__dirname + '/shared');
 *      var conf = shared('./karma.conf.js');
 *      eval(conf);
 *
 * @param filename {String} Filename to load, as relative path.
 * @returns {String} The config source.
 */

var Shared = function( filename ) {
    var path = __dirname + '/' + filename;
    var config = fs.readFileSync(path, 'utf8');
    return config;
};

module.exports = Shared;
