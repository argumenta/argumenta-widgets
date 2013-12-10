define( 'argumenta/widgets/DiscussionEditor',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./DiscussionEditor/template.html.mustache",
    "argumenta/sandbox",
    "argumenta/widgets/CommentEditor",
    "jquery-autosize",
    "jquery-charcount"
],
function( $, Base, Template, Sandbox, CommentEditor, autosize, charCount ) {

    var DiscussionEditor = Base.module( {

        moduleID: 'DiscussionEditor',
        template: Template,

        defaults: {
            target_type: null,
            target_sha1: null
        },

        init: function( options ) {
            var self = this;
            self.initCommentEditor();
        },

        prototype: {

            // Gets target type for this discussion.
            getTargetType: function() {
                var self = this;
                return self.options.target_type;
            },

            // Gets target sha1 for this discussion.
            getTargetSha1: function() {
                var self = this;
                return self.options.target_sha1;
            },

            // Gets current text for the initial comment.
            getCommentText: function() {
                var self = this;
                return self.commentEditor.getText();
            },

            // Binds UI after refresh.
            _bindUI: function( options ) {
                var self = this;
                self.$commentContainer = self.element.children('.comment-container');
                self.$commentEditor = self.$commentContainer.children('.comment-editor-widget');
            },

            // Inits embedded comment editor.
            initCommentEditor: function() {
                var self = this;
                var submit = function() {
                    self.submitDiscussion();
                };
                var options = {
                    header: 'Start a discussion!',
                    custom_submit: submit
                };
                var commentEditor = new CommentEditor(options);
                self.$commentContainer.append(commentEditor.element);
                self.$commentEditor = commentEditor.element;
                self.commentEditor = commentEditor;
            },

            // Submits discussion data.
            submitDiscussion: function() {
                var self = this;
                var base = self.options.base_url;
                var path = '/discussions.json'
                var url = base + path;
                var data = {
                    target_type: self.getTargetType(),
                    target_sha1: self.getTargetSha1(),
                    comment_text: self.getCommentText()
                };
                var success = function(data, status, xhr) {
                    Sandbox.notify(data.message);
                };
                var error = function(data) {
                    Sandbox.error(data);
                };
                $.post(url, data).done(success).fail(error);
            }
        }
    } );

    return DiscussionEditor;
} );
