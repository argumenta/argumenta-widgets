
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

        describe('getTagType()', function() {
            it('should return the tag type', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.equal(
                    addTag.getTagType(),
                    data.tag_type,
                    'Check tag type.'
                );
            });
        });

        describe('getTargetType()', function() {
            it('should return the target type', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.equal(
                    addTag.getTargetType(),
                    data.target_type,
                    'Check target type.'
                );
            });
        });

        describe('getTargetSha1()', function() {
            it('should return the target SHA-1', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.equal(
                    addTag.getTargetSha1(),
                    data.target_sha1,
                    'Check target SHA-1.'
                );
            });
        });

        describe('getSourceType()', function() {
            it('should return the source type', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.equal(
                    addTag.getSourceType(),
                    data.source_type,
                    'Check source type.'
                );
            });
        });

        describe('getSourceSha1()', function() {
            it('should return the source SHA-1', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.equal(
                    addTag.getSourceSha1(),
                    data.source_sha1,
                    'Check source SHA-1.'
                );
            });
        });
    });
});
