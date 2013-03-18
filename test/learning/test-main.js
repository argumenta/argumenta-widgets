
var tests = Object.keys(window.__testacular__.files).filter(function (file) {
  return /learning\/.*Test\.js$/.test(file);
});

console.log("tests: ", tests);

require({
    // Testacular serves files from `/base`.
    baseUrl: '/base/assets/js',
    paths: {
        chai: '../../test/lib/chai'
    },
    // Load tests via RequireJS when ready.
    deps: tests,
    callback: window.__testacular__.start
});
