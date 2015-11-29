'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);

/**
 * Temporarily re-assign `require` to trick browserify and
 * webpack into reconizing lazy dependencies.
 *
 * This tiny bit of ugliness has the huge dual advantage of
 * only loading modules that are actually called at some
 * point in the lifecycle of the application, whilst also
 * allowing browserify and webpack to find modules that
 * are depended on but never actually called.
 */

var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('en-route', 'routes');

/**
 * Restore `require`
 */

require = fn;

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
 * Return the given value as-is.
 */

utils.identity = function(val) {
  return val;
};

/**
 * Arrayify the given value by casting it to an array.
 */

utils.arrayify = function(val) {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
