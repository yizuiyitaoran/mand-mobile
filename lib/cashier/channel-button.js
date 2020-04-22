;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../button', '../_style/global.css', './style/channel-button.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../button'), require('../_style/global.css'), require('./style/channel-button.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.button, global.global, global.channelButton);
    global.channelButton = mod.exports;
  }
})(this, function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _button2 = _interopRequireDefault(_button);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  exports.default = {
    name: 'md-cashier-channel-button',

    components: _defineProperty({}, _button2.default.name, _button2.default),

    props: {
      actions: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-cashier-block-btn"},_vm._l((_vm.actions),function(action,index){return _c('md-button',{key:index,attrs:{"type":index === _vm.actions.length - 1 ? 'primary': 'default',"inline":_vm.actions.length > 1},domProps:{"innerHTML":_vm._s(action.buttonText)},on:{"click":function () {
      action.handler && action.handler()
    }}})}),1)}
__vue__options__.staticRenderFns = []
