;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Icon from '../icon';
export default {
  name: 'md-cashier-channel-item',

  components: _defineProperty({}, Icon.name, Icon),

  props: {
    data: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-cashier-channel-item"},[(_vm.data.icon)?_c('div',{staticClass:"item-icon",class:_vm.data.icon},[_c('md-icon',{attrs:{"name":_vm.data.icon,"size":"lg"}})],1):(_vm.data.img)?_c('div',{staticClass:"item-image"},[_c('img',{attrs:{"src":_vm.data.img}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"item-label"},[_c('p',{staticClass:"title"},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.data.text || _vm.data)}}),_vm._v(" "),(_vm.data.action)?_c('span',{staticClass:"title-active",domProps:{"innerHTML":_vm._s(_vm.data.action.text)},on:{"click":function($event){$event.stopPropagation();return _vm.data.action.handler($event)}}}):_vm._e()]),_vm._v(" "),(_vm.data.desc)?_c('p',{staticClass:"desc",domProps:{"innerHTML":_vm._s(_vm.data.desc)}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"item-check-icon"},[(_vm.data.disabled)?_c('md-icon',{attrs:{"name":"check-disabled"}}):(_vm.active)?_c('md-icon',{attrs:{"name":"checked"}}):_c('md-icon',{attrs:{"name":"check"}})],1)])}
__vue__options__.staticRenderFns = []
