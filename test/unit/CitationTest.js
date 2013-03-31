
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Citation',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Citation, Base) {

    var assert = chai.assert;

    // Tests

    describe('Citation', function() {

        it('should be a function', function() {
            assert.isFunction(Citation);
        });

        it('should include a moduleID', function() {
            assert.equal(Citation.prototype.moduleID, 'Citation');
        });

        describe('new Citation( options, element )', function() {

            it('should return a new Citation widget', function() {
                var data = fixtures.validCitationData();
                var citation = new Citation(data);
                assert.instanceOf(citation, Citation);
                assert.instanceOf(citation, Base);
            });

            it('should display the citation text', function() {
                var data = fixtures.validCitationData();
                var citation = new Citation(data);
                var text = Citation.linkify(data.citation_text);
                var html = citation.element.html();
                assert.include(
                    html, text,
                    'Check citation text.'
                );
            });
        });

        describe('Citation.linkify( text )', function() {
            it('should wrap links with an anchor tag', function() {
                var text = 'A description, with url: http://wikipedia.org';
                var result = Citation.linkify(text);
                var expected =
                    'A description, with url: ' +
                    '<a href="http://wikipedia.org">http://wikipedia.org</a>';
                assert.equal(
                    result, expected,
                    'Check linkify result.'
                );
            });
        });
    });
});
