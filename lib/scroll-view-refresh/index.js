;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../scroll-view/refresh', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../scroll-view/refresh'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.refresh, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _refresh) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _refresh2 = _interopRequireDefault(_refresh);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _refresh2.default;
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
