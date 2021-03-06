define( 'argumenta/config',
[],
function() {

    // Load deployed config settings.
    var CONFIG = window.ARGUMENTA_CONFIG = window.ARGUMENTA_CONFIG || {};

    // Config module.
    var Config = {

        // The base url for API requests.
        baseUrl: CONFIG.baseUrl || 'https://argumenta.io',

        // The base url for widget resources.
        widgetsUrl: CONFIG.widgetsUrl || 'https://argumenta.io/widgets',

        // Gets a config property by name.
        get: function( name ) {
            return Config[name];
        },

        // Runs once Argumenta is loaded.
        onLoad: CONFIG.onLoad || function() {}
    };

    return Config;

} );
