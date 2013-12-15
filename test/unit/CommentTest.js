
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Comment',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Comment, Base) {

    var assert = chai.assert;

    // Tests

    describe('Comment', function() {

        var defaults = {
            comment_id: 2,
            author: 'tester',
            comment_text: 'My comment...',
            comment_date: (new Date).toISOString(),
            discussion_id: 2
        };

        it('should be a function', function() {
            assert.isFunction(Comment);
        });

        it('should include a moduleID', function() {
            assert.equal(Comment.prototype.moduleID, 'Comment');
        });

        describe('new Comment( options, element )', function() {

            it('should return a new Comment widget', function() {
                var comment = new Comment(defaults);
                assert.instanceOf(
                    comment, Base,
                    'Comment widgets inherit from Base.'
                );
                assert.instanceOf(
                    comment, Comment,
                    'Comment widgets are instances of Comment.'
                );
            });
        });

        describe('getText()', function() {
            it('should return the comment text', function() {
                var comment = new Comment(defaults);
                assert.equal(
                    comment.getText(),
                    'My comment...',
                    'Check comment text.'
                );
            });
        });

        describe('getCommentId()', function() {
            it('should return the comment id', function() {
                var comment = new Comment(defaults);
                assert.equal(
                    comment.getCommentId(),
                    2,
                    'Check comment id.'
                );
            });
        });

        describe('getDiscussionId()', function() {
            it('should return the discussion id', function() {
                var comment = new Comment(defaults);
                assert.equal(
                    comment.getDiscussionId(),
                    2,
                    'Check discussion id.'
                );
            });
        });
    });
});
