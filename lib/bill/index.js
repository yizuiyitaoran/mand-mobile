;(function(){
var _components;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import FieldItem from '../field-item';
import WaterMark from '../water-mark';

export default {
  name: 'md-bill',

  components: (_components = {}, _defineProperty(_components, FieldItem.name, FieldItem), _defineProperty(_components, WaterMark.name, WaterMark), _components),

  props: {
    title: {
      type: String,
      default: ''
    },
    no: {
      type: [String, Number],
      default: ''
    },
    waterMark: {
      type: String,
      default: ''
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-water-mark',{staticClass:"md-bill",attrs:{"content":_vm.waterMark},scopedSlots:_vm._u([{key:"watermark",fn:function(props){return (!!_vm.$scopedSlots.watermark)?[_vm._t("watermark",null,{"coord":props.coord})]:undefined}}],null,true)},[_c('header',{staticClass:"md-bill-header"},[(!_vm.$slots.header)?[(_vm.title)?_c('h4',{staticClass:"md-bill-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.no)?_c('div',{staticClass:"md-bill-no"},[_vm._v("NO."+_vm._s(_vm.no))]):_vm._e()]:[_vm._t("header")]],2),_vm._v(" "),_c('div',{staticClass:"md-bill-neck"},[_c('span')]),_vm._v(" "),_c('div',{staticClass:"md-bill-content"},[_c('div',{staticClass:"md-bill-detail"},[_vm._t("default")],2),_vm._v(" "),(_vm.$slots.footer)?_c('footer',{staticClass:"md-bill-footer"},[_vm._t("footer")],2):_vm._e()])])}
__vue__options__.staticRenderFns = []
