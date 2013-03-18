
define(
[
    'chai',
    'argumenta/config',
    'argumenta/sandbox',
    'argumenta/widgets/Base',
    'argumenta/widgets/Argument'
],
function(chai, Config, Sandbox, Base, Argument) {

    var assert = chai.assert;

    describe('define()', function() {

        it('should load the Config module', function() {
            assert.isObject(Config);
        });

        it('should load the Sandbox module', function() {
            assert.isObject(Sandbox);
        });

        it('should load the Base module', function() {
            assert.isFunction(Base);
        });

        it('should load the Argument module', function() {
            assert.isFunction(Argument);
        });
    });
});
