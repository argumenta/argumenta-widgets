
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Base) {

    var assert = chai.assert;

    describe('Base', function() {

        describe('new Base( options )', function() {

            it('should set the default option for baseUrl', function() {
                var base = new Base({});
                assert.equal(
                    base.options.base_url, "https://argumenta.io",
                    "Check the baseUrl default option."
                );
            });
        });
    });
});
