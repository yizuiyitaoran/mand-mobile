;(function(){


import loadSprite from './load-spirte';
import defaultSvg from './default-svg-list';

export default {
  name: 'md-icon',

  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md'
    },
    color: {
      type: String,
      default: ''
    },
    svg: {
      type: Boolean,
      default: false
    }
  },

  mounted: function mounted() {
    loadSprite();
  },


  computed: {
    isInnerSvg: function isInnerSvg() {
      return !!defaultSvg[this.name];
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.svg || _vm.isInnerSvg)?_c('svg',{staticClass:"md-icon icon-svg",class:[("md-icon-" + _vm.name), _vm.size],style:({fill: _vm.color}),on:{"click":function($event){return _vm.$emit('click', $event)}}},[_c('use',{attrs:{"xlink:href":("#" + _vm.name)}})]):(_vm.name)?_c('i',{staticClass:"md-icon icon-font",class:[("md-icon-" + _vm.name), _vm.name, _vm.size],style:({color: _vm.color}),on:{"click":function($event){return _vm.$emit('click', $event)}}}):_vm._e()}
__vue__options__.staticRenderFns = []
