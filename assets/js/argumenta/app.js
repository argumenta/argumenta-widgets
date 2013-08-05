define( 'argumenta/app',
[
    "argumenta/sandbox",
    "argumenta/widgets",
    "argumenta/widgets/Base",
    "argumenta/widgets/Argument",
    "argumenta/widgets/AddTag",
    "argumenta/widgets/Citation",
    "argumenta/widgets/Proposition",
    "argumenta/widgets/Search",
    "argumenta/widgets/Sidebar",
    "argumenta/widgets/Tags"
],
function( Sandbox, Widgets, Base,
          Argument, AddTag, Citation,
          Proposition, Search, Sidebar, Tags ) {

    var App = {

        start: function() {
            Sandbox.init();
            Widgets.init();
        }
    };

    return App;
} );
