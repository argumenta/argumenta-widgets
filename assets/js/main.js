
//
// Main entry point.
//

require.config( {
    paths: {
        'jquery'                : "jquery-1.7.1.min",
        'jquery-ui'             : "jquery-ui-1.8.16.custom.min",
        'jquery-temporaryClass' : "jquery.temporaryClass",
        'mustache'              : "require-mustache"
    },
    shim: {
        'jquery' : {
            exports: "jQuery",
        },
        'jquery-ui' : {
            exports: "jQuery.ui",
            deps: ["jquery"],
        },
        'jquery-temporaryClass' : {
            exports: "jquery.fn.temporaryClass",
            deps: ["jquery"]
        }
    }
} );

// Require Argumenta
require( ["argumenta"], function( undefined ) {

    // Argumenta is loaded & the app is running...

} );
