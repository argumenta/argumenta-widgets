
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
        });
    });
});
