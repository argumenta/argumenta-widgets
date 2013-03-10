define( 'argumenta/sandbox',
[
    "require-jquery",
    "argumenta/widgets"
],
function( $, Widgets ) {

    var Sandbox = {

        // Inits the sandbox.
        init: function() {
            var self = this;
            self.initNotify();
        },

        // Inits notifications property and element.
        initNotify: function() {
            var self = this;
            var notifications = $('.argumenta .notifications');
            self.notifications = notifications.length > 0
                ? notifications
                : $('<div class="argumenta"><div class="notifications"></div></div>')
                    .appendTo('body');
            self.notifications.children().delay(8000).fadeOut(2000);
            return self.notifications;
        },

        // Gets the notifications element.
        getNotifications: function() {
            var self = this;
            var notifications = self.notifications || self.initNotify();
            return notifications;
        },

        // Shows a notification message.
        notify: function( message ) {
            var self = this;
            var notifications = self.getNotifications();
            var elem = $('<div class="info"></div>')
                .text( message )
                .appendTo( notifications )
                .delay(8000).fadeOut(2000);
        },

        // Shows a notification warning.
        warn: function( message ) {
            var self = this;
            var notifications = self.getNotifications();
            var elem = $('<div class="error"></div>')
                .text( message )
                .appendTo( notifications )
                .delay(8000).fadeOut(2000);
        },

        // Registers a given widget module.
        register: function( module ) {
            Widgets.registerModule( module );
        },

        // Gets a widget module by ID.
        widgets: function( moduleID ) {
            return Widgets.module( moduleID );
        },

        // Construct multiple widgets from an array of object data
        widgetsFor: function( objects ) {
            var widgets = [];

            for (var i=0, l=objects.length; i<l; i++) {
                widgets.push( Sandbox.widgetFor( objects[i] ) );
            }
            return widgets;
        },

        // Construct an Argumenta widget from object data.
        // Supports: argument, proposition, and citation.
        widgetFor: function( obj ) {
            var module
              , type = obj.object_type || obj.type;

            if ( !obj  ) {
                console.log("Missing object data: " + obj);
                return;
            }

            if ( type === 'argument' ) {
                module = Widgets.module('Argument');
            }
            else if ( type === 'proposition' ) {
                module = Widgets.module('Proposition');
            }
            else if ( type === 'tag' && obj.tag_type === 'citation' ) {
                module = Widgets.module('Citation');
            }

            return module ? new module( obj ) : null;
        }
    };

    return Sandbox;

} );
