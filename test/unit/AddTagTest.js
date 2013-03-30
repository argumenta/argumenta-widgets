
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/AddTag',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, AddTag, Base) {

    var assert = chai.assert;

    // Tests

    describe('AddTag', function() {

        it('should be a function', function() {
            assert.isFunction(AddTag);
        });

        it('should include a moduleID', function() {
            assert.equal(AddTag.prototype.moduleID, 'AddTag');
        });

        describe('new AddTag( options, element )', function() {

            it('should return a new AddTag widget', function() {
                var target = fixtures.validPropositionData();
                var opts = {
                    tag_type:   'support',
                    target_type: target.target_type,
                    target_sha1: target.target_sha1
                };
                var addTag = new AddTag(opts);
                assert.instanceOf(
                    addTag, Base,
                    'AddTag widgets inherit from Base.'
                );
                assert.instanceOf(
                    addTag, AddTag,
                    'AddTag widgets are instances of AddTag.'
                );
            });
        });
    });
});
