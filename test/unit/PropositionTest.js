
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Proposition',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Proposition, Base) {

    var assert = chai.assert;

    // Assertions

    var assertAddTagVisible = function( prop ) {
        assert.equal(
            prop.addTagVisible, true,
            'Check AddTag visibility.'
        );
    };

    var assertTagCount = function( prop, type, count ) {
        var $count = prop.main.find('.tag-counts .' + type + 's');
        var html = $count.html().replace(/\s*/g, '');
        assert.equal(
            html,
            count,
            'Check ' + type + ' tag count.'
        );
    };

    var assertTagCounts = function( prop, counts ) {
        assertTagCount(prop, 'support', counts.support);
        assertTagCount(prop, 'dispute', counts.dispute);
        assertTagCount(prop, 'citation', counts.citation);
    };

    var assertTagsVisible = function( prop ) {
        assert.equal(
            prop.tagsVisible, true,
            'Check Tags visibility.'
        );
    };

    // Helpers

    var withTagsServer = function( tags, sources ) {
        tags = tags || [];
        sources = sources || [];
        var server = sinon.fakeServer.create();
        server.respondWith(
            'GET',
            new RegExp('/propositions/[0-9a-f]{40}/tags-plus-sources.json'),
            [
                200,
                fixtures.headers('JSON'),
                JSON.stringify({tags: tags, sources: sources})
            ]
        );
        return server;
    }

    // Tests

    describe('Proposition', function() {

        it('should be a function', function() {
            assert.isFunction(Proposition);
        });

        it('should include a moduleID', function() {
            assert.equal(Proposition.prototype.moduleID, 'Proposition');
        });

        describe('new Proposition( options, element )', function() {

            it('should return a new Proposition widget', function() {
                var data = fixtures.validPropositionData();
                var proposition = new Proposition(data);
                assert.instanceOf(
                    proposition, Base,
                    'Proposition widgets inherit from Base.'
                );
                assert.instanceOf(
                    proposition, Proposition,
                    'Proposition widgets are instances of Proposition.'
                );
            });

            it('should display the proposition index', function() {
                var data = fixtures.validPropositionData();
                var proposition = new Proposition(data);
                var $span = proposition.element.find('span.index');
                var html = $span.html();
                assert.include(
                    html, 'P.',
                    'Check index.'
                );
            });

            it('should display the proposition text', function() {
                var data = fixtures.validPropositionData();
                var proposition = new Proposition(data);
                var $span = proposition.element.find('span.text');
                var html = $span.html();
                assert.include(
                    html, data.text,
                    'Check text.'
                );
            });

            it('should display the proposition SHA-1', function() {
                var data = fixtures.validPropositionData();
                var proposition = new Proposition(data);
                var $link = proposition.element.find('span.sha1 a');
                var href = $link.prop('href');
                var sha1 = $link.html();
                assert.include(
                    href, '/propositions/' + data.sha1,
                    'Check object link.'
                );
                assert.include(
                    sha1, data.sha1.substr(0, 20),
                    'Check SHA-1.'
                );
            });
        });

        describe('getType()', function() {
            it('should return the object type', function() {
                var prop = fixtures.validProposition();
                assert.equal(
                    prop.getType(), 'proposition',
                    'Check object type.'
                );
            });
        });

        describe('getSha1()', function() {
            it('should return the object SHA-1', function() {
                var prop = fixtures.validProposition();
                assert.equal(
                    prop.getSha1(),
                    '71a7ccf87a4ba1fbb3b3199fdf5a56c6ee209178',
                    'Check SHA-1.'
                );
            });
        });

        describe('AddTag button', function() {

            it('should toggle AddTag widget when clicked', function() {
                var prop = fixtures.validProposition();
                var checkAddTag = function() {
                    assertAddTagVisible(prop);
                };
                assert.throws(
                    checkAddTag,
                    Error, null,
                    'AddTag initially hidden.'
                );
                prop.addTagButton.click();
                assert.doesNotThrow(
                    checkAddTag,
                    Error, null,
                    'AddTag revealed after click.'
                );
                prop.addTagButton.click();
                assert.throws(
                    checkAddTag,
                    Error, null,
                    'AddTag hidden after second click.'
                );
            });
        });

        describe('Proposition tags', function() {

            it('should show correct tag counts', function() {
                var data = fixtures.validPropositionData();
                data.metadata = fixtures.validPropositionMetadata();
                var counts = data.metadata.tag_counts;
                var prop = new Proposition(data);
                assertTagCounts(prop, counts);
            });

            it('should not show tags initially', function() {
                var data = fixtures.validPropositionData();
                var prop = new Proposition(data);
                var checkTagsVisible = function( prop ) {
                    assertTagsVisible(prop);
                };
                assert.throws(
                    checkTagsVisible,
                    Error, null,
                    'Tags initially hidden.'
                );
            });

            it('should toggle tags when element clicked',
            sinon.test(function() {
                var data = fixtures.validPropositionData();
                var prop = new Proposition(data);
                var server = withTagsServer();
                var checkTagsVisible = function() {
                    assertTagsVisible(prop);
                };
                assert.throws(
                    checkTagsVisible,
                    Error, null,
                    'Tags initially hidden.'
                );
                prop.element.click();
                server.respond();
                assert.doesNotThrow(
                    checkTagsVisible,
                    Error, null,
                    'Tags revealed on click.'
                );
                prop.element.click();
                assert.throws(
                    checkTagsVisible,
                    Error, null,
                    'Tags hidden after second click.'
                );
            }));
        });
    });
});
