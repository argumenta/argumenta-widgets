
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
    });
});
