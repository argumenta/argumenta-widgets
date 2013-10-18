define( 'argumenta/widgets/PropositionEditor',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./PropositionEditor/template.html.mustache",
    "jquery-autosize",
    "jquery-charcount"
],
function( $, Base, Template, autosize, charCount ) {

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
                self.textWrapper = self.form.children('.proposition-text-wrapper');
                self.textarea = self.textWrapper.children('.proposition-textarea');
                self.publishButton = self.form.children('.proposition-publish');
                self.textarea.autosize().charCount({ allowed: 240 });
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
