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
    "argumenta/widgets/Tags",
    "argumenta/widgets/User"
],
function( Sandbox, Widgets, Base,
          Argument, AddTag, Citation,
          Proposition, Search, Sidebar, Tags,
          User
        ) {

    var App = {

        start: function() {
            Sandbox.init();
            Widgets.init();
        }
    };

    return App;
} );
