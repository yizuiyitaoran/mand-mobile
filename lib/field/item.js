;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_util', '../_style/global.css', './style/item.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_util'), require('../_style/global.css'), require('./style/item.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global._util, global.global, global.item);
    global.item = mod.exports;
  }
})(this, function (exports, _icon, _util) {
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
    name: 'md-field-item',

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    inject: {
      rootField: {
        from: 'rootField',
        default: function _default() {
          return {};
        }
      }
    },

    props: {
      title: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      addon: {
        type: String,
        default: ''
      },
      arrow: {
        type: [Boolean, String],
        default: false
      },
      solid: {
        type: Boolean,
        default: false
      },
      alignRight: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      inputEnv: function inputEnv() {
        if (_util.isIOS) {
          return 'is-ios';
        } else if (_util.isAndroid) {
          return 'is-android';
        } else {
          return 'is-browser';
        }
      },
      currentDisabled: function currentDisabled() {
        return this.rootField.disabled || this.disabled;
      }
    },

    methods: {
      $_onClick: function $_onClick(e) {
        if (!this.currentDisabled) {
          this.$emit('click', e);
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-field-item",class:[
    _vm.solid ? 'is-solid' : '',
    _vm.currentDisabled ? 'is-disabled' : '',
    _vm.alignRight ? 'is-align-right' : '',
    _vm.inputEnv
  ],on:{"click":_vm.$_onClick}},[_c('div',{staticClass:"md-field-item-content"},[(_vm.title)?_c('label',{staticClass:"md-field-item-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.$slots.left)?_c('div',{staticClass:"md-field-item-left"},[_vm._t("left")],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"md-field-item-control"},[_vm._t("default",[(_vm.content)?[_vm._v(_vm._s(_vm.content))]:(_vm.placeholder)?_c('div',{staticClass:"md-field-item-placeholder",domProps:{"textContent":_vm._s(_vm.placeholder)}}):_vm._e()])],2),_vm._v(" "),(_vm.arrow || _vm.addon || _vm.$slots.right)?_c('div',{staticClass:"md-field-item-right"},[_vm._t("right",[_vm._v(_vm._s(_vm.addon))]),_vm._v(" "),(_vm.arrow)?_c('md-icon',{attrs:{"name":_vm.arrow === true ? 'arrow-right' : _vm.arrow,"size":"md"}}):_vm._e()],2):_vm._e()]),_vm._v(" "),(_vm.$slots.children)?_c('div',{staticClass:"md-field-item-children"},[_vm._t("children")],2):_vm._e()])}
__vue__options__.staticRenderFns = []
