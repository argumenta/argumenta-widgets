
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

    // Tests

    describe('Sandbox', function() {

        it('should be an object', function() {
            assert.isObject(Sandbox);
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
