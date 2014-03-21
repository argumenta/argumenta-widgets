
# Argumenta-Widgets

JavaScript widgets for Argumenta. Designed for [argumenta.io](http://argumenta.io). Use anywhere on the web!  
Includes arguments, propositions, and (support, dispute, citation) tags.

<img src="https://raw.github.com/argumenta/argumenta-widgets/master/examples/images/argument.png">

## Example

Argumenta widgets may be included on any web page.  
Just include the JavaScript source and a widget element.  

Here's an example argument widget. It will display the argument with the given SHA-1:  

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <!-- Widget Element -->
    <div class="argument-widget" data-sha1="50250211801dabf9cbf0e574af270ba2c3fe83cb"></div>

    <!-- Argumenta-Widgets -->
    <script src="https://argumenta.io/widgets.js"></script>
  </body>
</html>
```

When the JavaScript loads, any placeholders on the page are automatically activated.  
This initializes each widget, loading content from `data-` attributes and Argumenta's JSON API.


## Install

Argumenta widgets can also be installed as a node module, for convenient use in other projects.

```bash
$ npm install argumenta-widgets
```

To use this local module, create a link to the desired assets:

```bash
$ ln -s ./node_modules/argumenta-widgets/development ./widgets  # For development.
$ ln -s ./node_modules/argumenta-widgets/production ./widgets   # For production.
```


## License

MIT
