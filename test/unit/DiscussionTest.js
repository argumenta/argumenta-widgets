
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Discussion',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Discussion, Base) {

    var assert = chai.assert;

    // Tests

    describe('Discussion', function() {

        var defaults = {
            target_type: 'argument',
            target_sha1: '7077e1ce31bc8e9d2a88479aa2d159f2f9de4856'
        };

        it('should be a function', function() {
            assert.isFunction(Discussion);
        });

        it('should include a moduleID', function() {
            assert.equal(Discussion.prototype.moduleID, 'Discussion');
        });

        describe('new Discussion( options, element )', function() {

            it('should return a new Discussion widget', function() {
                var discussion = new Discussion(defaults);
                assert.instanceOf(
                    discussion, Base,
                    'Discussion widgets inherit from Base.'
                );
                assert.instanceOf(
                    discussion, Discussion,
                    'Discussion widgets are instances of Discussion.'
                );
            });
        });

        describe('getTargetType()', function() {
            it('should return the target type', function() {
                var discussion = new Discussion(defaults);
                assert.equal(
                    discussion.getTargetType(),
                    'argument',
                    'Check target type.'
                );
            });
        });

        describe('getTargetSha1()', function() {
            it('should return the target sha1', function() {
                var discussion = new Discussion(defaults);
                assert.equal(
                    discussion.getTargetSha1(),
                    '7077e1ce31bc8e9d2a88479aa2d159f2f9de4856',
                    'Check target sha1.'
                );
            });
        });
    });
});
