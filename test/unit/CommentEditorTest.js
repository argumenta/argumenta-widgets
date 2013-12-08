
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/CommentEditor',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, CommentEditor, Base) {

    var assert = chai.assert;

    // Tests

    describe('CommentEditor', function() {

        var defaults = {
            comment_text: 'My comment...',
            discussion_id: '3'
        };

        it('should be a function', function() {
            assert.isFunction(CommentEditor);
        });

        it('should include a moduleID', function() {
            assert.equal(CommentEditor.prototype.moduleID, 'CommentEditor');
        });

        describe('new CommentEditor( options, element )', function() {

            it('should return a new CommentEditor widget', function() {
                var commentEditor = new CommentEditor(defaults);
                assert.instanceOf(
                    commentEditor, Base,
                    'CommentEditor widgets inherit from Base.'
                );
                assert.instanceOf(
                    commentEditor, CommentEditor,
                    'CommentEditor widgets are instances of CommentEditor.'
                );
            });
        });

        describe('getText()', function() {
            it('should return the comment text', function() {
                var commentEditor = new CommentEditor(defaults);
                assert.equal(
                    commentEditor.getText(),
                    'My comment...',
                    'Check comment text.'
                );
            });
        });

        describe('getDiscussionId()', function() {
            it('should return the discussion id', function() {
                var commentEditor = new CommentEditor(defaults);
                assert.equal(
                    commentEditor.getDiscussionId(),
                    3,
                    'Check discussion id.'
                );
            });
        });
    });
});
