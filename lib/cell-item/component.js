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
    'name': 'cell-item',
    'text': '列表单元',
    'category': 'basic',
    'description': '列表用于展现并列层级的信息内容，列表可承载功能入口、功能操作、信息展示等功能',
    'author': 'moyu <moyuboy@gmail.com>'
  };
});