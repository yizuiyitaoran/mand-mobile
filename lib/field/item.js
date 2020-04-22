;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Icon from '../icon';
import { isIOS, isAndroid } from '../_util';

export default {
  name: 'md-field-item',

  components: _defineProperty({}, Icon.name, Icon),

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
      if (isIOS) {
        return 'is-ios';
      } else if (isAndroid) {
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
