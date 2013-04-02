
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

    // Helpers

    var withSidebar = function() {
        var sidebar = new Sidebar();
        var $parent = $('<div style="height: 2000px;"></div>');
        var $body = $('body');
        $body.append($parent);
        $parent.append(sidebar.element);
        return sidebar;
    };

    var reset = function() {
        $(window).unbind('scroll');
        $(window).unbind('resize');
        $('body').empty();
    };

    // Tests

    describe('Sidebar', function() {

        afterEach(reset);

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

            afterEach(reset);

            it('should scroll to middle position', function(done) {
                var sidebar = withSidebar();
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

            it('should scroll to bottom position', function(done) {
                var sidebar = withSidebar();
                $(window).scrollTop(0);
                $(window).scrollTop($(document).height());
                process.nextTick(function() {
                    assert.equal(
                        sidebar.lastPosition, 'bottom',
                        'Sidebar in bottom position.'
                    );
                    done();
                });
            });

            it('should scroll to top position', function(done) {
                var sidebar = withSidebar();
                $(window).scrollTop(100);
                $(window).scrollTop(0);
                process.nextTick(function() {
                    assert.equal(
                        sidebar.lastPosition, 'top',
                        'Sidebar in top position.'
                    );
                    done();
                });
            });
        });
    });
});
