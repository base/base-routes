'use strict';

require('mocha');
require('should');
var assert = require('assert');
var Base = require('base-app');
var routes = require('./');
var app;

describe('routes', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(routes());
  });

  describe('routes', function() {
    it('should create a route for the given path:', function(cb) {
      var count = 0;

      app.on('all', function(msg) {
        assert.equal(msg, 'done');
        count++;
      });

      app.route('blog/:title')
        .all(function(view, next) {
          app.emit('all', 'done');
          count++;
          next();
        });

      app.handle('onLoad', { path: 'blog/foo.js' }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 2);
        cb();
      });
    });

    it('should emit events when a route method is called:', function(cb) {
      var count = 0;

      app.on('onLoad', function(view) {
        assert.equal(view.path, 'blog/foo.js');
        count++;
      });

      app.param('title', function(view, next, title) {
        assert.equal(title, 'foo.js');
        count++;
        next();
      });

      app.onLoad('blog/:title', function(view, next) {
        assert.equal(view.path, 'blog/foo.js');
        count++;
        next();
      });

      app.handle('onLoad', {path: 'blog/foo.js'}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 3);
        cb();
      });
    });

    it('should emit errors', function(cb) {
      var count = 0;

      app.on('error', function(err) {
        count++;
        assert.equal(err.message, "'foo.js' == 'fo.js'");
      });

      // should be wrong...
      app.param('title', function(view, next, title) {
        count++;
        assert.equal(title, 'fo.js');
        next();
      });

      app.onLoad('blog/:title', function(view, next) {
        count++;
        assert.equal(view.path, '/blog/foo.js');
        next();
      });

      app.handle('onLoad', {path: 'blog/foo.js'}, function(err) {
        assert(err);
        assert.equal(count, 2);
        cb();
      });
    });

    it('should have path property', function() {
      var route = new app.Route('/blog/:year/:month/:day/:slug').all([
        function() {}
      ]);
      assert.equal(route.path, '/blog/:year/:month/:day/:slug');
    });

    it('should have stack property', function() {
      var route = new app.Route('/blog/:year/:month/:day/:slug').all([
        function() {}
      ]);

      assert.equal(Array.isArray(route.stack), true);
      assert.equal(route.stack.length, 1);
    });
  });
});

describe('routes', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(routes());
  });

  describe('params', function() {
    it('should call param function when routing', function(cb) {
      var count = 0;

      app.param('id', function(view, next, id) {
        count++;
        assert.equal(id, '123');
        next();
      });

      app.all('/foo/:id/bar', function(view, next) {
        count++;
        assert.equal(view.options.params.id, '123');
        next();
      });

      app.router.handle({ path: '/foo/123/bar' }, function(err) {
        if (err) return cb(err);
        assert.equal(count, 2);
        cb();
      });
    });
  });
});
