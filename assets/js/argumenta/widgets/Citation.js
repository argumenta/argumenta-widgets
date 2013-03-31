define( 'argumenta/widgets/Citation',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Citation/template.html.mustache"
],
function( $, Base, Template ) {

    var Citation = Base.module( {

        moduleID: 'Citation',
        template: Template,

        init: function( options ) {
            var self = this;
            self.setCitationText( options.citation_text );
        },

        prototype: {

            setCitationText: function( citation_text ) {
                var self = this;
                self.options.citation_text = citation_text;
            },

            getCitationText: function() {
                var self = this;
                return self.options.citation_text;
            },

            // Overrides Base, runs on _init() and _refresh()
            _bindUI: function() {
                var self = this;
                self._linkifyCitationElem();
                self._embedLinkedMedia();
            },

            _linkifyCitationElem: function() {
                var self = this;

                // Finds newlines in text and adds break tags
                var insertLineBreaks = function( text ) {
                    return text.replace( /\r\n|\r|\n/g, "<br>\n");
                };

                // Safely linkify, then format, the citation text
                var linkedText = insertLineBreaks( Citation.linkify(
                    self.getCitationText()
                ));

                // Update widget with the linkified text
                self.element.find('.citation-text').html( linkedText );
            },

            _embedLinkedMedia: function() {
                var self = this;

                self.element.find('.citation-text a').each( function() {
                    var link = this;
                    var url = link.href;

                    self._appendMediaFor( url );
                } );
            },

            // Appends embeddable media referenced by the url
            // Supports: YouTube
            _appendMediaFor: function( url ) {
                var self = this;

                // Returns jquery object with a youtube embed element for the url
                var youtubeEmbedFor = function( videoID ) {
                    var embedUrl = 'http://www.youtube.com/embed/' + videoID;
                    return $( '<iframe width="100%" height="315" src="" frameborder="0" allowfullscreen></iframe>'
                    ).attr( 'src', embedUrl );
                };

                // Returns the videoID found within a youtube url, ie:
                // "http://www.youtube.com/watch?v=9ZaLMPyuOAI"
                // "http://youtu.be/9ZaLMPyuOAI"
                var youtubeIdFor = function( url ) {
                    var matches = (
                        url.match( /v=([\-_0-9a-zA-Z]{11})/ ) ||
                        url.match( /youtu.be\/([\-_0-9a-zA-Z]{11})/ )
                    );
                    return matches ? matches[1] : null;
                };

                // Youtube
                // Note: oEmbed would be ideal, but YT's oEmbed doesn't support JSONP
                if ( url.match( /https?:\/\/[^\/]*youtu(?:.be|be.com)/ ) ) {
                    var videoID = youtubeIdFor( url );
                    if ( videoID )
                        self._appendMedia( youtubeEmbedFor( videoID ) );
                }
            },

            // Appends a media element (or jquery object)
            _appendMedia: function( media ) {
                var self = this;
                self.element.find('.citation-media').append( media );
            }
        },

        "static": {

            // Creates links for URLs, and HTML-escapes surrounding text.
            linkify: function( text ) {

                var linkify = Citation.linkify;

                // Uses jQuery to HTML-escape text.
                var escapeHtml = function( text ) {
                    return $('<div/>').text( text ).html();
                };

                // Creates an anchor tag for a URL, after URI-encoding it.
                var linkFor = function( url ) {
                    return $('<a/>')
                        .attr('href', encodeURI( url ))
                        .text( url )
                        [0].outerHTML;
                };

                // Matches a URL within text, creating three capture groups.
                var urlRe = new RegExp("^([^]*)(https?://\\S*)([^]*)$", "");

                // Just HTML-escape the text if it contains no URLs.
                if ( !text.match( urlRe ) ) {
                    return escapeHtml( text );
                }

                // Recursively linkify text, one match at a time.
                return text.replace( urlRe, function(str, p1, p2, p3, offset, s) {
                    return linkify( p1 ) + linkFor( p2 ) + linkify( p3 );
                } );
            }
        }
    } );

    return Citation;
} );
