define( 'argumenta/widgets/Proposition',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "argumenta/widgets/AddTag",
    "argumenta/widgets/Tags",
    "text!./Proposition/template.html.mustache"
],
function( $, Base, AddTag, Tags, Template ) {

    var Proposition = Base.module( {

        moduleID: 'Proposition',
        template: Template,

        defaults: {
            index: 'P'
        },

        init: function( options ) {
            this.initProposition( options );
        },

        prototype: {

            // Gets the object type.
            getType: function() {
                return 'proposition';
            },

            // Gets the object sha1.
            getSha1: function() {
                return this.options.sha1;
            },

            // Inits this proposition widget.
            initProposition: function( options ) {
                var self = this;

                // Initial state.
                self.addTagVisible = false;
                self.tagsVisible = false;

                // Elements.
                self.main = self.element.children('.proposition-main');
                self.addTagButton = self.main.find('.add-tag-button');

                // Toggle details on click.
                self.element.on('click', function(event) {

                    // Don't trigger background elements.
                    var closestWidget = $(event.target).closest('div[class*="widget"]');
                    if ( !closestWidget.is(self.element) ) {
                        event.stopPropagation();
                        return true;
                    }

                    // Don't expand on mouse release after dragging.
                    if (self.element.hasClass('ui-state-just-dragged')) {
                        return;
                    }

                    // Don't interfere with links.
                    if ($(event.target).is('a')) {
                        return true;
                    }

                    self.toggleDetails();
                });

                self._bindAddTagButton();
                self._makeDraggable();
            },

            // Toggles details for this proposition.
            toggleDetails: function() {
                var self = this;
                self._toggleTags();
            },

            // Toggles tags for this proposition.
            _toggleTags: function() {
                var self = this;

                if ( typeof self.tags === "undefined" ) {
                    self._initTags();
                }
                else {
                    self.tags.element.toggle( 300 );
                    self.tagsVisible = !self.tagsVisible;
                }
            },

            // Toggles AddTag widget.
            toggleAddTag: function() {
                var self = this;

                // Initialize if necessary.
                if ( typeof self.addTag === "undefined" ) {
                    self._initAddTag();
                    self.addTag.element.hide();
                }

                // Fade in or out.
                self.addTag.element.toggle( 300 );
                self.addTagVisible = !self.addTagVisible;
            },

            // Inits the AddTag widget.
            _initAddTag: function() {
                var self = this;

                // Create a new widget targeting this proposition.
                var addTag = new AddTag( {
                    target_type: 'proposition',
                    target_sha1: self.getSha1()
                } );

                // Append the widget element.
                self.element.children('.add-tag-widget-container')
                            .append( addTag.element );

                // Save a reference to the nested widget.
                self.addTag = addTag;
            },

            // Inits any tags for this proposition.
            _initTags: function() {
                var self = this;
                var tagsContainer = self.element
                    .children('.proposition-details')
                    .children('.tags-widget-container');

                // Hide the container.
                tagsContainer.hide();

                // Create a new Tags widget targeting this proposition.
                var tags = new Tags( {
                    target_type: self.getType(),
                    target_sha1: self.getSha1(),
                    onLoad: function( tagsWidget ) {
                        // Append the element and reveal the container.
                        tagsContainer.append( tagsWidget.element );
                        tagsContainer.show( 300 );
                        self.tagsVisible = true;
                    }
                } );

                // Save a reference to the nested widget
                self.tags = tags;
            },

            // Binds AddTag button behavior.
            _bindAddTagButton: function() {
                var self = this;
                var link = $('.add-tag-link', self.element).first();

                link.on( 'click', function(event) {
                    self.toggleAddTag();
                    link.blur();    // Defocus.
                    return false;   // Prevent default and stop propagation.
                } );
            },

            // Makes this widget draggable.
            _makeDraggable: function() {
                var self = this;

                this.element.draggable( {
                    helper: 'clone',
                    appendTo: $('.drag-container')[0] || $('body'),
                    revert: true,
                    cancel: 'input',
                    handle: self.element.children(".proposition-main"),
                    cursor: 'move',

                    start: function(event, ui) {

                        // Add drag class to body.
                        $('body').addClass('argumenta-drag');

                        // Prevent other actions on drag.
                        ui.helper.addClass('ui-state-just-dragged drag');

                        // Fix clone size.
                        ui.helper.css( {
                            'height': self.element.outerHeight() + 'px',
                            'width': self.element.outerWidth() + 'px'
                        } );

                        // Hide original.
                        self.element.css('visibility', "hidden");
                    },

                    stop: function(event, ui) {

                        // Remove drag class from body.
                        $('body').removeClass('argumenta-drag');

                        // Prevent other actions on drag, then cleanup.
                        var removeDrag = function() {
                          ui.helper.removeClass('ui-state-just-dragged')
                        }
                        setTimeout(removeDrag, 300);

                        // Reveal original.
                        self.element.css('visibility', "");
                    }
                } );
            },

            // Renders UI, extending Base behavior.
            _renderUI: function() {
                var self = this;

                self._super('_renderUI');

                var textElem = self.element.find('.text').first();
                var textHtml = textElem.html();
                var newHtml  = textHtml.replace(/\r?\n|\r/g, '<br>');

                textElem.html( newHtml );

                return;
            },

            // Gets view options for template, extending Base behavior.
            _getViewOptions: function() {
                var self = this;
                var role_desc;

                switch ( self.options.index ) {
                    case 'P': role_desc = '';              break;
                    case 'C': role_desc = ' (Conclusion)'; break;
                    default : role_desc = ' (Premise)';    break;
                }

                var viewOptions = {
                    partial_sha1: self.options.sha1.substr(0, 20),
                    proposition_desc: 'Proposition' + role_desc,
                    details_desc: 'Proposition details\r\nSHA1: ' + self.options.sha1
                }
                return $.extend( viewOptions, self.options );
            }
        }
    } );

    return Proposition;
} );
