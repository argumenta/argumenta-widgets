
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/sandbox',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Sandbox, Base) {

    var assert = chai.assert;

    // Helpers

    var removeCookie = function(name) {
        document.cookie = name + '=; expires=' + new Date(0).toGMTString();
    };

    var setCookie = function(name, value) {
        document.cookie = name + '=' + value;
    };

    // Tests

    describe('Sandbox', function() {

        it('should be an object', function() {
            assert.isObject(Sandbox);
        });

        describe('session()', function() {

            it('should return empty object when cookie is empty', function() {
                removeCookie('session');
                var session = Sandbox.session();
                assert.deepEqual(session, {}, "Check session is empty.");
            });

            it('should include each property when cookie is set', function() {
                setCookie('session', '{"username": "tester"}')
                var session = Sandbox.session();
                assert.deepEqual(
                    session,
                    { username: 'tester' },
                    "Check session is set."
                );
            });
        });

        describe('username()', function() {

            it('should return null when not logged in', function() {
                removeCookie('session');
                var username = Sandbox.username();
                assert.equal(
                    username, null, "Check username is null."
                );
            });

            it('should return username when logged in', function() {
                setCookie('session', '{"username": "tester"}');
                var username = Sandbox.username();
                assert.equal(
                    username, 'tester', "Check username is set."
                );
            });
        });

        describe('widgetFor( object )', function() {

            it('should return a widget for given object data', function() {
                var data = fixtures.validPropositionData();
                var module = Sandbox.widgets('Proposition');
                var widget = Sandbox.widgetFor(data);
                assert.instanceOf(
                    widget, module,
                    'Check widget instance.'
                );
            });
        });

        describe('widgetsFor( objects )', function() {

            it('should return widgets for an array of object data', function() {
                var data = [
                    fixtures.validArgumentData(),
                    fixtures.validPropositionData(),
                    fixtures.validCitationData()
                ];
                var modules = [
                    Sandbox.widgets('Argument'),
                    Sandbox.widgets('Proposition'),
                    Sandbox.widgets('Citation')
                ];
                var widgets = Sandbox.widgetsFor(data);
                for (var i = 0; i < data.length; i++) {
                    var widget = widgets[i];
                    var module = modules[i];
                    assert.instanceOf(
                        widget, module,
                        'Check widget instance [' + i + '].'
                    );
                }
            });
        });
    });
});
