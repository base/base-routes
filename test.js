'use strict';

require('mocha');
require('should');
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

function append(str) {
  return function(view, next) {
    var content = view.contents.toString();
    view.contents = new Buffer(content + ' ' + str);
    next();
  };
}
function prepend(str) {
  return function(view, next) {
    var content = view.contents.toString();
    view.contents = new Buffer(str + ' ' + content);
    next();
  };
}

describe('routes', function () {
  beforeEach(function () {
    app = new Base();
    app.engine('tmpl', require('engine-base'));
    app.create('page');
  });

  describe('params', function () {
    it('should call param function when routing', function(done) {
      app.param('id', function(view, next, id) {
        assert.equal(id, '123');
        next();
      });

      app.all('/foo/:id/bar', function(view, next) {
        assert.equal(view.options.params.id, '123');
        next();
      });

      app.router.handle({ path: '/foo/123/bar' }, done);
    });
  });

  describe('onLoad middleware', function () {
    it('should run when templates are loaded:', function () {
      app.onLoad(/\.tmpl/, prepend('onLoad'));
      app.pages('a.tmpl', { path: 'a.tmpl', content: '<%= name %>'});

      var page = app.pages.getView('a.tmpl');
      page.contents.toString().should.equal('onLoad <%= name %>');
    });
  });

  describe('preCompile middleware', function () {
    it('should run before templates are compiled:', function () {

    });
  });

  describe('postCompile middleware', function () {
    it('should run after templates are compiled:', function () {

    });
  });

  describe('preRender middleware', function () {
    it('should run before templates are rendered:', function (done) {
      app.preRender(/\.tmpl/, prepend('preRender'));
      app.pages('a.tmpl', { path: 'a.tmpl', content: '<%= name %>', locals: {name: 'aaa'} });

      var page = app.pages.getView('a.tmpl');
      page.contents.toString().should.equal('<%= name %>');

      page.render({}, function (err, res) {
        if (err) return done(err);
        res.contents.toString().should.equal('preRender aaa');
        done();
      });
    });
  });

  describe('postRender middleware', function () {
    it('should run after templates are rendered:', function (done) {
      app.postRender(/\.tmpl/, append('postRender'));
      app.pages('a.tmpl', { path: 'a.tmpl', content: '<%= name %>', locals: {name: 'aaa' }});

      var page = app.pages.getView('a.tmpl');
      page.contents.toString().should.equal('<%= name %>');

      page.render({}, function (err, res) {
        if (err) return done(err);
        res.contents.toString().should.equal('aaa postRender');
        done();
      });
    });
  });
});
