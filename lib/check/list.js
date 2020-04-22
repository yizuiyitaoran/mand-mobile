;(function(){
var _components;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Check from './index';
import CheckGroup from './group';
import CellItem from '../cell-item';
import checkMixin from './mixin';

export default {
  name: 'md-check-list',

  mixins: [checkMixin],

  components: (_components = {}, _defineProperty(_components, Check.name, Check), _defineProperty(_components, CheckGroup.name, CheckGroup), _defineProperty(_components, CellItem.name, CellItem), _components),

  props: {
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    isSlotScope: {
      type: Boolean,
      default: undefined
    }
  },

  computed: {
    hasSlot: function hasSlot() {
      return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default;
    }
  },

  methods: {
    $_check: function $_check(option) {
      this.$refs.group.toggle(option.value);
    },
    $_onInput: function $_onInput(value) {
      this.$emit('input', value);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-check-group',{ref:"group",staticClass:"md-check-list",class:{ 'is-align-center': _vm.alignCenter },attrs:{"value":_vm.value},on:{"input":_vm.$_onInput}},_vm._l((_vm.options),function(item,index){return _c('md-cell-item',{key:index,staticClass:"md-check-item",class:{
      'is-checked': _vm.value.indexOf(item.value) !== -1,
    },attrs:{"title":_vm.hasSlot ? '' : (item.text || item.label),"brief":_vm.hasSlot ? '' : item.brief,"disabled":item.disabled},on:{"click":function($event){return _vm.$_check(item, index)}}},[(_vm.hasSlot)?[_vm._t("default",null,{"option":item,"index":index,"selected":_vm.value.indexOf(item.value) > -1})]:_vm._e(),_vm._v(" "),(!_vm.alignCenter)?_c('md-check',{attrs:{"slot":_vm.iconPosition === 'right' ? 'right' : 'left',"name":item.value,"disabled":item.disabled,"size":_vm.iconSize,"icon":_vm.icon,"icon-inverse":_vm.iconInverse,"icon-disabled":_vm.iconDisabled,"icon-svg":_vm.iconSvg},slot:_vm.iconPosition === 'right' ? 'right' : 'left'}):_vm._e()],2)}),1)}
__vue__options__.staticRenderFns = []
