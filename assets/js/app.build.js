({
    appDir: "../",
    baseUrl: "js",
    dir: "../../build/public",
    modules: [
        {
            name: "main"
        }
    ],
    paths: {
        'jquery'                : "jquery-1.7.1.min",
        'jquery-ui'             : "jquery-ui-1.8.16.custom.min",
        'jquery-temporaryClass' : "jquery.temporaryClass",
        'jquery-autosize'       : "jquery.autosize",
        'jquery-charcount'      : "jquery.charcount",
        'mustache'              : "require-mustache"
    },
    shim: {
        'jquery' : {
            exports: "jQuery"
        },
        'jquery-ui' : {
            exports: "jQuery.ui",
            deps: ["jquery"]
        },
        'jquery-temporaryClass' : {
            exports: "jQuery.fn.temporaryClass",
            deps: ["jquery"]
        },
        'jquery-autosize' : {
            exports: "jQuery.fn.autosize",
            deps: ["jquery"]
        },
        'jquery-charcount' : {
            exports: "jQuery.fn.charCount",
            deps: ["jquery"]
        }
    }
})
