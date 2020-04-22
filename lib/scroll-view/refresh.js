;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Roller from '../activity-indicator/roller';

export default {
  name: 'md-scroll-view-refresh',

  components: _defineProperty({}, Roller.name, Roller),

  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
    isRefreshing: {
      type: Boolean,
      default: false
    },
    isRefreshActive: {
      type: Boolean,
      default: false
    },
    refreshText: {
      type: String,
      default: '下拉刷新'
    },
    refreshActiveText: {
      type: String,
      default: '释放刷新'
    },
    refreshingText: {
      type: String,
      default: '刷新中...'
    },
    rollerColor: {
      type: String,
      default: '#2F86F6'
    }
  },

  computed: {
    process: function process() {
      if (!this.$el || !this.scrollTop) {
        return +this.scrollTop;
      }

      var refreshHeight = this.$el.clientHeight;

      if (Math.abs(this.scrollTop) < refreshHeight / 2) {
        return 0;
      }

      return (Math.abs(this.scrollTop) - refreshHeight / 2) / (refreshHeight / 2);
    },
    refreshTip: function refreshTip() {
      if (this.isRefreshing) {
        return this.refreshingText;
      } else if (this.isRefreshActive) {
        return this.refreshActiveText;
      } else {
        return this.refreshText;
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-scroll-view-refresh"},[_c('md-activity-indicator-rolling',{attrs:{"process":!_vm.isRefreshing ? _vm.process : undefined,"width":10,"color":_vm.rollerColor}}),_vm._v(" "),_c('p',{staticClass:"refresh-tip"},[_vm._v(_vm._s(_vm.refreshTip))])],1)}
__vue__options__.staticRenderFns = []
