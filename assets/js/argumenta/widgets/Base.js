define( 'argumenta/widgets/Base',
[
    "require-jquery",
    "require-mustache",
    "text!./Base/template.html.mustache",
    "argumenta/sandbox"
],
function( $, Mustache, Template, Sandbox ) {

    /**
     * @class Base
     *
     * Prototype properties to override:
     *   moduleID        (essential)   the css classname is generated from this
     *   template        (recommended) a mustache template
     *   defaultOptions  (optional)
     *
     * Prototype methods to override:
     *   _renderHtml     (optional)    by default, renders Base.template with Base.options
     *   _getViewOptions (optional)    returns the options accessible to the view (by default: self.options)
     *   _bindUI         (optional)    to bind any listeners after each _init() & _refresh()
     *   _init           (optional)    you may call this._super('_init', options)
     *
     * @property {Object} element Reference to the element node (as Jquery object).
     * @property {Object} options The instance's options (construction parameters merged with the defaults)
     */
    var Base = function( options, originalElement ) {
        this._init( options, originalElement );
    };

    Base.prototype = {

        /**
         *  Clones this widget.
         *
         *  @return {Object} The new clone.
         */
        clone: function() {
            return Sandbox.widgetFor(this.getOptions());
        },

        /**
         * Gets this widget's CSS classname.
         *
         * @return {String} The widget CSS classname.
         */
        getClassName: function() {
            return this.moduleID.toLowerCase() + '-widget';
        },

        /**
         *  Gets this widget's CSS selector.
         *
         *  @return {String} The widget CSS selector.
         */
        getClassSelector: function() {
            return '.' + this.getClassName();
        },

        /**
         * Gets a copy of this widget's options.
         *
         * @return {Object} A widget options copy.
         */
        getOptions: function() {
            return $.extend({}, this.options);
        },

        /**
         * Call an instance method inherited from the object's parent.
         *
         * @param {String} methodName The name of the inherited method to call.
         * @param {Array}  args       An array of argument parameters to be passed.
         */
        _super : function( methodName, args ) {
            return this.parent[methodName].apply( this, args );
        },

        /**
         * Initialize the widget instance (including member fields & element node).
         */
        _init : function( opts ) {

            var options = opts || {};

            // Merge default options and parameters for this instance.
            this.options = $.extend(
                {},
                this.defaultOptions,
                options,
                options[this.moduleID.toLowerCase()]
            );

            // Initialize element for this instance.
            this.element = $('<div class="' + this.getClassName() + '">' );

            // Save a reference to this widget instance in the element's "data-<classname>" attribute.
            this.element.data(this.getClassName(), this);

            // Save merged options on element as "data-options" attribute.
            this.element.data('options', this.options);

            // Save the data object.
            this.data = this.element.data();

            // Make options an alias for data.options.
            this.options = this.data.options;

            // Update the element contents.
            this._refresh();
        },

        _refresh : function() {
            this._renderUI();
            this._bindUI();
        },

        _renderUI : function() {

            // Get the updated html.
            var html = this._renderHtml();
            var innerHtml = $( html ).html();

            // Update the element contents.
            this.element.html( innerHtml );
        },

        _bindUI : function() {

        },

        /** @return {Object} The hash of options accessible to the view; self.options by default. */
        _getViewOptions: function() {
            return this.options;
        },

        /** @return {String} Appropriate widget html for the given options. */
        _renderHtml: function() {
            return this._renderMustache( this.template, this._getViewOptions() );
        },

        /** @return {String} Html rendered from mustache template and view. */
        _renderMustache: function( template, view ) {
            return Mustache.to_html( template, view );
        }

    };


    // Prototype Fields

    Base.prototype.moduleID = 'Base';

    Base.prototype.defaultOptions = {};

    Base.prototype.template = Template;


    // Static Fields & Methods

    Base.getModuleID = function() {
        return this.prototype.moduleID;
    };

    Base.getClassName = function() {
        return this.prototype.getClassName();
    };

    Base.getClassSelector = function() {
        return this.prototype.getClassSelector();
    };

    /**
     * Activate a widget placeholder element by installing a new instance on it.
     * Any 'data-' attributes will be passed as options to create the widget.
     *
     * The original element will also be passed to the widget constructor,
     * so modules may process (or ignore) it during initialization.
     *
     * @param {Object} element The placeholder element node (raw, or as jQuery object).
     * @return {Object} element The installed widget element, as a jQuery object.
     */
    Base.activate = function( element ) {

        element = $(element);

        if ( element.hasClass(this.getClassName() ) ) {

            var tmp = $('<div class="tmp" style="display:none;">');

            // Remove the element from the DOM, but keep its place with tmp.
            element.replaceWith( tmp );

            // Read all data- attributes from the placeholder,
            // and use them as options for the new widget instance.
            var opts = element.data();
            var widget = new this( opts, element );

            // Place the activated widget in the original's place.
            tmp.replaceWith( widget.element );

            // Return the activated element.
            return widget.element;
        }
        else {
            return null;
        }
    };

    /**
     *  Create a subClass from a baseClass constructor,
     *  by extending properties of its prototype & static module.
     */
    function _subclass( baseClass, prototypeExt, staticExt ) {

        // Constructor for the new class.
        var subClass = function( options, originalElem ) {
            this._init( options, originalElem );
        };

        // Static Module: extend the Base module with static extensions.
        subClass = $.extend( subClass, baseClass, staticExt );

        // Prototype: extend a Base instance with prototype extensions.
        subClass.prototype = $.extend( new baseClass(), prototypeExt );

        // Set the subClass parent.
        subClass.prototype.parent = baseClass.prototype;

        return subClass;
    }

    /**
     * Create a subclass of the Base widget module.
     *
     * @param {Object} prototypeExt Prototype properties to override.
     * @param {Object} staticExt Static properties to override.
     */
    Base.subclass = function( prototypeExt, staticExt ) {
        return _subclass( this, prototypeExt, staticExt );
    };

    /**
     * Static function to register widget modules.
     */
    Base.register = function( module ) {
        Sandbox.register( module );
    };

    /**
     * Define a widget module - syntactic sugar for defining widgets with Base.
     *
     * It automates the following steps before returning the new module:
     * 1. creates a module with Base.subclass( prototype, static )
     * 2. performs setup handling module options (moduleID, template, defaults, init())
     * 3. registers with Base.register( module )
     *
     * Options defining the module are passed as properties of a hash object.
     *  - The moduleID must be specified.
     *  - The template, defaults, init, prototype, static properties are optional.
     *
     * If an init function is given, Base.prototype._init is overridden to call:
     *  1. Base.prototype._init()
     *  2. This function
     *
     * @example
     *
     *  var Demo = Base.module( {
     *      moduleID: 'Demo',
     *      template: '<div class="demo-widget" data-testOption="testing"></div>',
     *
     *      init: function( options ) {
     *          var self = this;
     *
     *          Demo.widgetCount++;
     *          self.setNumber( Demo.widgetCount );
     *
     *          self.element.append( 'Created on: ' + new Date )
     *                      .append( '\nwith options: ' + JSON.stringify( options ) )
     *                      .append( '\nwidget count: ' + Demo.widgetCount )
     *                      .append( '\nwidget name:  ' + self.getName() )
     *                      .wrapInner( '<pre style="background:white;"/>' );
     *      },
     *
     *      prototype: {
     *          number: null,
     *          setNumber: function( num ) {
     *              var self = this;
     *              self.number = num;
     *          },
     *          getName: function() {
     *              return "Demo-" + this.number;
     *          }
     *      },
     *
     *      static: {
     *          widgetCount: 0
     *      }
     *  } );
     *
     * @see Base
     * @param {Object}   opts           An options hash defining the widget module.
     * @param {String}   opts.moduleID  Required: The module's name. For example, "Argument".
     * @param {String}   opts.template  Recommended: The widget's HTML template. Supports mustache.
     * @param {Object}   opts.defaults  Optional: A hash of default options for widget instances.
     * @param {Function} opts.init      Runs on widget instance creation, after Base#_init().
     * @param {Object}   opts.prototype Module prototype properties. May override Base.prototype.
     * @param {Object}   opts.static    Module static properties.
     */
    Base.module = function( opts ) {

        var moduleID = opts.moduleID || opts.prototype.moduleID;
        var template = opts.template || opts.prototype.template;
        var defaults = opts.defaults || opts.prototype.defaultOptions;
        var init = opts.init         || opts.prototype._init;
        var prototype = opts.prototype || {};
        var static = opts.static || {};

        // Create the new module by subclassing Base
        var module = Base.subclass( prototype, static );

        // Ensure moduleID is set.
        if ( moduleID ) {
            // Prepare the prototype.
            module.prototype.moduleID = moduleID;
        }
        else {
            console.log( "Can't create module without option: 'moduleID'." );
            return;
        }

        // Handle the template option, if set.
        if ( template ) {
            module.prototype.template = template;
        }

        // Handle default options, if set.
        if ( defaults ) {
            module.prototype.defaultOptions = defaults;
        }

        // Handle the init option, if set.
        if ( typeof init === 'function' ) {

            // Create a name for this module's init.
            var funcName = '_init' + moduleID;

            // Set the init function on the module prototype.
            module.prototype[ funcName ] = init;

            // Override the behavior of Base._init.
            module.prototype._init = function( options, origElem ) {
                var self = this;
                // Call Base._init, and then the new init.
                self._super('_init', [ options ] );
                self[ funcName ]( options, origElem );
            };
        }

        // Register and return the new module.
        Base.register( module );
        return module;
    };

    // Register the Base widget module.
    Base.register( Base );

    return Base;

} );
