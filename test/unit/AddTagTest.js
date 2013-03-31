
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

        describe('getCitationText()', function() {
            it('should return the citation text', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.equal(
                    addTag.getCitationText(),
                    data.citation_text,
                    'Check citation text.'
                );
            });
        });

        describe('Tag type buttons', function() {

            it('should have a button for each tag type', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.lengthOf(
                    addTag.supportButton, 1,
                    'Check support button.'
                );
                assert.lengthOf(
                    addTag.disputeButton, 1,
                    'Check dispute button.'
                );
                assert.lengthOf(
                    addTag.citationButton, 1,
                    'Check citation button.'
                );
            });

            it('should change the tag type when clicked', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                addTag.disputeButton.click();
                assert.equal(
                    addTag.getTagType(), 'dispute',
                    'Check dispute button.'
                );
                addTag.citationButton.click();
                assert.equal(
                    addTag.getTagType(), 'citation',
                    'Check citation button.'
                );
                addTag.supportButton.click();
                assert.equal(
                    addTag.getTagType(), 'support',
                    'Check support button.'
                );
            });
        });

        describe('Citation text', function() {
            it('should have a citation textarea', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.lengthOf(
                    addTag.citationTextarea, 1,
                    'Check citation textarea.'
                );
            });
        });

        describe('Drop box', function() {

            it('should have a dropbox for tag source', function() {
                var data = fixtures.validAddTagData();
                var addTag = new AddTag(data);
                assert.lengthOf(
                    addTag.dropbox, 1,
                    'Check dropbox.'
                );
            });

            it('should set tag source when proposition dropped', function() {
                var prop = fixtures.validProposition();
                var data = fixtures.addTagDataFor('', {}, {});
                var addTag = new AddTag(data);
                var event = {};
                var ui = {
                    draggable: prop.element
                };
                var onDrop = AddTag.dropboxOptions.drop;
                onDrop.apply(addTag.dropbox, [event, ui]);
                assert.equal(
                    addTag.getSourceType(), prop.getType(),
                    'Check dropped source type.'
                );
                assert.equal(
                    addTag.getSourceSha1(), prop.getSha1(),
                    'Check dropped source SHA-1.'
                );
            });

            it('should set tag source when argument dropped', function() {
                var arg = fixtures.validArgument();
                var data = fixtures.addTagDataFor('', {}, {});
                var addTag = new AddTag(data);
                var event = {};
                var ui = {
                    draggable: arg.element
                };
                var onDrop = AddTag.dropboxOptions.drop;
                onDrop.apply(addTag.dropbox, [event, ui]);
                assert.equal(
                    addTag.getSourceType(), arg.getType(),
                    'Check dropped source type.'
                );
                assert.equal(
                    addTag.getSourceSha1(), arg.getSha1(),
                    'Check dropped source SHA-1.'
                );
            });
        });
    });
});
