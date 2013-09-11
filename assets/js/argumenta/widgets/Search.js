
define( 'argumenta/widgets/Search',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Search/template.html.mustache",
    "argumenta/sandbox"
],
function( $, Base, Template, Sandbox ) {

    var Search = Base.module( {

        moduleID: 'Search',
        template: Template,

        defaults: {
        },

        init: function( options, originalElem ) {
            var self = this;
            self.offset = 0;
        },

        prototype: {

            // Binds UI behavior after refresh.
            _bindUI: function() {
                var self = this;
                self.searchForm = self.element.children('.search-form');
                self.searchQuery = self.searchForm.children('.search-query');
                self.searchButton = self.searchForm.children('.search-button');
                self.searchResults = self.element.children('.search-results');
                self.resultsHeader = self.searchResults.children('.results-header');
                self.argumentResults = self.searchResults.children('.argument-results');
                self.argumentsCount = self.resultsHeader.children('.arguments-count');
                self.userResults = self.searchResults.children('.user-results');
                self.usersCount = self.resultsHeader.children('.users-count');

                var handleSubmit = function(event) {
                    event.preventDefault();
                    self.search(self.getQuery());
                };
                self.searchForm.submit(handleSubmit);
            },

            // Gets the current search query.
            getQuery: function() {
                var self = this;
                return self.searchQuery.val();
            },

            // Gets the last search query.
            getLastQuery: function() {
                var self = this;
                return self.lastQuery;
            },

            // Gets the current offset for query results.
            getOffset: function() {
                var self = this;
                return self.offset;
            },

            // Searches for results with the given query.
            search: function(query) {
                var self = this;
                if (self.getQuery() !== self.getLastQuery()) {
                    self.clearResults();
                }
                var base = self.options.base_url;
                var path = '/search/' + encodeURIComponent(query) + '.json';
                var qs = 'offset=' + self.offset;
                var url = base + path + '?' + qs;
                var success = function(data, textStatus, jqXHR) {
                    self.showResults( data );
                    self.lastQuery = query;
                    self.offset += 20;
                };
                var error = function(data) {
                    try { Sandbox.warn( JSON.parse(data).error ); }
                    catch (e) { Sandbox.warn( data.responseText ); }
                };
                $.ajax(url).done(success).fail(error);
            },

            // Shows the given search results.
            showResults: function(results) {
                var self = this;
                for (var i in results.users) {
                    var user = results.users[i];
                    var widget = Sandbox.widgetFor(user);
                    self.userResults.append(widget.element);
                }
                for (var i in results.arguments) {
                    var argument = results.arguments[i];
                    var widget = Sandbox.widgetFor(argument);
                    self.argumentResults.append(widget.element);
                }
                self.usersCount.html(self.userResults.children().length);
                self.argumentsCount.html(self.argumentResults.children().length);
                self.searchResults.show(250, whenShown);
                function whenShown() {
                  self.searchResults.css('overflow', 'visible');
                }
            },

            // Clears any currently displayed results.
            clearResults: function() {
                var self = this;
                self.argumentResults.empty();
                self.userResults.empty();
                self.offset = 0;
            }
        },

        "static": {
        }
    } );

    return Search;
} );
