
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/DiscussionEditor',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, DiscussionEditor, Base) {

    var assert = chai.assert;

    // Tests

    describe('DiscussionEditor', function() {

        var defaults = {
            target_type: 'argument',
            target_sha1: '7077e1ce31bc8e9d2a88479aa2d159f2f9de4856'
        };

        it('should be a function', function() {
            assert.isFunction(DiscussionEditor);
        });

        it('should include a moduleID', function() {
            assert.equal(DiscussionEditor.prototype.moduleID, 'DiscussionEditor');
        });

        describe('new DiscussionEditor( options, element )', function() {

            it('should return a new DiscussionEditor widget', function() {
                var discussionEditor = new DiscussionEditor(defaults);
                assert.instanceOf(
                    discussionEditor, Base,
                    'DiscussionEditor widgets inherit from Base.'
                );
                assert.instanceOf(
                    discussionEditor, DiscussionEditor,
                    'DiscussionEditor widgets are instances of DiscussionEditor.'
                );
            });
        });

        describe('getTargetType()', function() {
            it('should return the target type', function() {
                var discussionEditor = new DiscussionEditor(defaults);
                assert.equal(
                    discussionEditor.getTargetType(),
                    'argument',
                    'Check target type.'
                );
            });
        });

        describe('getTargetSha1()', function() {
            it('should return the target sha1', function() {
                var discussionEditor = new DiscussionEditor(defaults);
                assert.equal(
                    discussionEditor.getTargetSha1(),
                    '7077e1ce31bc8e9d2a88479aa2d159f2f9de4856',
                    'Check target sha1.'
                );
            });
        });

        describe('getCommentText()', function() {
            it('should return the initial comment\'s text', function() {
                var discussionEditor = new DiscussionEditor(defaults);
                discussionEditor.commentEditor.$textarea.val("My comment...")
                assert.equal(
                    discussionEditor.getCommentText(),
                    'My comment...',
                    'Check comment text.'
                );
            });
        });
    });
});
