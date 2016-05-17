# base-routes [![NPM version](https://img.shields.io/npm/v/base-routes.svg?style=flat)](https://www.npmjs.com/package/base-routes) [![NPM downloads](https://img.shields.io/npm/dm/base-routes.svg?style=flat)](https://npmjs.org/package/base-routes) [![Build Status](https://img.shields.io/travis/node-base/base-routes.svg?style=flat)](https://travis-ci.org/node-base/base-routes)

Plugin for adding routes support to your `base` application. Requires templates support to work.

## TOC

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Related projects](#related-projects)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install base-routes --save
```

## Usage

```js
var routes = require('base-routes');
var Base = require('base-app');

var app = new Base();
app.use(routes());
```

## API

**Example**

```js
var router = new app.Router();
var route = new app.Route();
```

### [.handle](index.js#L38)

Handle a middleware `method` for `file`.

**Params**

* `method` **{String}**: Name of the router method to handle. See [router methods](./docs/router.md)
* `file` **{Object}**: View object
* `callback` **{Function}**: Callback function
* `returns` **{undefined}**

**Example**

```js
app.handle('customMethod', file, callback);
```

### [.handleOnce](index.js#L88)

Run the given middleware handler only if the file has not already been handled by `method`.

**Params**

* `method` **{Object}**: The name of the handler method to call.
* `file` **{Object}**
* `returns` **{undefined}**

**Example**

```js
app.handleOnce('onLoad', file, callback);
```

### [.route](index.js#L155)

Create a new Route for the given path. Each route contains a separate middleware stack. See the [route API documentation][route-api] for details on adding handlers and middleware to routes.

**Params**

* `path` **{String}**
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
app.create('posts');
app.route(/blog/)
  .all(function(file, next) {
    // do something with file
    next();
  });

app.post('whatever', {path: 'blog/foo.bar', content: 'bar baz'});
```

### [.param](index.js#L182)

Add callback triggers to route parameters, where `name` is the name of the parameter and `fn` is the callback function.

**Params**

* `name` **{String}**
* `fn` **{Function}**
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
app.param('title', function(view, next, title) {
  //=> title === 'foo.js'
  next();
});

app.onLoad('/blog/:title', function(view, next) {
  //=> view.path === '/blog/foo.js'
  next();
});
```

### [.all](index.js#L205)

Special route method that works just like the `router.METHOD()` methods, except that it matches all verbs.

**Params**

* `path` **{String}**
* `callback` **{Function}**
* `returns` **{Object}** `this`: for chaining

**Example**

```js
app.all(/\.hbs$/, function(view, next) {
  // do stuff to view
  next();
});
```

### [.handler](index.js#L226)

Add a router handler method to the instance. Interchangeable with the [handlers](#handlers) method.

**Params**

* `method` **{String}**: Name of the handler method to define.
* `returns` **{Object}**: Returns the instance for chaining

**Example**

```js
app.handler('onFoo');
// or
app.handler(['onFoo', 'onBar']);
```

### [.handlers](index.js#L244)

Add one or more router handler methods to the instance.

**Params**

* `methods` **{Array|String}**: One or more method names to define.
* `returns` **{Object}**: Returns the instance for chaining

**Example**

```js
app.handlers(['onFoo', 'onBar', 'onBaz']);
// or
app.handlers('onFoo');
```

## Related projects

You might also be interested in these projects:

* [base-option](https://www.npmjs.com/package/base-option): Adds a few options methods to base, like `option`, `enable` and `disable`. See the readme… [more](https://www.npmjs.com/package/base-option) | [homepage](https://github.com/node-base/base-option)
* [base-plugins](https://www.npmjs.com/package/base-plugins): Upgrade's plugin support in base applications to allow plugins to be called any time after… [more](https://www.npmjs.com/package/base-plugins) | [homepage](https://github.com/node-base/base-plugins)
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)
* [en-route](https://www.npmjs.com/package/en-route): Routing for static site generators, build systems and task runners, heavily based on express.js routes… [more](https://www.npmjs.com/package/en-route) | [homepage](https://github.com/jonschlinkert/en-route)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/node-base/base-routes/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/node-base/base-routes/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 17, 2016._