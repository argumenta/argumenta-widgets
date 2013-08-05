
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Search',
    'argumenta/widgets/Base'
],
function(chai, undefined, fixtures, Search, Base) {

    var assert = chai.assert;

    // Tests

    describe('Search', function() {

        it('should be a function', function() {
            assert.isFunction(Search);
        });

        it('should include a moduleID', function() {
            assert.equal(Search.prototype.moduleID, 'Search');
        });

        describe('new Search( options, element )', function() {

            it('should return a new Search widget', sinon.test(function() {
                var server = sinon.fakeServer.create();
                var search = new Search();
                assert.instanceOf(
                    search, Base,
                    'Search widgets inherit from Base.'
                );
                assert.instanceOf(
                    search, Search,
                    'Search widgets are instances of Search.'
                );
            }));
        });
    });
});
