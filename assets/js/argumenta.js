define( 'argumenta',
[
    "require-jquery",
    "require-bootstrap",
    "argumenta/app"
],
function( $, Bootstrap, App ) {

    // Start the app and return it!
    App.start();
    return App;

} );
