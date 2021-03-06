define( 'argumenta/widgets/Sidebar',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./Sidebar/template.html.mustache"
],
function( $, Base, Template ) {

    var Sidebar = Base.module( {

        moduleID: 'Sidebar',
        template: Template,

        defaults: {
            "max-width": "50%",
            "rightBound": 5,
            "scrollbarWidth": 16,
            "topBound": 0
        },

        init: function( options, originalElem ) {
            var self = this;
            self.originalElement = originalElem;
            self._refresh();
        },

        prototype: {

            // Binds UI behavior after refresh.
            _bindUI: function() {
                var self = this;

                // Wait until DOM insertion for parent-dependent init.
                setTimeout( function() {
                    var parent = self.element.parent();

                    if ( parent ) {
                        // Make the parent our context for absolute positioning.
                        self.element.parent().css( { "position": "relative" } );

                        // Initialize our size and state.
                        self.updateSize();
                        self.update();

                        if (Sidebar.DEBUG) {
                            console.log('Sidebar parent: ' + parent);
                        }
                    }
                    else {
                        setTimeout( arguments.callee, 100 );
                        if (Sidebar.DEBUG) {
                            console.log('Sidebar waiting for insertion...');
                        }
                    }
                }, 100 );

                // Nest the contents of the originally activated element.
                if ( self.originalElement ) {
                    self.element
                      .find('.sidebar-contents')
                      .empty()
                      .append( self.originalElement.children() );
                }

                // Update sidebar size on window resize.
                $( window ).resize( function() {
                    self.lastPosition = null;
                    self.updateSize();
                    self.update();
                } );

                // Update sidebar on scroll.
                $( window ).scroll( function () {
                    self.update();
                } );
            },

            // Gets previous element.
            getPrev: function() {
                var self = this;
                var prev = self.element.prev();

                // If no previous element exists, prepend a placeholder.
                if (prev.length === 0) {
                    prev = $('<div class="sidebar-prev"></div>');
                    prev.css({'height': '0px', 'width': '0px'});
                    self.element.before(prev);
                }
                return prev;
            },

            // Updates size of sidebar.
            updateSize: function() {
                var self = this;
                var win = $( window );
                var winHeight = win.innerHeight();
                var parent = self.element.parent();
                var prev = self.getPrev();

                // Record the parent and previous size on last update.
                self.lastParentHeight = parent.height();
                self.lastParentWidth = parent.innerWidth();
                self.lastPrevWidth = prev.outerWidth();

                // Calculate our new width.
                self.width = parent.innerWidth() - prev.outerWidth() - self.options.rightBound;

                // Update widget size.
                self.element.css( {
                    "max-height": winHeight,
                    "max-width": self.options["max-width"],
                    "width": self.width
                } );

                // Update parent size.
                self.element.parent().css( {
                    "min-height": winHeight
                } );

                // Leave space for content scrollbar on the right.
                self.element.children('.sidebar-container').css( {
                    "float": "left",
                    "width": self.element.width() - self.options.scrollbarWidth + "px"
                } );
            },

            // Updates sidebar state.
            update: function() {
                var self = this;
                var parent = self.element.parent();
                var prev = self.getPrev();
                var win = $( window );

                if ( self.lastParentHeight !== parent.height() ||
                     self.lastParentWidth !== parent.innerWidth() ||
                     self.lastPrevWidth !== prev.outerWidth()
                   ) {
                    // Clear assumption about position & update size.
                    self.lastPosition = null;
                    self.updateSize();
                }

                self.winTop = win.scrollTop();
                self.parentTop = parent.offset().top;
                self.parentBottom = self.parentTop + parent.height();
                self.parentLeft = parent.offset().left;

                self.bottom = self.winTop + self.options.topBound + self.element.height();
                self.leftBound = prev.offset().left + prev.outerWidth();

                // Floating sidebar follows the window view, within the parent.
                // It anchors to the parent boundaries at top and bottom.
                // Position is fixed for smooth scrolling in the middle case.
                // Manipulates DOM only as boundaries reached, for speed & smoothness.
                if ( self.winTop + self.options.topBound < self.parentTop ) {
                    if ( self.lastPosition !== "top" ) {
                        self.element.css( {
                            "position": "absolute",
                            "top": "0px",
                            "bottom": "0px",
                            "left": self.leftBound - self.parentLeft + "px",
                            "width": self.width + "px"
                        } );
                        self.lastPosition = "top";
                        self.logStatus();
                    }
                }
                else if ( self.bottom > self.parentBottom ||
                          Math.abs(self.bottom - self.parentBottom) < 1 ) {
                    if ( self.lastPosition !== "bottom" ) {
                        self.element.css( {
                            "position": "absolute",
                            "top": (self.winTop + self.options.topBound - self.parentTop) + "px",
                            "bottom": "0px",
                            "left": self.leftBound - self.parentLeft + "px",
                            "width": self.width + "px"
                        } );
                        self.lastPosition = "bottom";
                        self.logStatus();
                    }
                }
                else {
                    if ( self.lastPosition !== "middle" ) {
                        self.element.css( {
                            "position": "fixed",
                            "top": self.options.topBound + "px",
                            "bottom": "0px",
                            "left": self.leftBound + "px",
                            "width": self.width + "px"
                        } );
                        self.lastPosition = "middle";
                        self.logStatus();
                    }
                }
            },

            logStatus: function() {
                var self = this;
                if (Sidebar.DEBUG) {
                    console.log("Sidebar in " + self.lastPosition + " position.");
                    console.log("height: " + self.element.height());
                    console.log("self: ", self);
                }
            }
        },

        "static": {
            DEBUG: false
        }
    } );

    return Sidebar;
} );
