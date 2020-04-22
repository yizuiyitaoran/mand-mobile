;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Button from '../button';

export default {
  name: 'md-result-page',

  components: _defineProperty({}, Button.name, Button),

  props: {
    type: {
      type: String,
      default: 'empty'
    },
    imgUrl: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    subtext: {
      type: String,
      default: ''
    },
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },

  computed: {
    actualImgUrl: function actualImgUrl() {
      var pre = '//manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.1/';
      return this.imgUrl || '' + pre + this.type + '.png';
    },
    actualText: function actualText() {
      return this.text || {
        network: '\u7F51\u7EDC\u8FDE\u63A5\u5F02\u5E38',

        empty: '\u6682\u65E0\u4FE1\u606F'
      }[this.type] || '';
    },
    actualSubText: function actualSubText() {
      return this.subtext || {
        lost: '\u60A8\u8981\u8BBF\u95EE\u7684\u9875\u9762\u5DF2\u4E22\u5931'
      }[this.type] || '';
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-result"},[_c('div',{staticClass:"md-result-image"},[_c('img',{class:!_vm.imgUrl && _vm.type,attrs:{"src":_vm.actualImgUrl}})]),_vm._v(" "),(_vm.actualText)?_c('div',{staticClass:"md-result-text"},[_vm._v(_vm._s(_vm.actualText))]):_vm._e(),_vm._v(" "),(_vm.actualSubText)?_c('div',{staticClass:"md-result-subtext"},[_vm._v(_vm._s(_vm.actualSubText))]):_vm._e(),_vm._v(" "),(_vm.buttons.length)?_c('div',{staticClass:"md-result-buttons"},_vm._l((_vm.buttons),function(button,index){return _c('md-button',{key:index,attrs:{"type":button.type,"plain":button.plain === undefined || button.plain,"round":button.round,"inactive":button.inactive,"loading":button.loading,"icon":button.icon,"icon-svg":button.iconSvg,"size":"small","inline":""},on:{"click":button.handler}},[_vm._v("\n      "+_vm._s(button.text)+"\n    ")])}),1):_vm._e()])}
__vue__options__.staticRenderFns = []
