
define(
[
    'chai',
    'fixtures',
    'argumenta/widgets/Argument',
    'argumenta/widgets/Base'
],
function(chai, fixtures, Argument, Base) {

    var assert = chai.assert;

    describe('Argument', function() {

        it('should be a function', function() {
            assert.isFunction(Argument);
        });

        it('should include a moduleID', function() {
            assert.equal(Argument.prototype.moduleID, 'Argument');
        });

        describe('new Argument( options, element )', function() {
            it('should return a new Argument widget', function() {
                var argData = fixtures.validArgumentData();
                var argument = new Argument(argData);
                assert.instanceOf(argument, Argument);
                assert.instanceOf(argument, Base);
            });
        });

        describe('getType()', function() {
            it('should return the object type', function() {
                var argument = fixtures.validArgument();
                assert.equal(argument.getType(), 'argument');
            });
        });

        describe('getSha1()', function() {
            it('should return the object sha1', function() {
                var argument = fixtures.validArgument();
                assert.equal(
                    argument.getSha1(),
                    '7077e1ce31bc8e9d2a88479aa2d159f2f9de4856',
                    'Check SHA1.'
                );
            });
        });

        describe('setPropositions( props )', function() {
            it('should load the given propositions data', function() {
                var data = fixtures.validArgumentData();
                var argument = new Argument(data);
                argument.setPropositions([]);
                assert.deepEqual(
                    argument.propositions, [],
                    'Clear propositions.'
                );
                argument.setPropositions(data.propositions);
                assert.deepEqual(
                    argument.propositions, data.propositions,
                    'Set propositions.'
                );
            });
        });
    });
});
