define( 'argumenta/sandbox',
[
    "argumenta/widgets"
],
function( Widgets ) {

    var Sandbox = {

        register: function( module ) {
            Widgets.registerModule( module );
        },

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

        // Construct an Argumenta widget from object data. Supports:
        //   Arguments    (from argument objects)
        //   Propositions (from proposition objects)
        //   Citations    (from tag objects with tag_type 'cite')
        widgetFor: function( obj ) {

            if ( !obj  ) {
                console.log("Missing object data: " + obj);
                return;
            }

            var module, type = obj.object_type || obj.type;

            if ( type === 'argument' ) {
                module = Widgets.module('Argument');
            }
            else if ( type === 'proposition' ) {
                module = Widgets.module('Proposition');
            }
            else if ( type === 'tag' && obj.tag_type === 'cite' ) {
                module = Widgets.module('Citation');
            }

            if ( module )
                return new module( obj );
        }
    };

    return Sandbox;

} );
