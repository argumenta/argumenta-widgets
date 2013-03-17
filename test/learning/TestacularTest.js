
var assert = chai.assert;

describe("Testacular", function() {

    it('should pass a sanity check', function() {
        assert(true, 'true is truthy');
    });

    it('should provide describe', function() {
        assert.isFunction(describe);
    });

    it('should provide chai', function() {
        assert.isNotNull(chai);
    });
});
