
//
// Loads jQuery and jQuery UI.
//
define( 'require-jquery',
[
    "jquery",
    "jquery-ui",
    "jquery-temporaryClass",
    "jquery-cookie"
],
function( $, undefined, undefined, undefined ) {

    // Return the extended jquery class
    return $;
    
} );
