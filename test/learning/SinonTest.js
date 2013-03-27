
define(
[
    'chai',
    'sinon',
    'jquery'
],
function(chai, undefined, undefined) {

    var assert = chai.assert;

    describe('sinon', function() {

        it('should be an object', function() {
            assert.isObject(sinon, 'Check sinon object.');
        });

        describe('fakeServer', function() {

            var server;

            beforeEach(function() {
                server = sinon.fakeServer.create();
            });

            afterEach(function() {
                if (server.restore) server.restore();
            });

            it('should create a server object', function() {
                assert.isObject(server, 'Check server object.');
            });

            it('should respond to requests', function(done) {
                server.respondWith('Some response text.');

                var success = function() {
                    done();
                };
                var error = function() {
                    throw new Error("Failed Ajax request.");
                };
                $.ajax('/fake-url.json', {
                    success: success,
                    error: error
                });

                server.respond();
            });
        });
    });
});
