
//
// Loads jQuery and jQuery UI.
//
define( 'require-jquery',
[
    "order!jquery",
    "order!jquery-ui"
],
function( $, undefined ) {

    // Return the extended jquery class
    return $;
    
} );
