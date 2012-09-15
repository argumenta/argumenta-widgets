define( 'argumenta/app',
[
    "argumenta/widgets",
    "argumenta/widgets/Base",
    "argumenta/widgets/Argument",
    "argumenta/widgets/AddTag",
    "argumenta/widgets/Citation",
    "argumenta/widgets/Proposition",
    "argumenta/widgets/Sidebar",
    "argumenta/widgets/Tags"
],
function( Widgets, Base, Argument, AddTag, Citation, Proposition, Sidebar, Tags) {

    var App = {

        start: function() {
            Widgets.init();
        }
    };

    return App;

} );
