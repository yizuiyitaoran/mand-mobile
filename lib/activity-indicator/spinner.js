;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Icon from '../icon';

export default {
  name: 'md-activity-indicator-spinning',

  components: _defineProperty({}, Icon.name, Icon),

  props: {
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: 'dark',
      validator: function validator(val) {
        return val === 'dark' || val === 'light';
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-activity-indicator-spinning",class:{dark: _vm.color === 'dark'}},[_c('md-icon',{staticClass:"md-activity-indicator-svg",style:({width: (_vm.size + "px"), height: (_vm.size + "px")}),attrs:{"name":"spinner"}})],1)}
__vue__options__.staticRenderFns = []
