;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../tag', '../icon', '../_style/global.css', './style/box.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../tag'), require('../icon'), require('../_style/global.css'), require('./style/box.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tag, global.icon, global.global, global.box);
    global.box = mod.exports;
  }
})(this, function (exports, _tag, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _tag2 = _interopRequireDefault(_tag);

  var _icon2 = _interopRequireDefault(_icon);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _components;

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
    name: 'md-check-base-box',

    components: (_components = {}, _defineProperty(_components, _tag2.default.name, _tag2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _components),

    props: {
      label: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-check-base-box",class:{
    'is-disabled': _vm.disabled,
    'is-checked': _vm.isChecked
  }},[_vm._t("default"),_vm._v(" "),(_vm.isChecked)?_c('md-tag',{attrs:{"size":"tiny","shape":"quarter","type":"fill"}},[_c('md-icon',{attrs:{"name":"right"}})],1):_vm._e()],2)}
__vue__options__.staticRenderFns = []
