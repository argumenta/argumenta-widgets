define( 'argumenta/config', [], function() {

    var Config = {

        mode: 'testing',

        production: {
            baseUrl : ''
        },

        testing: {
            baseUrl : window.location
              .toString()
              .match( /(https?:\/\/[^\/]*)/ )[1]
        },

        get:
        function get( name ) {
            return (Config.mode == 'testing') ? Config.testing[ name ] : Config.production[ name ];
        }
    };

    return Config;

} );
