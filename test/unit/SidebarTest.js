
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Sidebar',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Sidebar, Base) {

    var assert = chai.assert;

    // Tests

    describe('Sidebar', function() {

        afterEach(function() {
            $(window).unbind('scroll');
            $(window).unbind('resize');
            $('body').empty();
        });

        it('should be a function', function() {
            assert.isFunction(Sidebar);
        });

        it('should include a moduleID', function() {
            assert.equal(Sidebar.prototype.moduleID, 'Sidebar');
        });

        describe('new Sidebar( options, element )', function() {

            it('should return a new Sidebar widget', sinon.test(function() {
                var server = sinon.fakeServer.create();
                var sidebar = new Sidebar();
                assert.instanceOf(
                    sidebar, Base,
                    'Sidebar widgets inherit from Base.'
                );
                assert.instanceOf(
                    sidebar, Sidebar,
                    'Sidebar widgets are instances of Sidebar.'
                );
            }));
        });

        describe('update()', function() {

            it('should scroll to middle position', function(done) {
                var sidebar = new Sidebar();
                var $parent = $('<div style="height: 2000px;"></div>');
                var $body = $('body');
                $body.append($parent);
                $parent.append(sidebar.element);
                $(window).scrollTop(0);
                $(window).scrollTop(300);
                process.nextTick(function() {
                    assert.equal(
                        sidebar.lastPosition, 'middle',
                        'Sidebar in middle position.'
                    );
                    done();
                });
            });
        });
    });
});
