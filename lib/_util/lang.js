(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './env'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./env'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.env);
    global.lang = mod.exports;
  }
})(this, function (exports, _env) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.noop = noop;
  exports.requireRemoteScript = requireRemoteScript;
  exports.getDpr = getDpr;
  exports.functionToUrl = functionToUrl;
  exports.randomId = randomId;
  exports.transformCamelCase = transformCamelCase;
  exports.debounce = debounce;
  exports.throttle = throttle;
  function noop() {}

  /**
   * Include external script dynamically
   */
  /* istanbul ignore file */
  function requireRemoteScript(src, callback) {
    var doc = document;
    var head = doc.head || doc.getElementsByTagName('head')[0];

    var node = doc.createElement('script');
    var supportOnload = 'onload' in node;
    var onload = function onload() {
      node = null;
      typeof callback === 'function' && callback();
    };

    if (supportOnload) {
      node.onload = onload;
    } else {
      node.onreadystatechange = function () {
        if (/loaded|complete/.test(node.readyState)) {
          onload();
        }
      };
    }

    node.async = true;
    node.crossOrigin = true;
    node.charset = 'utf-8';
    node.src = src;
    head.appendChild(node);
  }

  function getDpr() {
    var getParam = function getParam(name, str) {
      var reg = new RegExp('(^|,)' + name + '=([^,]*)(,|$)', 'i');
      var r = str.match(reg);
      if (r != null) {
        return r[2];
      }
      return null;
    };

    var viewPort = _env.inBrowser ? document.querySelector('meta[name=viewport]') : null;

    if (!viewPort) {
      return 1;
    }

    var viewPortContent = viewPort.getAttribute('content');
    var initialScale = +(getParam('initial-scale', viewPortContent) || 1);
    var maximumScale = +(getParam('maximum-scale', viewPortContent) || 1);
    var minimumScale = +(getParam('minimum-scale', viewPortContent) || 1);

    return 1 / Math.min(initialScale, maximumScale, minimumScale);
  }

  /**
   * transform a Function to Blob Url
   */
  function functionToUrl(fn) {
    var blob = new Blob(['(' + fn.toString() + ')(null)'], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
  }

  /**
   * generate random id
   */
  function randomId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

    return process.env.NODE_ENV !== 'test' ? prefix + '-' + parseInt(Math.random() * Math.pow(10, length)) : '';
  }

  /**
   * kebab-case -> camelCase
   */
  function transformCamelCase(str) {
    var re = /-(\w)/g;
    return str.replace(re, function ($0, $1) {
      return $1.toUpperCase();
    });
  }

  /**
   * Creates a debounced function that delays invoking fn until after delay milliseconds
   */
  function debounce() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    var timer = null;

    return function () {
      var context = this;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        fn.apply(context, arguments);
      }, delay);
    };
  }

  /**
   * Creates a throttled function that only invokes fn at most once per every interval milliseconds
   */
  function throttle() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    var last = 0;

    return function () {
      var context = this;
      var now = Date.now();

      if (now - last > interval) {
        last = now;
        fn.apply(context, arguments);
      }
    };
  }
});