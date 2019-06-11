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
    'name': 'detail-item',
    'text': '清单项目',
    'category': 'basic',
    'description': '清单列表用于展示一些列表信息，如账单。',
    'author': 'moyu <moyuboy@gmail.com>'
  };
});