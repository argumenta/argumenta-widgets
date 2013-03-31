define( 'argumenta/widgets/AddTag',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./AddTag/template.html.mustache",
    "argumenta/sandbox"
],
function( $, Base, Template, Sandbox ) {

    var AddTag = Base.module( {

        moduleID: 'AddTag',
        template: Template,

        defaults: {
            tag_type : 'support',
            target_type : '',
            target_sha1 : '',
            source_type : '',
            source_sha1 : '',
            citation_text: ''
        },

        init: function( options ) {
            this.initAddTag( options );
        },

        prototype: {

            // Inits this AddTag widget.
            initAddTag: function( options ) {
                var self = this;
                self.setTagType( self.options.tag_type );
                self.setTagTarget( self.options.target_type, self.options.target_sha1 );
                self.setTagSource( self.options.source_type, self.options.source_sha1 );
                self.setCitationText( self.options.citation_text );
            },

            // Gets the tag type.
            getTagType: function() {
                return this.options.tag_type;
            },

            // Gets the target type.
            getTargetType: function() {
                return this.options.target_type;
            },

            // Gets the target sha1.
            getTargetSha1: function() {
                return this.options.target_sha1;
            },

            // Gets any source type, if set.
            getSourceType: function() {
                return this.options.source_type;
            },

            // Gets any source sha1, if set.
            getSourceSha1: function() {
                return this.options.source_sha1;
            },

            // Gets any citation text, if set.
            getCitationText: function() {
                return this.citationTextarea.val();
            },

            // Sets the tag type.
            setTagType: function( tag_type ) {
                var self = this;
                self.options.tag_type = tag_type;
                self.updateTagTypeElems();
                self.updateTagContent();
            },

            // Sets the tag target.
            setTagTarget: function( target_type, target_sha1 ) {
                var self = this;
                self.options.target_type = target_type;
                self.options.target_sha1 = target_sha1;
                self.element.find('input[name=target_type]').val( target_type );
                self.element.find('input[name=target_sha1]').val( target_sha1 );
            },

            // Sets the tag source.
            setTagSource: function( source_type, source_sha1 ) {
                var self = this;
                self.options.source_type = source_type;
                self.options.source_sha1 = source_sha1;
                self.element.find('input[name=source_type]').val( source_type );
                self.element.find('input[name=source_sha1]').val( source_sha1 );
            },

            // Sets the citation text.
            setCitationText: function( citation_text ) {
                var self = this;
                self.options.citation_text = citation_text;
                self.citationTextarea.val( citation_text );
            },

            // Binds UI events after refresh.
            _bindUI: function() {
                var self = this;
                var widget = $( this.element );
                var form = widget.find('form').first();
                var fieldsets = form.children('fieldset');

                // Save useful references to widget elements.
                self.form = form;
                self.supportButton = fieldsets.children('button[name=support]');
                self.disputeButton = fieldsets.children('button[name=dispute]');
                self.citationButton = fieldsets.children('button[name=citation]');
                self.supportContents = form.children('.support-contents');
                self.disputeContents = form.children('.dispute-contents');
                self.citationContents = form.children('.citation-contents');
                self.citationTextarea = fieldsets.children('[name=citation_text]');

                // Listen for clicks on tag-type buttons.
                widget.on(
                    'click',
                    'button[name=support], button[name=dispute], button[name=citation]',
                    function( event ) {
                        event.data = event.data || {};
                        event.data.widget = self.element;
                        event.data.button = this;
                        self._onClickTagType( event );
                    }
                );

                // Activate the dropbox.
                widget.find( AddTag.dropboxClass ).droppable( AddTag.dropboxOptions );

                // Don't trigger background elements if clicked.
                widget.on('click', function( event ) {
                    event.stopPropagation();
                } );
            },

            // Updates selected tag type on click.
            _onClickTagType: function( event ) {
                var self = this;
                var button = $(event.data.button);

                // Get tag_type from clicked button's name.
                var tag_type = button.attr('name');

                // Update widget state.
                self.setTagType( tag_type );

                // Blur the button.
                button.blur();
            },

            // Updates tag type multiselect button.
            updateTagTypeElems: function() {
                var self = this;
                var tag_type = self.getTagType();

                // Get the tag_type button to activate.
                var button = self.element.find('button[name=' + tag_type + ']');

                // Activate it, and deactivate the others.
                button.addClass('on').removeClass('off');
                button.siblings('button').removeClass('on').addClass('off');

                // Set the "tag_type" input element.
                button.siblings('input[name=tag_type]').val( tag_type );
            },

            // Updates tag contents for display.
            updateTagContent: function() {
                var self = this;
                var tag_type = self.getTagType();

                if ( self.showingContentsForType !== tag_type ) {

                    var allContents = $()
                        .add( self.supportContents )
                        .add( self.disputeContents )
                        .add( self.citationContents );

                    var toShow = self[tag_type + 'Contents'];
                    var toHide = allContents.not( toShow );

                    // Stabilize sidebar scroll pos by showing before hide.
                    toShow.show();
                    toHide.hide();
                }
                self.showingContentsForType = tag_type;
            }
        },

        static: {

            formClass:    '.new-tag',
            dropboxClass: 'div.tag-dropbox',

            dropboxOptions: {
                hoverClass: 'dropbox-hover',
                greedy: true,
                tolerance: 'touch',

                accept: function (theDraggable) {
                    var dropContainer = $(this).closest('.proposition-widget');
                    var droppedOnSelf = dropContainer.is(theDraggable);
                    return ! droppedOnSelf;
                },

                drop: function (event, ui) {

                    // Get addtag widget instance.
                    var addTagElem = $(this).closest('.addtag-widget');
                    var addTag = addTagElem.data( AddTag.getClassName() );

                    // Dropped widget (the tag source) may be a proposition or argument.
                    var sourceElem = ui.draggable;
                    var source = sourceElem.data('proposition-widget') ||
                                sourceElem.data('argument-widget');

                    // Update addtag with the new tag source.
                    addTag.setTagSource(
                        source.getType(),
                        source.getSha1()
                    );

                    // Cache the last dropped source.
                    addTag.droppedCache = source;

                    // Create a clean clone.
                    var clone = source.clone();

                    // Append just the clone html as a source preview.
                    $(this).children('.dropbox-preview')
                        .empty()
                        .append( clone.element.html() );
                }
            }
        }
    } );

    return AddTag;
} );
