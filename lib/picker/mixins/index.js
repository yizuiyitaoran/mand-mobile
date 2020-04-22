(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../../popup/mixins', '../../popup/mixins/title-bar'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../../popup/mixins'), require('../../popup/mixins/title-bar'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.mixins, global.titleBar);
    global.index = mod.exports;
  }
})(this, function (exports, _mixins, _titleBar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _mixins2 = _interopRequireDefault(_mixins);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    mixins: [_mixins2.default, _titleBar2.default],
    props: {
      isView: {
        type: Boolean,
        default: false
      },
      okText: {
        default: '确认'
      },
      cancelText: {
        default: '取消'
      },
      lineHeight: {
        type: Number
      },
      keepIndex: {
        type: Boolean,
        default: false
      }
    }
  };
});