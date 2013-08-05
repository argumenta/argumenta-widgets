
define( 'argumenta/widgets/Search',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Search/template.html.mustache"
],
function( $, Base, Template ) {

    var Search = Base.module( {

        moduleID: 'Search',
        template: Template,

        defaults: {
        },

        init: function( options, originalElem ) {
            var self = this;
            self._refresh();
        },

        prototype: {

            // Binds UI behavior after refresh.
            _bindUI: function() {
                var self = this;
            },

        },

        "static": {
        }
    } );

    return Search;
} );
