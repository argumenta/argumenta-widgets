define(
[
    'chai'
],
function( chai ) {

    assert = chai.assert;

    var Helpers = {};

    // Asserts that object A is a superset of B.
    Helpers.assertSuperset = function( A, B, message ) {
        try {
            for (var key in B) {
                assert.deepEqual(
                    A[key], B[key],
                    "Check key '" + key + "' of superset for deep equality."
                );
            }
        } catch (e) {
            throw new Error("Failed '" + message + "':\n" + e.message);
        }
    };

    return Helpers;
});
