;(function(){
var _components;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Popup from '../popup';
import Icon from '../icon';
import ActivityIndicatorRolling from '../activity-indicator/roller';
import { mdDocument } from '../_util';

export default {
  name: 'md-dialog',

  components: (_components = {}, _defineProperty(_components, Popup.name, Popup), _defineProperty(_components, Icon.name, Icon), _defineProperty(_components, ActivityIndicatorRolling.name, ActivityIndicatorRolling), _components),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconSvg: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    },
    btns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    layout: {
      type: String,
      default: 'row'
    },
    appendTo: {
      default: function _default() {
        return mdDocument.body;
      }
    },
    hasMask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'md-fade'
    },
    preventScroll: {
      type: Boolean,
      default: false
    },
    preventScrollExclude: {
      type: String,
      default: ''
    }
  },

  mounted: function mounted() {
    if (this.appendTo) {
      this.appendTo.appendChild(this.$el);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.appendTo) {
      this.appendTo.removeChild(this.$el);
    }
  },


  methods: {
    $_onInput: function $_onInput(val) {
      this.$emit('input', val);
    },
    $_onShow: function $_onShow() {
      this.$emit('show');
    },
    $_onHide: function $_onHide() {
      this.$emit('hide');
    },
    $_onClick: function $_onClick(btn) {
      if (btn.disabled || btn.loading) {
        return;
      }
      if (typeof btn.handler === 'function') {
        btn.handler.call(null, btn);
      } else {
        this.close();
      }
    },
    close: function close() {
      this.$emit('input', false);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-dialog"},[_c('md-popup',{attrs:{"value":_vm.value,"hasMask":_vm.hasMask,"maskClosable":_vm.maskClosable,"position":"center","transition":_vm.transition,"preventScroll":_vm.preventScroll,"preventScrollExclude":_vm.preventScrollExclude},on:{"input":_vm.$_onInput,"show":_vm.$_onShow,"hide":_vm.$_onHide}},[_c('div',{staticClass:"md-dialog-content"},[_vm._t("header"),_vm._v(" "),_c('div',{staticClass:"md-dialog-body"},[(_vm.closable)?_c('a',{staticClass:"md-dialog-close",attrs:{"role":"button"},on:{"click":_vm.close}},[_c('md-icon',{attrs:{"name":"close"}})],1):_vm._e(),_vm._v(" "),(_vm.icon)?_c('div',{staticClass:"md-dialog-icon"},[_c('md-icon',{attrs:{"name":_vm.icon,"svg":_vm.iconSvg}})],1):_vm._e(),_vm._v(" "),(_vm.title)?_c('h2',{staticClass:"md-dialog-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),_vm._t("default",[_c('div',{staticClass:"md-dialog-text",domProps:{"innerHTML":_vm._s(_vm.content)}})])],2),_vm._v(" "),_c('footer',{staticClass:"md-dialog-actions",class:{ 'is-column': _vm.layout === 'column' }},[_vm._l((_vm.btns),function(btn,index){return [_c('a',{key:index,staticClass:"md-dialog-btn",class:{
              disabled: !!btn.disabled,
              warning: !btn.disabled && !!btn.warning
            },attrs:{"role":"button"},on:{"click":function($event){return _vm.$_onClick(btn)},"touchmove":function($event){$event.preventDefault();}}},[(btn.loading)?_c('md-activity-indicator-rolling',{staticClass:"md-dialog-btn-loading"}):(btn.icon)?_c('md-icon',{staticClass:"md-dialog-btn-icon",attrs:{"name":btn.icon,"svg":btn.iconSvg,"size":"md"}}):_vm._e(),_vm._v("\n            "+_vm._s(btn.text)+"\n          ")],1)]})],2)],2)])],1)}
__vue__options__.staticRenderFns = []
