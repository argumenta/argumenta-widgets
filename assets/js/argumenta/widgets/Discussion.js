define( 'argumenta/widgets/Discussion',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Discussion/template.html.mustache",
    "argumenta/sandbox",
    "argumenta/widgets/Comment",
    "argumenta/widgets/CommentEditor",
],
function( $, Base, Template, Sandbox, Comment, CommentEditor ) {

    var Discussion = Base.module( {

        moduleID: 'Discussion',
        template: Template,

        defaults: {
            discussion_id: null,
            target_type: null,
            target_sha1: null,
            target_owner: '',
            creator: '',
            created_at: '',
            updated_at: '',
            comments: [],
            participants_count: 0,
            comments_count: 0
        },

        init: function( options ) {
            var self = this;
            if (options.comments) {
                self.setComments(options.comments);
            }
        },

        prototype: {

            // Gets the discussion id.
            getDiscussionId: function() {
                var self = this;
                return self.options.discussion_id;
            },

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

            // Set the comments data for this discussion.
            setComments: function(comments) {
                var self = this;
                self.comments = [];
                self.$commentsContainer.empty();
                for (var i = 0; i < comments.length; i++) {
                    var options = $.extend({}, comments[i], {discussion: self});
                    var comment = new Comment(options);
                    self.comments.push(comment);
                    self.$commentsContainer.append(comment.element);
                }
                self.options.comments = comments;
                self.options.comments_count = comments.length;
                self.updateParticipants();
            },

            // Toggle the discussion's comment editor.
            toggleCommentEditor: function() {
                var self = this;
                // Initialize editor.
                if (!self.commentEditor) {
                    self.initCommentEditor();
                }
                // Just hide the editor if already shown.
                if (self.$commentContainer.is(':visible')) {
                    self.$commentContainer.hide(300);
                    return;
                }
                // Get the editor's position.
                self.$commentContainer.show();
                var $window = $(window);
                var $editor = self.$commentEditor;
                var position = $editor.offset().top +
                               $editor.height() - $window.height() + 10;
                // Reveal the editor.
                self.$commentContainer.hide();
                self.$commentContainer.show(300);
                // Scroll editor into view.
                $('html, body').animate({ scrollTop: position }, 300);
            },

            // Updates the participants count.
            updateParticipants: function() {
                var self = this;
                var byAuthor = {};
                for (var i = 0; i < self.options.comments.length; i++) {
                    var comment = self.options.comments[i];
                    var author = comment.author;
                    if (!byAuthor[author]) byAuthor[author] = [];
                    byAuthor[author].push(comment);
                }
                var participants = Object.keys(byAuthor);
                var count = participants.length;
                self.options.participants_count = count;
                self.$participantsCount.text(count);
            },

            // Binds UI after refresh.
            _bindUI: function( options ) {
                var self = this;
                self.$discussionHeader = self.element.children('.discussion-header');
                self.$participantsCount = self.$discussionHeader.children('.participants-count');
                self.$commentsContainer = self.element.children('.comments-container');
                self.$commentContainer = self.element.children('.comment-container');
                self.$commentEditor = self.$commentContainer.children('.comment-editor-widget');
            },

            // Inits embedded comment editor.
            initCommentEditor: function() {
                var self = this;
                var update = function() {
                    self.update();
                    self.toggleCommentEditor();
                };
                var options = {
                    discussion_id: self.getDiscussionId(),
                    header: 'Continue the discussion!',
                    on_create: update
                };
                var commentEditor = new CommentEditor(options);
                self.$commentContainer.append(commentEditor.element);
                self.$commentEditor = commentEditor.element;
                self.commentEditor = commentEditor;
            },

            // Updates the discussion.
            update: function() {
                var self = this;
                var base = self.options.base_url;
                var id = self.getDiscussionId();
                var path = '/discussions/' + id + '.json'
                var url = base + path;
                var success = function(data, status, xhr) {
                    self.setComments(data.discussion.comments);
                };
                var error = function(data) {
                    Sandbox.error(data);
                };
                $.get(url).done(success).fail(error);
            }
        }
    } );

    return Discussion;
} );
