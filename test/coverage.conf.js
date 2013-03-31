
// Shared

var shared = require(__dirname + '/shared');
var main = shared('./testacular.conf.js');
eval(main);

// Coverage

logLevel = LOG_WARN;
singleRun = true;

preprocessors = {
  '**/assets/js/argumenta/**/*.js': 'coverage'
};

reporters = ['coverage'];
