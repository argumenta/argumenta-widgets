define( 'argumenta/app',
[
    "argumenta/config",
    "argumenta/sandbox",
    "argumenta/widgets",
    "argumenta/widgets/Base",
    "argumenta/widgets/Argument",
    "argumenta/widgets/AddTag",
    "argumenta/widgets/Citation",
    "argumenta/widgets/Proposition",
    "argumenta/widgets/PropositionEditor",
    "argumenta/widgets/Search",
    "argumenta/widgets/Sidebar",
    "argumenta/widgets/Tags",
    "argumenta/widgets/User"
],
function(
    Config,
    Sandbox,
    Widgets,
    Base,
    Argument,
    AddTag,
    Citation,
    Proposition,
    PropositionEditor,
    Search,
    Sidebar,
    Tags,
    User
) {

    var App = {

        start: function() {
            Sandbox.init();
            Widgets.init();
            Config.onLoad();
        }
    };

    return App;
} );
