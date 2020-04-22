;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Icon from '../icon';

export default {
  name: 'md-cell-item',

  components: _defineProperty({}, Icon.name, Icon),

  props: {
    title: {
      type: String,
      default: ''
    },
    brief: {
      type: String,
      default: ''
    },
    addon: {
      type: String,
      default: ''
    },
    arrow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    $_onClick: function $_onClick(e) {
      if (!this.disabled) {
        this.$emit('click', e);
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-cell-item",class:{
    'is-disabled': _vm.disabled,
    'no-border': _vm.noBorder,
  },on:{"click":_vm.$_onClick}},[_c('div',{staticClass:"md-cell-item-body",class:{multilines: !!_vm.brief}},[(_vm.$slots.left)?_c('div',{staticClass:"md-cell-item-left"},[_vm._t("left")],2):_vm._e(),_vm._v(" "),(_vm.title || _vm.brief || _vm.$slots.default)?_c('div',{staticClass:"md-cell-item-content"},[(_vm.title)?_c('p',{staticClass:"md-cell-item-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.brief)?_c('p',{staticClass:"md-cell-item-brief",domProps:{"textContent":_vm._s(_vm.brief)}}):_vm._e(),_vm._v(" "),_vm._t("default")],2):_vm._e(),_vm._v(" "),(_vm.arrow || _vm.addon || _vm.$slots.right)?_c('div',{staticClass:"md-cell-item-right"},[_vm._t("right",[_vm._v("\n        "+_vm._s(_vm.addon)+"\n      ")]),_vm._v(" "),(_vm.arrow)?_c('md-icon',{attrs:{"name":"arrow-right","size":"md"}}):_vm._e()],2):_vm._e()]),_vm._v(" "),(_vm.$slots.children)?_c('div',{staticClass:"md-cell-item-children"},[_vm._t("children")],2):_vm._e()])}
__vue__options__.staticRenderFns = []
