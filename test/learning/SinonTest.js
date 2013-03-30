
define(
[
    'chai',
    'sinon',
    'jquery'
],
function(chai, undefined, undefined) {

    var assert = chai.assert;

    // Assertions

    var assertCleanXHR = function() {
        assert.isNotFunction(
            XMLHttpRequest.restore,
            'XMLHttpRequest lacks method `restore`.'
        );
    };

    var assertModifiedXHR = function() {
        assert.throws(
            assertCleanXHR,
            Error, null,
            'Sinon server modifies XHR.'
        );
    };

    // Tests

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

        describe('Sandbox', function() {

            it('should not affect XHR when unused', function() {
                assertCleanXHR();
            });

            it('should allow usage of server', sinon.test(function() {
                var server = sinon.fakeServer.create();
                assertModifiedXHR();
            }));

            it('should clean up server in previous test', function() {
                assertCleanXHR();
            });
        });
    });
});
