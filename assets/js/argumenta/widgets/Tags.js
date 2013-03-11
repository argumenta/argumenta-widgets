define( 'argumenta/widgets/Tags',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Tags/template.html.mustache",
    "argumenta/sandbox"
],
function( $, Base, Template, Sandbox ) {

    /**
     * @class Tags
     *
     * A widget for loading and displaying an object's tags.
     *
     * @param {Object}   options                A hash of init options for the tags widget.
     * @param {String}   options.target_type    The target object's type.
     * @param {String}   options.target_sha1    The target object's sha1.
     * @param {Function} options.onLoad(widget) Optional callback to run once tags are loaded.
     * @param {Tags}     widget                 The new widget.
     */
    var Tags = Base.module( {

        moduleID: 'Tags',
        template: Template,

        init: function( options ) {
            this.initTags( options );
        },

        prototype: {

            // Inits this tags widget.
            initTags: function( options ) {
                var self = this;
                self.setTarget( options.target_type, options.target_sha1 );
            },

            // Sets the target object.
            setTarget: function( type, sha1 ) {
                var self = this;

                self.targetType = type;
                self.targetSha1 = sha1;

                self._update();
            },

            // Sets tags, given tags data.
            setTags: function( tagsData ) {
                var self = this;

                var tagTypeFilter = function ( type ) {
                    return function ( tag ) {
                        return tag.tag_type === type ? tag : null;
                    };
                };

                self.tags = { citations: {}, supports: {}, disputes: {} };

                self.tags.citations = $.grep( tagsData, tagTypeFilter('citation') );
                self.tags.supports  = $.grep( tagsData, tagTypeFilter('support') );
                self.tags.disputes  = $.grep( tagsData, tagTypeFilter('dispute') );

                // Save reference to tags in options (for use in template)
                self.options.tags = self.tags;
            },

            // Sets the sources dict, given an array of source objects.
            setSources: function( sources ) {
                var self = this;
                var dict = {};

                $(sources).each(function(index, source) {
                   dict[source.sha1] = source;
                });

                self.sources = dict;
            },

            // Updates this tags widget.
            _update: function() {
                var self = this;

                // Get tags data, then refresh.
                $.ajax( {
                    url: '/propositions/' + self.targetSha1 + '/tags-plus-sources.json',
                    success: function( data ) {
                        self.setSources( data.sources );
                        self.setTags( data.tags );
                        self._refresh();
                    },
                    error: function( jqXHR, textStatus, errorThrown ) {
                    },
                    complete: function( jqXHR, textStatus ) {
                        // Run the onLoad callback
                        self.options.onLoad.call( self, self );
                    }
                } );
            },

            // Renders UI, extending Base behavior.
            _renderUI: function() {
                var self = this;
                self._super( "_renderUI" );
                self._populateTagsContainer();
            },

            // Populates tags for the widget.
            _populateTagsContainer: function() {
                var self = this;

                if (self.tags) {
                    this.element.hide();
                    var types = ['support', 'dispute', 'citation'];

                    for (var i in types) {
                        var type = types[i];
                        var tagsData = self.tags[ type + 's' ];
                        var container = self.element.children('.' + type + '-tags');

                        container.empty();

                        for (var t in tagsData) {
                            var tag = tagsData[t];
                            var objectData, widget;

                            if (tag.tag_type === 'citation') {
                                objectData = tag;
                            }
                            else {
                                var sourceSha1 = tag.source_sha1;
                                var sourceData = self.sources[ sourceSha1 ];
                                objectData = sourceData;
                            }

                            widget = Sandbox.widgetFor( objectData );

                            if (widget) {
                                container.append( widget.element );
                            }
                            else {
                                console.error(
                                    "No tag widget for: " +
                                    JSON.stringify(tag, null, '  ')
                                );
                            }
                        }
                    }
                    this.element.show();
                }
            }
        },

        static: {
        }
    } );

    return Tags;
} );
