
var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /test\/.*Test\.js$/.test(file);
});

console.log("tests: ", tests);

require({
    // Karma serves files from `/base`.
    baseUrl: '/base/assets/js',
    paths: {
        'chai'                    : '../../test/lib/chai',
        'sinon'                   : '../../test/lib/sinon',
        'fixtures'                : '../../test/fixtures/index',
        // RequireJS shim files.
        'jquery'                  : '../../assets/js/jquery-1.7.1.min',
        'jquery-ui'               : '../../assets/js/jquery-ui-1.8.16.custom.min',
        'jquery-temporaryClass'   : '../../assets/js/jquery.temporaryClass'
    },
    // Load tests via RequireJS when ready.
    deps: tests,
    callback: window.__karma__.start
});
