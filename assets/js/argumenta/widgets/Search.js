
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
        },

        prototype: {

            // Binds UI behavior after refresh.
            _bindUI: function() {
                var self = this;
                self.searchForm = self.element.children('.search-form');
                self.searchQuery = self.searchForm.children('.search-query');
                self.searchButton = self.searchForm.children('.search-button');
                self.searchResults = self.element.children('.search-results');
                self.argumentResults = self.searchResults.children('.argument-results');

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

            // Searches for results with the given query.
            search: function(query) {
                var self = this;
                var base = self.options.base_url;
                var url = base + '/search/' + encodeURIComponent(query) + '.json';
                var success = function(data, textStatus, jqXHR) {
                    self.showResults( data );
                    self.lastQuery = query;
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
                if (self.getQuery() !== self.getLastQuery()) {
                    self.clearResults();
                }
                for (var i in results.arguments) {
                    var argument = results.arguments[i];
                    var widget = Sandbox.widgetFor(argument);
                    self.argumentResults.append(widget.element);
                }
            },

            // Clears any currently displayed results.
            clearResults: function() {
                var self = this;
                self.argumentResults.empty();
            }
        },

        "static": {
        }
    } );

    return Search;
} );
