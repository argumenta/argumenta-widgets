
define(['chai', 'argumenta/config'], function(chai, Config) {

    var assert = chai.assert;

    describe('define()', function() {

        it('should load the Config module', function() {
            assert.isObject(Config);
        });

        it('should load the Argument module');
    });
});
