'use strict';

require('mocha');
var assert = require('assert');
var Base = require('assemble-core');
var routes = require('./');
var app;

describe('routes', function () {
  beforeEach(function() {
    app = new Base();
    app.use(routes());
  });

  describe('routes', function() {
    it('should create a route for the given path:', function (done) {
      app = new Base();
      app.create('posts');

      app.on('all', function(msg) {
        assert(msg === 'done');
        done();
      });

      app.route('blog/:title')
        .all(function(view, next) {
          app.emit('all', 'done');
          next();
        });

      app.post('whatever', {path: 'blog/foo.js', content: 'bar baz'});
    });

    it('should emit events when a route method is called:', function (done) {
      app = new Base();
      app.create('posts');

      app.on('onLoad', function(view) {
        assert(view.path === 'blog/foo.js');
        done();
      });

      app.param('title', function (view, next, title) {
        assert(title === 'foo.js');
        next();
      });

      app.onLoad('blog/:title', function (view, next) {
        assert(view.path === 'blog/foo.js');
        next();
      });

      app.post('whatever', {path: 'blog/foo.js', content: 'bar baz'});
    });

    it('should emit errors', function (done) {
      app = new Base();
      app.create('posts');

      app.on('error', function(err) {
        assert(err.message === 'false == true');
        done();
      });

      // should be wrong...
      app.param('title', function (view, next, title) {
        assert(title === 'fo.js');
        next();
      });

      app.onLoad('/blog/:title', function (view, next) {
        assert(view.path === '/blog/foo.js');
        next();
      });

      app.post('whatever', {path: '/blog/foo.js', content: 'bar baz'});
    });

    it('should have path property', function () {
      var route = new app.Route('/blog/:year/:month/:day/:slug').all([
        function () {}
      ]);
      assert.equal(route.path, '/blog/:year/:month/:day/:slug');
    });

    it('should have stack property', function () {
      var route = new app.Route('/blog/:year/:month/:day/:slug').all([
        function () {}
      ]);

      assert.equal(Array.isArray(route.stack), true);
      assert.equal(route.stack.length, 1);
    });
  });
});
