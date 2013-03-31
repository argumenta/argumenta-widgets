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

        // Inits the citation widget.
        init: function( options ) {
            var self = this;
            self.setCitationText( options.citation_text );
        },

        prototype: {

            // Sets the citation text.
            setCitationText: function( citation_text ) {
                var self = this;
                self.options.citation_text = citation_text;
            },

            // Gets the citation text.
            getCitationText: function() {
                var self = this;
                return self.options.citation_text;
            },

            // Binds UI on refresh, overriding Base behavior.
            _bindUI: function() {
                var self = this;
                self._linkifyCitationElem();
                self._embedLinkedMedia();
            },

            // Creates links for URLs in displayed citation text.
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

            // Embeds linked media in displayed citation text.
            _embedLinkedMedia: function() {
                var self = this;

                self.element.find('.citation-text a').each( function() {
                    var link = this;
                    var url = link.href;

                    self._appendMediaFor( url );
                } );
            },

            // Appends embeddable media referenced by the url.
            // Supports YouTube.
            _appendMediaFor: function( url ) {
                var self = this;

                // Returns YouTube element for given video ID, as jQuery object.
                var youtubeEmbedFor = function( videoID ) {
                    var embedUrl = 'http://www.youtube.com/embed/' + videoID;
                    var embed = $(
                        '<iframe width="100%" height="315"' +
                        ' frameborder="0" allowfullscreen></iframe>'
                    );
                    embed.attr('src', embedUrl);
                    return embed;
                };

                // Youtube.
                // oEmbed would be ideal, but YT doesn't support JSONP for this.
                if ( url.match( /https?:\/\/[^\/]*youtu(?:.be|be.com)/ ) ) {
                    var videoID = Citation.youtubeIdFor( url );
                    if ( videoID )
                        self._appendMedia( youtubeEmbedFor( videoID ) );
                }
            },

            // Appends media, as a plain element or jQuery object.
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
            },

            // Returns the videoID found within a youtube url, ie:
            // "http://www.youtube.com/watch?v=9ZaLMPyuOAI"
            // "http://youtu.be/9ZaLMPyuOAI"
            youtubeIdFor: function( url ) {
                var matches = (
                    url.match( /v=([\-_0-9a-zA-Z]{11})/ ) ||
                    url.match( /youtu.be\/([\-_0-9a-zA-Z]{11})/ )
                );
                return matches ? matches[1] : null;
            }
        }
    } );

    return Citation;
} );
