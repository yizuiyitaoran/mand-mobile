;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Button from '../button';
import { isEmptyObject } from '../_util';

export default {
  name: 'md-action-bar',

  components: _defineProperty({}, Button.name, Button),

  props: {
    actions: {
      type: Array,
      default: []
    }
  },

  computed: {
    coerceActions: function coerceActions() {
      return this.actions.slice(0, 2);
    },
    hasSlots: function hasSlots() {
      return !isEmptyObject(this.$slots);
    }
  },

  methods: {
    $_onBtnClick: function $_onBtnClick(event, action) {
      action.onClick && action.onClick(event, action);
      this.$emit('click', event, action);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-action-bar"},[_c('div',{staticClass:"md-action-bar-container"},[(_vm.hasSlots)?_c('div',{staticClass:"md-action-bar-text"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"md-action-bar-group"},[_vm._l((_vm.coerceActions),function(item,index){return [_c('md-button',{key:index,staticClass:"md-action-bar-button",attrs:{"type":item.type || (!!item.disabled ? 'disabled' : 'primary'),"plain":item.plain || (index !== _vm.coerceActions.length - 1),"round":item.round,"inactive":item.inactive,"loading":item.loading,"icon":item.icon,"icon-svg":item.iconSvg},on:{"click":function($event){return _vm.$_onBtnClick($event, item)}}},[_vm._v("\n          "+_vm._s(item.text)+"\n        ")])]})],2)])])}
__vue__options__.staticRenderFns = []
