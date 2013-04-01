
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Tags',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Tags, Base) {

    var assert = chai.assert;

    // Tests

    describe('Tags', function() {

        it('should be a function', function() {
            assert.isFunction(Tags);
        });

        it('should include a moduleID', function() {
            assert.equal(Tags.prototype.moduleID, 'Tags');
        });

        describe('new Tags( options, element )', function() {

            it('should return a new Tags widget', sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                assert.instanceOf(
                    tags, Base,
                    'Tags widgets inherit from Base.'
                );
                assert.instanceOf(
                    tags, Tags,
                    'Tags widgets are instances of Tags.'
                );
            }));
        });
    });
});
