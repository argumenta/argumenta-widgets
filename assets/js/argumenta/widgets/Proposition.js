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

            getType: function() {
                return 'proposition';
            },

            getSha1: function() {
                return this.options.sha1;
            },

            initProposition: function( options ) {
                var self = this;

                // Show or hide proposition details on click
                self.element.on('click', function(event) {

                    // Don't trigger background elements on click
                    var closestWidget = $(event.target).closest('div[class*="widget"]');
                    if ( ! closestWidget.is(self.element) ) {
                        event.stopPropagation();
                        return true;
                    }

                    // Don't expand on mouse release after dragging
                    if (self.element.hasClass('ui-state-just-dragged'))
                        return;

                    // Don't interfere with links
                    if ($(event.target).is('a')) {
                        return true;
                    }

                    self._toggleDetails();
                });

                // Bind AddTag button
                self._bindAddTagButton();

                // Make draggable
                self._makeDraggable();
            },

            _toggleDetails: function() {

                var self = this;

                self._toggleTags();
            },

            _toggleTags: function() {

                var self = this;

                if ( typeof self.tags === "undefined" ) {
                    self._initTags();
                }
                else {
                    self.tags.element.toggle( 300 );
                }
            },

            _toggleAddTag: function() {

                var self = this;

                // Initialize if addTag necessary
                if ( typeof self.addTag === "undefined" ) {
                    self._initAddTag();
                    self.addTag.element.hide();
                }

                // Fade in or out
                self.addTag.element.toggle( 300 );
            },

            _initAddTag: function() {

                var self = this;

                // Create a new widget targeting this proposition
                var addTag = new AddTag( {
                    target_type: 'proposition',
                    target_sha1: self.getSha1()
                } );

                // Replace the placeholder
                self.element.children('.add-tag-widget')
                            .replaceWith( addTag.element );

                // Save a reference to the nested widget
                self.addTag = addTag;
            },

            _initTags: function() {
                var self = this;
                var tagsContainer = self.element.children('.proposition-details')
                                                .children('.tags-widget-container');

                // Hide the container
                tagsContainer.hide();

                // Create a new Tags widget targeting this proposition
                var tags = new Tags( {
                    target_type: self.getType(),
                    target_sha1: self.getSha1(),
                    onLoad: function( tagsWidget ) {
                        // Append the element and reveal the container
                        tagsContainer.append( tagsWidget.element );
                        tagsContainer.show( 300 );
                    }
                } );

                // Save a reference to the nested widget
                self.tags = tags;
            },

            _bindAddTagButton: function() {

                var self = this;

                $('.addtag-link', self.element).first().on( 'click', function(event) {

                    self._toggleAddTag();

                    // Defocus the link
                    $(this).blur();

                    // Prevent default & stop propagation
                    return false;
                } );
            },

            _makeDraggable: function() {

                var self = this;

                this.element.draggable( {
                    helper: 'clone',
                    appendTo: $('.drag-container')[0] || $('body'),
                    revert: true,
                    cancel: 'span, input',
                    handle: self.element.children(".proposition-main"),
                    cursor: 'move',
                    opacity: 0.90,
                    start: function(event, ui) {
                        // Prevent other actions on drag
                        ui.helper.addClass('ui-state-just-dragged proposition-widget-drag');

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

            // Overrides Base
            _renderUI: function() {
                var self = this;

                self._super('_renderUI');

                var textElem = self.element.find('.text').first();
                var textHtml = textElem.html();
                var newHtml  = textHtml.replace(/\r?\n|\r/g, '<br>');

                textElem.html( newHtml );

                return;
            },

            // Overrides Base
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
