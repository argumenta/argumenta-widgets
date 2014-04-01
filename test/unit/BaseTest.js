
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

        describe('activate( element )', function() {

            it('should accept data attributes as options', function() {
                var html = '<div class="base-widget" data-base=\'{ "foo": 1 }\'></div>';
                var $element = $(html);
                $('body').append($element);
                var $widget = Base.activate($element);
                var widget = $widget.data('base-widget');
                assert(
                    widget.options.foo, 1,
                    "Check option foo is set."
                );
            });

            it('should accept multi-line data attributes', function() {
                var html = '<div class="base-widget" data-baz="3" data-base=\'{\n' +
                    '"foo": 1,\n' +
                    '"bar": 2\n' +
                    '}\'></div>';
                var $element = $(html);
                $('body').append($element);
                var $widget = Base.activate($element);
                var widget = $widget.data('base-widget');
                assert(
                    widget.options.foo, 1,
                    "Check option foo is set."
                );
                assert(
                    widget.options.bar, 2,
                    "Check option bar is set."
                );
                assert(
                    widget.options.baz, 3,
                    "Check option baz is set."
                );
            });
        });
    });
});
