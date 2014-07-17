({
    appDir: "../",
    baseUrl: "js",
    dir: "../../build/public",
    mainConfigFile: "main.js",
    modules: [
        {
            name: "main"
        }
    ],
    optimize: "uglify2",
    optimizeCss: "none",
    uglify2: {
      mangle: false,
      output: {
        beautify: true
      }
    }
})
