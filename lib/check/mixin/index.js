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
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    props: {
      icon: {
        type: String,
        default: 'checked'
      },
      iconInverse: {
        type: String,
        default: 'check'
      },
      iconDisabled: {
        type: String,
        default: 'check-disabled'
      },
      iconSvg: {
        type: Boolean,
        default: false
      },
      iconSize: {
        type: String,
        default: 'md'
      },
      iconPosition: {
        type: String,
        default: 'right'
      }
    }
  };
});