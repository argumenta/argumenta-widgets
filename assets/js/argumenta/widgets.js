define( 'argumenta/widgets',
[
    "argumenta/config"
],
function( Config ) {

    var Widgets = {

        registerModule: function( module ) {
            var id = module.getModuleID();
            this.modules[ id ] = this.modules[ id ] || module;
        },

        module: function( id ) {
            return this.modules[ id ];
        },

        modules: { },

        init: function() {
            Widgets.initCss();
            Widgets.activateAll();
        },

        initCss: function() {
            // Checks if stylesheet for argumenta widgets is loaded
            var detectWidgetCss = function() {
                var styles = document.styleSheets;
                for (var i=0, l = styles.length; i < l; i++ ) {
                    if ( /argumenta.css$/.test( styles[i].href ) )
                        return true;
                }
            };

            var isLoaded = detectWidgetCss();

            // Only load widget styles dynamically if not already present
            if ( isLoaded  ) {
                return;
            }
            else {
                var cssUrl = Config.get('baseUrl') + '/widgets/css/argumenta.css';
                var link = document.createElement('link');

                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = cssUrl;

                document.head.appendChild( link );
            }
        },

        activateAll: function() {
            // Returns a module-specific function to activate placeholder elems
            var activateFor = function( module ) {
                return function() { module.activate( this ) };
            };

            for (var id in Widgets.modules ) {
                var module = Widgets.modules[id];
                var activateFunc = activateFor( module );
                $( module.getClassSelector() ).each( activateFunc );
            }
        }
    };

    return Widgets;

} );
