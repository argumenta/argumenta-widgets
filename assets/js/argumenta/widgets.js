define( 'argumenta/widgets',
[
    "argumenta/config"
],
function( Config ) {

    var Widgets = {

        // Registers a given widget module.
        registerModule: function( module ) {
            var id = module.getModuleID();
            this.modules[ id ] = this.modules[ id ] || module;
        },

        // Gets a module by ID.
        module: function( id ) {
            return this.modules[ id ];
        },

        // Cache of registered modules.
        modules: { },

        // Inits widgets.
        init: function() {
            Widgets.initCSS();
            Widgets.activateAll();
        },

        // Inits all widget CSS.
        initCSS: function() {

            // Checks if argumenta widget CSS is loaded.
            var detectWidgetCSS = function() {
                var styles = document.styleSheets;
                for ( var i=0, l = styles.length; i < l; i++ ) {
                    if ( /argumenta.css$/.test( styles[i].href ) )
                        return true;
                }
            };

            // Load CSS unless present.
            if ( !detectWidgetCSS() ) {
                var cssUrl = Config.get('widgetsUrl') + '/css/argumenta.css';
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = cssUrl;
                document.head.appendChild( link );
            }
        },

        // Activates all widgets on current page.
        activateAll: function() {
            var activationList = [
                'Base',
                'Sidebar',
                'Search',
                'User',
                'Argument',
                'AddTag',
                'Tags',
                'Proposition',
                'Citation'
            ];

            // Returns function to activate placeholders for a module.
            var activateFor = function( module ) {
                return function() { module.activate( this ) };
            };

            // Activate widgets for each module.
            for ( var n in activationList ) {
                var id = activationList[n];
                var module = Widgets.modules[id];
                var activateFunc = activateFor( module );
                $( module.getClassSelector() ).each( activateFunc );
            }
        }
    };

    return Widgets;

} );
