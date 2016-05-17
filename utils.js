'use strict';

var debug = require('debug')('base:routes');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('en-route', 'router');
require('is-registered');
require('is-valid-instance');
require = fn;

/**
 * Cast `val` to an array.
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

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

utils.isValid = function(app) {
  if (!utils.isValidInstance(app)) {
    return false;
  }
  if (utils.isRegistered(app, 'base-routes')) {
    return false;
  }
  debug('loading routes methods');
  return true;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
