define( 'argumenta/widgets/CommentEditor',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./CommentEditor/template.html.mustache",
    "argumenta/sandbox",
    "jquery-autosize",
    "jquery-charcount"
],
function( $, Base, Template, Sandbox, autosize, charCount ) {

    var CommentEditor = Base.module( {

        moduleID: 'CommentEditor',
        template: Template,

        defaults: {
            header: 'Add your comment!',
            placeholder: 'Focused analysis and friendly commentary encouraged!',
            comment_text: '',
            discussion_id: null,
            max_characters: 2400,
            custom_submit: null,
            on_create: null
        },

        init: function( options ) {
            var self = this;
            self.setText(options.comment_text);
        },

        prototype: {

            // Gets current comment text.
            getText: function() {
                var self = this;
                return self.$textarea.val();
            },

            // Gets the comment's discussion id.
            getDiscussionId: function() {
                var self = this;
                return self.options.discussion_id;
            },

            // Sets the comment text.
            setText: function(text) {
                var self = this;
                self.options.comment_text = text;
                self.$textarea.val(text);
            },

            // Binds UI after refresh.
            _bindUI: function( options ) {
                var self = this;
                self.$form = self.element.children('.comment-form');
                self.$textWrapper = self.$form.children('.comment-text-wrapper');
                self.$textarea = self.$textWrapper.children('.comment-textarea');
                self.$publishButton = self.$form.children('.comment-publish');
                self.resizeCount = 0;
                self.$textarea.autosize({
                    append: '\n',
                    callback: function() {
                        if (self.resizeCount <= 2) {
                            self.$textarea.trigger('autosize.resizeIncludeStyle');
                            self.resizeCount++;
                        }
                    }
                });
                self.$textarea.charCount({
                    allowed: self.options.max_characters
                });
                self.$form.submit(function (event) {
                    var customSubmit = self.options.custom_submit;
                    customSubmit ? customSubmit() : self.submit();
                    event.preventDefault();
                });
            },

            // Submits comment data.
            submit: function() {
                var self = this;
                var base = self.options.base_url;
                var path = '/comments.json'
                var url = base + path;
                var data = {
                    comment_text: self.getText(),
                    discussion_id: self.getDiscussionId()
                };
                var success = function(data, status, xhr) {
                    Sandbox.notify(data.message);
                    var callback = self.options.on_create;
                    if (callback) callback( data.comment );
                };
                var error = function(data) {
                    Sandbox.error(data);
                };
                $.post(url, data).done(success).fail(error);
            }
        }
    } );

    return CommentEditor;
} );
