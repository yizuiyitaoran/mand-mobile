(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.component = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    'name': 'dialog',
    'text': '模态窗口',
    'category': 'feedback',
    'description': '弹出式交互窗口',
    'author': 'moyu <moyuboy@gmail.com>'
  };
});