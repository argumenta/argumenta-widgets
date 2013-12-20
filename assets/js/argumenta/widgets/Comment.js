define( 'argumenta/widgets/Comment',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Comment/template.html.mustache",
    "moment"
],
function( $, Base, Template, moment ) {

    var Comment = Base.module( {

        moduleID: 'Comment',
        template: Template,

        defaults: {
            author: '',
            gravatar_id: '',
            comment_text: '',
            comment_date: null,
            comment_id: null,
            discussion_id: null,
            discussion: null
        },

        init: function( options ) {
            var self = this;
            self.discussion = options.discussion;
        },

        prototype: {

            // Gets the comment id.
            getCommentId: function() {
                var self = this;
                return self.options.comment_id;
            },

            // Gets the discussion id.
            getDiscussionId: function() {
                var self = this;
                return self.options.discussion_id;
            },

            // Gets current comment text.
            getText: function() {
                var self = this;
                return self.options.comment_text;
            },

            // Binds UI after refresh.
            _bindUI: function( options ) {
                var self = this;
                self.$text = self.element.children('.comment-text');
                self.$actions = self.element.children('.comment-actions');
                self.$reply = self.$actions.children('.comment-reply');
                self.$reply.click(function(event) {
                    event.preventDefault();
                    event.target.blur();
                    self.discussion.toggleCommentEditor();
                });
            },

            // Gets view options for template.
            _getViewOptions: function() {
                var self = this;
                var date = self.options.comment_date;
                var text = self.options.comment_text;
                var daysAgo = moment().diff(moment(date), 'days', true);
                var shortDate = daysAgo < 1
                    ? moment(date).fromNow()
                    : daysAgo >= 365
                    ? moment(date).format('MMM D YYYY')
                    : moment(date).format('MMM D');
                var escape = function(string) {
                    return $('<div></div>').text(string).html();
                };
                var format = function(string) {
                    return string.replace(/\n/g, '<br>')
                };
                var viewOptions = {
                    escaped_text: format(escape(text)),
                    short_date: shortDate
                };
                return $.extend( {}, self.options, viewOptions );
            }
        }
    } );

    return Comment;
} );
