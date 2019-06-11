;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _icon2 = _interopRequireDefault(_icon);

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
    name: 'md-button',

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      type: {
        type: String,
        default: 'default' },
      nativeType: {
        type: String,
        default: 'button'
      },
      icon: {
        type: String,
        default: ''
      },
      iconSvg: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'large' },
      plain: {
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      inline: {
        type: Boolean,
        default: false
      },
      inactive: {
        type: Boolean,
        default: false
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',_vm._g({staticClass:"md-button",class:[
    _vm.type,
    _vm.inactive ? 'inactive' : 'active',
    _vm.inline ? 'inline' : 'block',
    _vm.round ? 'round' : '',
    _vm.plain ? 'plain' : '',
    _vm.size === 'small' ? 'small' : ''
  ],attrs:{"type":_vm.nativeType,"disabled":_vm.inactive || _vm.type === 'disabled'}},_vm.$listeners),[_c('div',{staticClass:"md-button-inner"},[(_vm.icon)?[_c('md-icon',{attrs:{"name":_vm.icon,"svg":_vm.iconSvg}})]:_vm._e(),_vm._v(" "),_c('p',{staticClass:"md-button-content"},[_vm._t("default")],2)],2)])}
__vue__options__.staticRenderFns = []
