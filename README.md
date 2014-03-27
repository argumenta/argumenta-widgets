
# Argumenta Widgets

JavaScript widgets for [Argumenta][Argumenta]. Designed for [Argumenta.io][Argumenta.io]. Use anywhere on the web!  
Includes arguments, propositions, and (support, dispute, citation) tags.

<img src="https://raw.github.com/argumenta/argumenta-widgets/master/examples/images/argument.png">

## Example

To use Argumenta widgets on any page, just include the JavaScript source and a widget element.  
Here's an example argument widget. It displays the latest argument published at the given repo:  

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <!-- Widget Element -->
    <div class="argument-widget" data-repo="qualiabyte/my-argument-^_^"></div>
    <!-- Argumenta Widgets -->
    <script src="https://argumenta.io/widgets.js"></script>
  </body>
</html>
```

When the JavaScript loads, any placeholders on the page are automatically activated.  
This initializes each widget, loading content from `data-` attributes and [Argumenta's REST API][Argumenta-API].  

## API

### Argument

Argument data can either be specified directly, or loaded via the REST API.  
Just set one of the following options: `argument`, `sha1`, or `repo`.  

```html
<!-- Loads argument data directly, or from API by SHA-1 or repo. -->
<div class="argument-widget" data-argument='{"title":"My Argument ^_^","premises":["The first premise!","The second premise!"],"conclusion":"The conclusion.","object_type":"argument","sha1":"50250211801dabf9cbf0e574af270ba2c3fe83cb","repo":"my-argument-^_^","metadata":{"discussions_count":"1"},"commit":{"object_type":"commit","sha1":"ec9a968237e676e954f4a56d1b54727e457825b9","target_type":"argument","target_sha1":"50250211801dabf9cbf0e574af270ba2c3fe83cb","committer":"qualiabyte","commit_date":"2013-05-28T12:34:01Z","parent_sha1s":[],"host":null}}'></div>
<div class="argument-widget" data-sha1="50250211801dabf9cbf0e574af270ba2c3fe83cb"></div>
<div class="argument-widget" data-repo="qualiabyte/my-argument-^_^"></div>
```

When using the REST API, no other options are required &ndash; but the display options may still be useful!

```html
<!-- Changes the default display options. -->
<div class="argument-widget" data-show_propositions="false" data-sha1="50250211801dabf9cbf0e574af270ba2c3fe83cb"></div>
<div class="argument-widget" data-show_discussions="true" data-sha1="50250211801dabf9cbf0e574af270ba2c3fe83cb"></div>
```

Here's the full list of argument options:

+ **argument** *Object* The argument data.
+ **argument.title** *String* The title.
+ **argument.premises** *Array&lt;String&gt;* The premises.
+ **argument.conclusion** *String* The conclusion.
+ **argument.object_type** *String* The object type. ("argument")
+ **argument.metadata** *Object* The argument's metadata.
+ **argument.metadata.discussions_count** *Number* The discussions count. (Default: 0)
+ **commit** *Object* The argument's commit data.
+ **propositions** *Array&lt;Object&gt;* An array of argument propositions data. (Optional; for caching)
+ **repo** *String* The argument's repo. (Example: "user/repo")
+ **sha1** *String* The argument's SHA-1.
+ **show_discussions** *Boolean* Whether to show discussions initially. (Default: false)
+ **show_propositions** *Boolean* Whether to show propositions initially. (Default: true)

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

[Argumenta]: https://github.com/argumenta/argumenta
[Argumenta.io]: https://argumenta.io
[Argumenta-API]: https://github.com/argumenta/argumenta/blob/master/doc/README.API.markdown
