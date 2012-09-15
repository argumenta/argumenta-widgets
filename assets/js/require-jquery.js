/*
    Module: require-js
        Loads the jquery core, and plugins required by Argumenta (in proper order)
*/
define( 'require-jquery',
[
    "order!jquery",
    "order!jquery-ui"
],
function( $, undefined ) {

    // Return the extended jquery class
    return $;
    
} );
