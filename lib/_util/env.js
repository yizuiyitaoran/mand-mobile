(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'vue'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('vue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue);
    global.env = mod.exports;
  }
})(this, function (exports, _vue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.root = exports.isIOS = exports.isAndroid = exports.UA = exports.inBrowser = exports.isProd = undefined;

  var _vue2 = _interopRequireDefault(_vue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Development environment
  var isProd = exports.isProd = process.env.NODE_ENV === 'production';

  // Browser environment sniffing
  var inBrowser = exports.inBrowser = !_vue2.default.prototype.$isServer || typeof window !== 'undefined';
  var UA = exports.UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isAndroid = exports.isAndroid = UA && UA.indexOf('android') > 0;
  var isIOS = exports.isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  var root = exports.root = typeof window !== 'undefined' ? window : global;
});