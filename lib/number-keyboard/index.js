;(function(){
var _components;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Popup from '../popup';
import Keyborad from './board';

export default {
  name: 'md-number-keyboard',

  components: (_components = {}, _defineProperty(_components, Popup.name, Popup), _defineProperty(_components, Keyborad.name, Keyborad), _components),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    isView: {
      type: Boolean,
      default: false
    },
    hideDot: {
      type: Boolean
    },
    disorder: {
      type: Boolean
    },
    isHideConfirm: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String
    },
    textRender: {
      type: Function
    }
  },

  data: function data() {
    return {
      isKeyboardShow: false
    };
  },


  watch: {
    value: function value(val) {
      this.isKeyboardShow = val;
    },
    isKeyboardShow: function isKeyboardShow(val) {
      this.$emit('input', val);
    }
  },

  mounted: function mounted() {
    this.value && (this.isKeyboardShow = this.value);
  },


  methods: {
    $_onEnter: function $_onEnter(val) {
      this.$emit('enter', val);
    },
    $_onDelete: function $_onDelete() {
      this.$emit('delete');
    },
    $_onConfirm: function $_onConfirm() {
      this.$emit('confirm');
      this.isHideConfirm && this.hide();
    },
    show: function show() {
      this.isKeyboardShow = true;
    },
    hide: function hide() {
      this.isKeyboardShow = false;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-number-keyboard",class:{'in-view': _vm.isView}},[(_vm.isView)?[(_vm.$slots.default)?_c('div',{staticClass:"md-number-keyboard-slot"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('md-number-keyboard-container',{ref:"keyborad",attrs:{"type":_vm.type,"disorder":_vm.disorder,"ok-text":_vm.okText,"is-view":_vm.isView,"hide-dot":_vm.hideDot,"text-render":_vm.textRender},on:{"enter":_vm.$_onEnter,"delete":_vm.$_onDelete,"confirm":_vm.$_onConfirm,"hide":function($event){_vm.isKeyboardShow = false}}})]:[_c('md-popup',{ref:"popup",attrs:{"position":"bottom","has-mask":false},on:{"show":function($event){return _vm.$emit('show')},"hide":function($event){return _vm.$emit('hide')}},model:{value:(_vm.isKeyboardShow),callback:function ($$v) {_vm.isKeyboardShow=$$v},expression:"isKeyboardShow"}},[(_vm.$slots.default)?_c('div',{staticClass:"md-number-keyboard-slot"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('md-number-keyboard-container',{ref:"keyborad",attrs:{"type":_vm.type,"disorder":_vm.disorder,"ok-text":_vm.okText,"is-view":_vm.isView,"hide-dot":_vm.hideDot,"text-render":_vm.textRender},on:{"enter":_vm.$_onEnter,"delete":_vm.$_onDelete,"confirm":_vm.$_onConfirm,"hide":function($event){_vm.isKeyboardShow = false}},nativeOn:{"touchmove":function($event){$event.preventDefault();}}})],1)]],2)}
__vue__options__.staticRenderFns = []
