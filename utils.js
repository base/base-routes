'use strict';

var debug = require('debug')('base:routes');
var isValidApp = require('is-valid-app');
var utils = module.exports;

/**
 * Returns true if `app` is valid and is not already registered.
 */

utils.isValid = function(app) {
  if (!isValidApp(app, 'base-routes', ['app', 'collection', 'views', 'list'])) {
    return false;
  }
  debug('loading routes methods');
  return true;
};

/**
 * Cast `val` to an array.
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Default router methods
 */

utils.methods = [
  'onLoad',
  'preCompile',
  'preLayout',
  'onLayout',
  'postLayout',
  'onMerge',
  'onStream',
  'postCompile',
  'preRender',
  'postRender',
  'preWrite',
  'postWrite'
];

/**
 * Expose `utils` modules
 */

module.exports = utils;
