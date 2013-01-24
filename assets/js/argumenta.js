define( 'argumenta',
[
    "order!require-jquery",
    "order!require-bootstrap",
    "order!argumenta/app"
],
function( $, Bootstrap, App ) {

    // Start the app
    App.start();

} );
