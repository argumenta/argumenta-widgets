
define(['chai'], function(chai) {

    var assert = chai.assert;

    describe('RequireJS', function() {

        it('should work as a Testacular adapter', function(){
            assert.ok(true);
        });

        it('should load chai', function() {
            assert.isObject(chai);
        });

        it('should provide require', function() {
            assert.isFunction(require);
        });
    });
});
