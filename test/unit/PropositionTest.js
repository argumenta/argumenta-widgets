
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
    });
});
