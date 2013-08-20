
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/Search',
    'argumenta/widgets/Base',
    'argumenta/config'
],
function(chai, undefined, fixtures, Search, Base, Config) {

    var assert = chai.assert;
    var baseUrl = Config.baseUrl;

    // Helpers

    var withSearch = function() {
        var search = new Search();
        search.element.appendTo('body');
        assert.lengthOf(
            $('body').find(search.element), 1,
            'Widget present in DOM.'
        );
        return search;
    };

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

        describe('Search button', function() {

            it('should search by query when clicked', sinon.test(function() {
                var server = sinon.fakeServer.create();
                var search = withSearch();
                var query = 'my-query';
                search.searchQuery.val(query);
                search.searchButton.click();
                server.respondWith(
                    'GET',
                    baseUrl + '/search/' + query + '.json' + '?offset=0',
                    [
                        200,
                        fixtures.headers('JSON'),
                        JSON.stringify( {
                            'arguments': [ fixtures.validArgumentData() ],
                            'users': [ fixtures.validPublicUserData() ]
                        } )
                    ]
                );
                server.respond();
                assert.equal(
                    search.argumentResults.children().length, 1,
                    "Search widget received one argument result."
                );
                assert.equal(
                    search.userResults.children().length, 1,
                    "Search widget received one user result."
                );
            }));
        });
    });
});
