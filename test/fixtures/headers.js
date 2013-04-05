
define(
[],
function() {

    /**
     * Builds a merged headers object for given fixtures.
     *
     *     var headers = Headers('JSON');
     *
     * @param {String} fixtures Space-separated list of fixture names.
     * @returns {Object} The merged fixture headers.
     */

    var Headers = function( fixtures ) {
        var result = {};
        var names = fixtures.split(' ');
        var fixture, keys, key, value;
        for (var i = 0; i < names.length; i++) {
            fixture = Headers[names[i]]();
            keys = Object.keys(fixture);
            for (var k = 0; k < keys.length; k++) {
                key = keys[k];
                value = fixture[key];
                result[key] = value;
            }
        }
        return result;
    };

    Headers.JSON = function() { return {
        "Content-Type": "application/json"
    }; };

    return Headers;
});
