
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
        'helpers'                 : '../../test/helpers/index',
        // RequireJS shim files.
        'jquery'                  : '../../assets/js/lib/jquery-1.7.1.min',
        'jquery-ui'               : '../../assets/js/lib/jquery-ui-1.8.16.custom.min',
        'jquery-temporaryClass'   : '../../assets/js/lib/jquery.temporaryClass',
        'jquery-autosize'         : '../../assets/js/lib/jquery.autosize',
        'jquery-charcount'        : '../../assets/js/lib/jquery.charcount',
        'moment'                  : '../../assets/js/lib/moment',
        // Lib files.
        'require-bootstrap'       : '../../assets/js/lib/require-bootstrap',
        'require-jquery'          : '../../assets/js/lib/require-jquery',
        'mustache'                : '../../assets/js/lib/require-mustache',
        'order'                   : '../../assets/js/lib/order',
        'text'                    : '../../assets/js/lib/text',
        'underscore'              : '../../assets/js/lib/underscore'
    },
    // Load tests via RequireJS when ready.
    deps: tests,
    callback: window.__karma__.start
});
