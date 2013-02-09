define( 'argumenta/widgets/Argument',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Argument/template.html.mustache",
    "argumenta/widgets/Proposition",
    "argumenta/sandbox"
],
function( $, Base, Template, Proposition, Sandbox ) {

    /**
     * @class Argument
     *
     * Widget options:
     *
     *     May be specified in 4 ways (which may be combined):
     *     0. As a module default (see module.prototype.defaultOptions).
     *     1. As instance options in javascript.
     *     2. As individual custom 'data-<option>' attributes in html.
     *     3. As a bundle of JSON properties in a special html data attribute 'data-<moduleID>'.
     *
     *  Example (JS, overriding module defaults)
     *
     *     Argument.prototype.defaultOptions = {some_option: some_value};
     *
     *  Example (JS, instance options):
     *
     *      var argument = new Argument({
     *          sha1: <some_sha1>,
     *          show_propositions: true
     *      });
     *
     *  Example (HTML, individual attributes):
     *
     *      <div class="argument-widget"
     *           data-sha1="<some_sha1>"
     *           data-show_propositions="true" >
     *      </div>
     *
     *  Example (HTML, bundled in a "moduleID" attribute):
     *
     *      <div class="argument-widget"
     *           data-argument="{sha1: <some_sha1>, show_propositions: true}" >
     *      </div>
     *
     *  Special options for argument widgets:
     *
     *   'show_propositions' (optional) Display propositions for this widget.
     *
     *       Propositions data is loaded from the widget options (if present),
     *       otherwise fetched via Ajax.
     */
    var Argument = Base.module( {

        moduleID: 'Argument',
        template: Template,

        init: function( options ) {
            this.initArgument( options );
        },

        prototype: {

            initArgument: function() {
                var self = this;

                // Show propositions if option 'show_propositions' is true
                if ( self.options.show_propositions === true ) {
                    self._initPropositions();
                }
            },

            // Returns the type of argumenta object: 'argument'
            getType: function() {
                return this.options.object_type;
            },

            // Returns the sha1 of the argumenta object
            getSha1: function() {
                return this.options.sha1;
            },

            toggleArgumentDetails: function() {
                var self = this;
                self.togglePropositions();
            },

            togglePropositions: function() {
                var self = this;

                // Check if we've saved proposition data yet
                if ( self.propositions ) {
                    // Assume propositions initialized, so just toggle their container
                    self.container.children(".propositions-container").toggle( 300 );
                }
                else {
                    // No data yet, so initialize propositions
                    self._initPropositions();
                }
            },

            // Override Base._bindUI
            _bindUI: function() {
                var self = this;

                // Save reference to inner container and menu
                self.container = self.element.children(".argument-container");
                self.menu = self.container.find('.argument-menu').first();
                self.deleteButton = self.menu.find('.action-delete');

                // Click behavior for menu
                self.menu.on('click', function( event ) {
                    self.element.temporaryClass('menu-just-clicked', 300);
                });

                // Click behavior for `Delete Repo`
                self.deleteButton.on('click', function( event ) {
                    var name = self.options.commit.committer;
                    var repo = self.options.repo;
                    var url  = '/' + name + '/' + repo + '.json';
                    var settings = {
                        type: 'DELETE'
                      , url: url
                    };
                    var success = function( data, textStatus, jqXHR ) {
                        Sandbox.notify( data.message );
                        self.element.remove();
                    };
                    var error = function( data ) {
                        json = JSON.parse( data.responseText );
                        Sandbox.warn( json.error )
                    };
                    $.ajax(settings).done(success).fail(error);
                });

                // Click behavior for main panel
                self.container.children(".argument-main").on('click', function( event ) {

                    // Don't expand on mouse release after drag
                    if ( self.element.hasClass('ui-state-just-dragged') )
                        return;

                    // Don't expand on mouse release after menu click
                    if ( self.element.hasClass('menu-just-clicked') )
                        return;

                    // Toggle details on click
                    self.toggleArgumentDetails();
                } );

                // Make draggable
                self.element.draggable( {
                    helper: 'clone',
                    appendTo: $('.drag-container')[0] || $('body'),
                    revert: true,
                    cancel: 'span, input',
                    handle: self.container.children(".argument-main"),
                    cursor: 'move',
                    opacity: 0.90,
                    start: function(event, ui) {
                        // Prevent other actions on drag
                        ui.helper.addClass('ui-state-just-dragged argument-widget-drag');

                        // Fix clone size
                        ui.helper.css( {
                            'height': self.element.height() + 'px',
                            'width': self.element.width() + 'px'
                        } );

                        // Hide original
                        self.element.css('visibility', "hidden");
                    },
                    stop: function(event, ui) {
                        // Prevent other actions on drag, then cleanup
                        setTimeout(function() {ui.helper.removeClass('ui-state-just-dragged');}, 300);

                        // Reveal original
                        self.element.css('visibility', "");
                    }
                } );
            },

            _initPropositions: function() {
                var self = this;

                // Get propositions data, then init elements
                if ( self.options.propositions ) {
                    // Use stored proposition data
                    self.propositions = self.options.propositions;
                    self._initPropositionElements();
                }
                else {
                    // No proposition data stored, so retrieve via Ajax
                    $.ajax( {
                        url: '/arguments/' + this.options.sha1 + '/propositions.json'
                    } )
                    .success( function( data ) {
                        // Cache the data, then initialize elements
                        self.propositions = data.propositions;
                        self._initPropositionElements();
                    } );
                }
            },

            _initPropositionElements: function() {
                var self = this;

                var container = self.container.children('.propositions-container');

                for ( var i=0, len=self.propositions.length; i<len; i++ ) {
                    var p = self.propositions[i];

                    // Set proposition index for it's role in this argument
                    // (Ie, numeral for premise position, or 'C' for a conclusion)
                    var index = (i < len-1) ? i+1 : 'C';

                    // Extend proposition data with it's argument index
                    p = $.extend( {}, p, { 'index': index } );

                    // Create a widget from the proposition data
                    var proposition = new Proposition( p );

                    container.append( proposition.element );
                }
            },

            // Overrides Base
            _getViewOptions: function() {
                var self = this;
                var viewOptions = {
                    partial_sha1: self.options.sha1.substr(0, 20),
                    argument_desc: 'Argument: ' + self.options.title,
                    details_desc: 'Argument details\r\nSHA1: ' + self.options.sha1
                };
                return $.extend( viewOptions, self.options );
            }
        },

        static: {
        }
    } );

    return Argument;
} );
