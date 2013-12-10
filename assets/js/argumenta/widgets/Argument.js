define( 'argumenta/widgets/Argument',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Argument/template.html.mustache",
    "argumenta/widgets/DiscussionEditor",
    "argumenta/widgets/Proposition",
    "argumenta/sandbox"
],
function( $, Base, Template, DiscussionEditor, Proposition, Sandbox ) {

    /**
     * @class Argument
     *
     * Widget options may be set in a combination of four ways:
     *
     *   1. As a module default on the prototype.
     *   2. As instance options.
     *   3. As individual custom `data-<option>` attributes in HTML.
     *   4. As bundle of JSON properties in a `data-<moduleID>` HTML attribute.
     *
     * Example JS for module defaults:
     *
     *     Argument.prototype.defaultOptions = {option: value};
     *
     * Example JS for instance options:
     *
     *     var argument = new Argument({
     *         sha1: <sha1>,
     *         show_propositions: true
     *     });
     *
     * Example HTML with individual attributes:
     *
     *     <div class="argument-widget"
     *          data-sha1="<sha1>"
     *          data-show_propositions="true" >
     *     </div>
     *
     * Example HTML with options bundle in a `data-<moduleID>` attribute:
     *
     *     <div class="argument-widget"
     *          data-argument="{sha1: <sha1>, show_propositions: true}" >
     *     </div>
     *
     * @param opts {Object} Argument widget options.
     * @param opts.show_propositions {Boolean} Whether to show propositions initially.
     * @param opts.propositions {Array<Object>} An array of argument propositions data.
     * @note Propositions may be set as options, or loaded via AJAX.
     */
    var Argument = Base.module( {

        moduleID: 'Argument',
        template: Template,

        defaults: {
            show_propositions: true
        },

        init: function( options ) {
            var self = this;
            self.initArgument( options );
        },

        prototype: {

            // Inits this argument widget.
            initArgument: function() {
                var self = this;
                self.propositionWidgets = [];
                self.propositionsVisible = false;
                self._initData();
            },

            // Gets the object type.
            getType: function() {
                return this.options.object_type;
            },

            // Gets the object sha1.
            getSha1: function() {
                return this.options.sha1;
            },

            // Sets propositions data, and inits elements.
            setPropositions: function( props ) {
                var self = this;
                self.propositions = props;
                self._initPropositionElements();
            },

            // Gets child proposition widgets.
            getPropositionWidgets: function() {
                var self = this;
                return self.propositionWidgets;
            },

            // Toggles argument details for widget.
            toggleArgumentDetails: function() {
                var self = this;
                self.togglePropositions();
            },

            // Toggle propositions for widget.
            togglePropositions: function() {
                var self = this;
                if ( self.propositions ) {
                    self.content.toggle(300);
                    self.propositionsVisible = !self.propositionsVisible;
                }
                else {
                    self._initPropositions();
                }
            },

            // Starts a new discussion.
            onDiscuss: function() {
                var self = this;
                if (self.discussionEditor.length == 0) {
                    self._initDiscussionEditor();
                }
                else {
                    self.discussionContainer.toggle(300);
                }
            },

            // Binds UI events, extending Base behavior.
            _bindUI: function() {
                var self = this;

                // Save reference to inner container and menu.
                self.container = self.element.children(".argument-container");
                self.main = self.container.children(".argument-main");
                self.menu = self.container.find('.argument-menu').first();
                self.deleteButton = self.menu.find('.action-delete');
                self.content = self.container.children('.argument-content');
                self.propositionsContainer = self.content.children('.propositions-container');
                self.footer = self.content.children('.argument-footer');
                self.discuss = self.footer.children('.argument-discuss');
                self.discussionContainer = self.footer.children('.discussion-container');
                self.discussionEditor = self.discussionContainer.children('.discussion-editor');

                // Click behavior for discuss.
                self.discuss.on('click', function( event ) {
                    event.preventDefault();
                    self.discuss.blur();
                    self.onDiscuss();
                });

                // Click behavior for menu.
                self.menu.on('click', function( event ) {
                    self.element.temporaryClass('menu-just-clicked', 300);
                });

                // Click behavior for `Delete Repo`.
                self.deleteButton.on('click', function( event ) {
                    var name = self.options.commit.committer;
                    var repo = self.options.repo;
                    var base = self.options.base_url;
                    var path = '/' + name + '/' + repo + '.json';
                    var url  = base + path;
                    var settings = {
                        type: 'DELETE'
                      , url: url
                    };
                    var success = function( data, textStatus, jqXHR ) {
                        Sandbox.notify( data.message );
                        self.element.remove();
                    };
                    var error = function( data ) {
                        Sandbox.error(data);
                    };
                    $.ajax(settings).done(success).fail(error);
                });

                // Click behavior for main panel.
                self.container.children(".argument-main").on('click', function( event ) {

                    // Don't expand on mouse release after drag.
                    if ( self.element.hasClass('ui-state-just-dragged') )
                        return;

                    // Don't expand on mouse release after menu click.
                    if ( self.element.hasClass('menu-just-clicked') )
                        return;

                    // Toggle details on click.
                    self.toggleArgumentDetails();
                } );

                // Make draggable.
                self.element.draggable( {
                    helper: 'clone',
                    appendTo: $('.drag-container')[0] || $('body'),
                    revert: true,
                    cancel: 'span, input',
                    handle: self.container.children(".argument-main"),
                    cursor: 'move',

                    start: function(event, ui) {
                        // Prevent other actions on drag.
                        ui.helper.addClass('ui-state-just-dragged drag');

                        // Fix clone size.
                        ui.helper.css( {
                            'height': self.element.height() + 'px',
                            'width': self.element.width() + 'px'
                        } );

                        // Hide original.
                        self.element.css('visibility', "hidden");
                    },

                    stop: function(event, ui) {
                        // Prevent other actions on drag, then cleanup.
                        setTimeout(function() {
                            ui.helper.removeClass('ui-state-just-dragged');
                        }, 300);

                        // Reveal original.
                        self.element.css('visibility', "");
                    }
                } );
            },

            // Inits widget data.
            _initData: function() {
                var self = this;
                if ( !self.options.title ||
                     !self.options.premises ||
                     !self.options.conclusion )
                {
                    self._loadDataBySha1();
                }
                else if ( self.options.show_propositions === true ) {
                    self._initPropositions();
                }
            },

            // Loads argument data by SHA-1.
            _loadDataBySha1: function() {
                var self = this;
                var sha1 = self.options.sha1;
                var base = self.options.base_url;
                var path = '/arguments/' + sha1 + '.json';
                var url  = base + path;
                var success = function( data ) {
                    $.extend(self.options, data.argument);
                    self.options.commit = data.commit;
                    self._refresh();
                    if ( self.options.show_propositions === true ) {
                        self._initPropositions();
                    }
                };
                var error = function( data ) {
                    Sandbox.error(data);
                };
                $.ajax(url).done(success).fail(error);
            },

            // Inits discussion editor.
            _initDiscussionEditor: function() {
                var self = this;
                var discussionEditor = new DiscussionEditor({
                    target_type: self.getType(),
                    target_sha1: self.getSha1()
                });
                self.discussionContainer.append(discussionEditor.element);
                self.discussionEditor = discussionEditor.element;
            },

            // Inits propositions data and elements.
            _initPropositions: function() {
                var self = this;

                if ( self.options.propositions ) {
                    self.setPropositions( self.options.propositions );
                }
                else {
                    var sha1 = this.options.sha1;
                    var base = self.options.base_url;
                    var path = '/arguments/' + sha1 + '/propositions.json';
                    var url  = base + path;
                    var success = function( data ) {
                        self.setPropositions( data.propositions );
                    }
                    var error = function( data ) {
                        Sandbox.error(data);
                    }
                    $.ajax(url).done(success).fail(error);
                }
            },

            // Inits proposition elements.
            _initPropositionElements: function() {
                var self = this;
                var container = self.propositionsContainer;

                // Hide container.
                container.hide();

                // Clear any current propositions.
                container.empty();
                self.propositionWidgets.length = 0;

                // Create the new proposition elements.
                for ( var i=0, len=self.propositions.length; i<len; i++ ) {
                    var data = self.propositions[i];
                    var position = i + 1;
                    var role = (position < len) ? 'premise' : 'conclusion';
                    var index = (role === 'premise') ? position : 'C';

                    // Extend proposition data with its argument index.
                    data = $.extend( {}, data, { 'index': index } );

                    // Create a widget from the proposition data.
                    var proposition = new Proposition( data );

                    // Add a class for this proposition's role.
                    proposition.element.addClass( role );

                    // Append the proposition and save a reference.
                    container.append( proposition.element );
                    self.propositionWidgets.push( proposition );
                }
                // Reveal container.
                container.show();
                self.content.show(250);
                self.propositionsVisible = true;
            },

            // Gets view options for template, extending Base behavior.
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
