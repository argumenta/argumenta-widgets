
define(
[
    'chai',
    'argumenta/config',
    'argumenta/sandbox',
    'argumenta/widgets/Base',
    'argumenta/widgets/Argument',
    'argumenta/app',
    'argumenta'
],
function(chai, Config, Sandbox, Base, Argument, App, Argumenta) {

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

        it('should load the App module', function() {
            assert.isObject(App);
        });

        it('should load the Argumenta module', function() {
            assert.isObject(Argumenta);
        });
    });
});
