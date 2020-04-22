;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../tabs/tab-pane', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../tabs/tab-pane'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tabPane, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _tabPane) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _tabPane2 = _interopRequireDefault(_tabPane);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _tabPane2.default;
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
