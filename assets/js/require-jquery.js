
//
// Loads jQuery and jQuery UI.
//
define( 'require-jquery',
[
    "order!jquery",
    "order!jquery-ui",
    "order!jquery.temporaryClass"
],
function( $, undefined, undefined ) {

    // Return the extended jquery class
    return $;
    
} );
