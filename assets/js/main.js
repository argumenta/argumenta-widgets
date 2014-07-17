
//
// Main entry point.
//

require.config( {
    paths: {
        'jquery'                : "lib/jquery-1.7.1.min",
        'jquery-ui'             : "lib/jquery-ui-1.8.16.custom.min",
        'jquery-temporaryClass' : "lib/jquery.temporaryClass",
        'jquery-autosize'       : "lib/jquery.autosize",
        'jquery-charcount'      : "lib/jquery.charcount",
        'jquery-cookie'         : "lib/jquery.cookie",
        'moment'                : "lib/moment",
        'mustache'              : "lib/require-mustache",
        'order'                 : "lib/order",
        'require-bootstrap'     : "lib/require-bootstrap",
        'require-jquery'        : "lib/require-jquery",
        'text'                  : "lib/text"
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
        },
        'moment': {
            exports: "moment"
        }
    }
} );

// Require Argumenta
require( ["argumenta"], function( undefined ) {

    // Argumenta is loaded & the app is running...

} );
