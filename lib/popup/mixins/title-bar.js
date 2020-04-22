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
    global.titleBar = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      title: {
        type: String,
        default: ''
      },
      describe: {
        type: String,
        default: ''
      },
      okText: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: ''
      },
      titleAlign: {
        type: String,
        default: 'center'
      },
      largeRadius: {
        type: Boolean,
        default: false
      },
      onlyClose: {
        type: Boolean,
        default: false
      }
    }
  };
});