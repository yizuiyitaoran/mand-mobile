;(function(){
var _components;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Popup from '../popup';
import Icon from '../icon';

export default {
  name: 'md-landscape',

  components: (_components = {}, _defineProperty(_components, Popup.name, Popup), _defineProperty(_components, Icon.name, Icon), _components),

  props: {
    value: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Boolean,
      default: false
    },
    fullScreen: {
      type: Boolean,
      default: false
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
      default: function _default() {
        return this.fullScreen ? 'md-fade' : 'md-punch';
      }
    }
  },

  data: function data() {
    return {
      isLandscapeShow: this.value
    };
  },


  watch: {
    value: function value(val) {
      this.isLandscapeShow = val;
    }
  },

  methods: {
    $_close: function $_close() {
      this.isLandscapeShow = false;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-landscape",class:{'is-full': _vm.fullScreen}},[_c('md-popup',{attrs:{"mask-closable":_vm.maskClosable,"prevent-scroll":"","prevent-scroll-exclude":".md-landscape-content","has-mask":!_vm.fullScreen && _vm.hasMask,"transition":_vm.transition},on:{"input":function($event){return _vm.$emit('input', false)},"show":function($event){return _vm.$emit('show')},"hide":function($event){return _vm.$emit('hide')}},model:{value:(_vm.isLandscapeShow),callback:function ($$v) {_vm.isLandscapeShow=$$v},expression:"isLandscapeShow"}},[_c('div',{staticClass:"md-landscape-body",class:{scroll: _vm.scroll}},[_c('div',{staticClass:"md-landscape-content"},[_vm._t("default")],2),_vm._v(" "),_c('md-icon',{staticClass:"md-landscape-close",class:{dark: !_vm.hasMask || _vm.fullScreen},attrs:{"name":_vm.fullScreen ? 'clear' : 'close'},on:{"click":_vm.$_close}})],1)])],1)}
__vue__options__.staticRenderFns = []
