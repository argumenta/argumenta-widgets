define( 'argumenta/widgets/Base',
[
    "require-jquery",
    "require-mustache",
    "text!./Base/template.html.mustache",
    "argumenta/config",
    "argumenta/sandbox"
],
function( $, Mustache, Template, Config, Sandbox ) {

    /**
     * @class Base
     *
     * The Base class is an extendable foundation for Argumenta widgets.
     * It defines properties to override, and provides convenience methods.
     *
     * @see Base.module()   Defines widget modules.
     * @see Base.activate() Activates widget instances from elements.
     * @property {Object} options The instance options (merged with defaults).
     * @property {Object} element The element node (as a jQuery object).
     */

    var Base = function( options, originalElement ) {
        this._init( options, originalElement );
    };


    /**
     * The module ID.
     */

    Base.prototype.moduleID = 'Base';

    /**
     * The default widget options.
     */

    Base.prototype.defaultOptions = {
        base_url: Config.baseUrl
    };

    /**
     * The widget template.
     */

    Base.prototype.template = Template;


    /**
     *  Clones this widget.
     *
     *  @returns {Object} The new clone.
     */

    Base.prototype.clone = function() {
        return Sandbox.widgetFor(this.getOptions());
    };

    /**
     * Gets this widget's CSS classname.
     *
     * @returns {String} The widget CSS classname.
     */

    Base.prototype.getClassName = function() {
        return this.moduleID.toLowerCase() + '-widget';
    };

    /**
     *  Gets this widget's CSS class selector.
     *
     *  @returns {String} The widget CSS class selector.
     */

    Base.prototype.getClassSelector = function() {
        return '.' + this.getClassName();
    };

    /**
     * Gets a copy of this widget's options.
     *
     * @returns {Object} A widget options copy.
     */

    Base.prototype.getOptions = function() {
        return $.extend({}, this.options);
    };

    /**
     * Calls an instance method inherited from the object's parent.
     *
     * @param {String} methodName The name of the inherited method to call.
     * @param {Array}  args       An array of argument parameters to pass.
     */

    Base.prototype._super = function( methodName, args ) {
        return this.parent[methodName].apply( this, args );
    };

    /**
     * Initializes the widget instance, including properties and element.
     */

    Base.prototype._init = function( opts ) {

        var options = opts || {};

        // Merge default options and parameters for this instance.
        this.options = $.extend(
            {},
            Base.prototype.defaultOptions,
            this.defaultOptions,
            options,
            options[this.moduleID.toLowerCase()]
        );

        // Initialize element for this instance.
        this.element = $('<div class="' + this.getClassName() + '">' );

        // Save a reference to this widget instance in the element's
        // "data-<classname>" attribute.
        this.element.data(this.getClassName(), this);

        // Save merged options on element as "data-options" attribute.
        this.element.data('options', this.options);

        // Save the data object.
        this.data = this.element.data();

        // Make options an alias for data.options.
        this.options = this.data.options;

        // Update the element contents.
        this._refresh();
    };

    /**
     * Refreshes the widget view by rendering and binding the UI.
     */

    Base.prototype._refresh = function() {
        this._renderUI();
        this._bindUI();
    };

    /**
     * Renders UI by updating the widget element's contents.
     */

    Base.prototype._renderUI = function() {

        // Get the updated html.
        var html = this._renderHtml();
        var innerHtml = $( html ).html();

        // Update the element contents.
        this.element.html( innerHtml );
    };

    /**
     * Binds UI event listeners after each refresh.
     */

    Base.prototype._bindUI = function() {},

    /**
     * Gets template view options for rendering.
     *
     * @returns {Object} The view-accessible options.
     */

    Base.prototype._getViewOptions = function() {
        return this.options;
    };

    /**
     * Renders HTML from the widget template and options.
     *
     * @returns {String} The rendered HTML.
     */

    Base.prototype._renderHtml = function() {
        return this._renderMustache( this.template, this._getViewOptions() );
    };

    /**
     * Renders HTML from a mustache template and view options.
     *
     * @returns {String} The rendered HTML.
     */

    Base.prototype._renderMustache = function( template, view ) {
        return Mustache.to_html( template, view );
    };


    /**
     * Gets the module ID.
     */

    Base.getModuleID = function() {
        return this.prototype.moduleID;
    };

    /**
     * Gets the CSS classname.
     */

    Base.getClassName = function() {
        return this.prototype.getClassName();
    };

    /**
     * Gets the CSS class selector.
     */

    Base.getClassSelector = function() {
        return this.prototype.getClassSelector();
    };

    /**
     * Activates a widget placeholder element.
     *
     * The original element is replaced with a new widget instance.
     *
     * Any `data-` attributes are passed as options to create the widget.
     * Modules may optionally process the original element on initialization.
     *
     * @param {Object} element The placeholder element. May be a jQuery object.
     * @returns {Object}       The new widget element, as a jQuery object.
     */

    Base.activate = function( element ) {

        element = $(element);
        var className = this.getClassName();

        if ( element.hasClass(className) && !element.data(className) ) {

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
     * Creates a subclass from a constructor function.
     * The subclass may have extended prototype and static properties.
     *
     * @param {Function}  baseClass    The base class to extend.
     * @param {Object}    prototypeExt Any prototype extensions.
     * @param {Object}    staticExt    Any static extensions.
     * @returns {Function}             The extended subclass.
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
     * Creates a subclass of this widget module.
     *
     * @param {Object} prototypeExt Prototype properties to override.
     * @param {Object} staticExt    Static properties to override.
     */

    Base.subclass = function( prototypeExt, staticExt ) {
        return _subclass( this, prototypeExt, staticExt );
    };

    /**
     * Registers a new widget module.
     */

    Base.register = function( module ) {
        Sandbox.register( module );
    };

    /**
     * Defines a widget module. Syntactic sugar for extending Base.
     *
     * It subclasses Base, sets up prototype and static fields,
     * registers the module, and then returns it.
     *
     * Example JS ("js/widgets/Demo.js"):
     *
     *     var Demo = Base.module( {
     *
     *         moduleID: 'Demo',
     *         template: '<div class="demo-widget"><pre>{{ message }}</pre></div>',
     *
     *         init: function( options ) {
     *             var self = this;
     *
     *             Demo.total++;
     *             self.setNumber( Demo.total );
     *
     *             self.options.message = "Widget name: " + self.getName()
     *                 + "\nFortune: " + options.fortune
     *                 + "\nCreated on: " + new Date()
     *                 + "\nWith options: " + JSON.stringify( options )
     *                 + "\nTotal widgets: " + Demo.total;
     *         },
     *
     *         prototype: {
     *             setNumber: function( num ) {
     *                 var self = this;
     *                 self.number = num;
     *             },
     *             getName: function() {
     *                 return "Demo-" + this.number;
     *             }
     *         },
     *
     *         static: {
     *             total: 0
     *         }
     *     } );
     *
     * Example CSS ("js/widgets/Demo/style.css", import in "css/widgets.css"):
     *
     *     div.demo-widget: {
     *         background: white;
     *     }
     *
     * Example HTML ("demo-example.html"):
     *
     *     <!DOCTYPE html>
     *     <html>
     *     <head>
     *       <meta charset="utf-8"/>
     *       <link rel="stylesheet" href="/widgets/css/widgets.css">
     *     </head>
     *     <body>
     *       <div class="demo-widget" data-demo='{"fortune": "Hello world!"}'></div>
     *       <script data-main="/widgets/js/main" src="/widgets/js/require.js"></script>
     *     <body>
     *     </html>
     *
     * @see Base
     * @param {Object}   opts           An options hash defining the widget module.
     * @param {String}   opts.moduleID  Required: The module's name. For example, "Argument".
     * @param {String}   opts.template  Recommended: The widget's HTML template. Supports mustache.
     * @param {Object}   opts.defaults  Optional: A hash of default options for widget instances.
     * @param {Function} opts.init      Runs on widget instance creation, after Base#_init().
     * @param {Object}   opts.prototype Module prototype properties. May override Base properties.
     * @param {Object}   opts.static    Module static properties.
     * @returns {Function}              The new module.
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
                self[ funcName ]( self.options, origElem );
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
