define( 'argumenta/widgets/PropositionEditor',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./PropositionEditor/template.html.mustache"
],
function( $, Base, Template ) {

    var PropositionEditor = Base.module( {

        moduleID: 'PropositionEditor',
        template: Template,

        defaults: {
            placeholder: {
                text: 'My proposition...'
            },
            proposition: {
                text: ''
            }
        },

        init: function( options ) {
            var self = this;
        },

        prototype: {

            // Binds UI after refresh.
            _bindUI: function( options ) {
                var self = this;
                self.form = self.element.children('.proposition-form');
                self.textarea = self.form.children('.proposition-textarea');
                self.publishButton = self.form.children('.proposition-publish');
            },

            // Gets current proposition text.
            getText: function() {
                var self = this;
                return self.textarea.val();
            }
        }
    } );

    return PropositionEditor;
} );
