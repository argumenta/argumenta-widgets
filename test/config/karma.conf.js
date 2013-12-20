// Testacular configuration
// Generated on Sat Mar 16 2013 09:23:57 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = '../..';


// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  // RequireJS shim files.
  'assets/js/jquery-1.7.1.min.js',
  'assets/js/jquery-ui-1.8.16.custom.min.js',
  'assets/js/jquery.temporaryClass.js',
  'assets/js/jquery.autosize.js',
  'assets/js/jquery.charcount.js',
  'assets/js/moment.js',
  // Test files.
  'test/test-main.js',
  // Serve and Watch files.
  {pattern: 'assets/**', included: false},
  {pattern: 'assets/js/**/*.js', included: false},
  {pattern: 'test/**/*.js', included: false}
];

// list of files to exclude
exclude = [

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'Firefox'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
