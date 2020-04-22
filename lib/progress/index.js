;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Roller from '../activity-indicator/roller';
import { noop, inBrowser } from '../_util';
import Animate from '../_util/animate';

export default {
  name: 'md-progress',

  components: _defineProperty({}, Roller.name, Roller),

  props: {
    size: {
      type: Number,
      default: 70
    },
    width: {
      type: Number
    },
    color: {
      type: String,
      default: '#2F86F6'
    },
    borderColor: {
      type: String,
      default: 'rgba(0, 0, 0, .1)'
    },
    fill: {
      type: String,
      default: 'transparent'
    },
    linecap: {
      type: String,
      default: 'round'
    },
    rotate: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    transition: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 1000
    }
  },

  data: function data() {
    return {
      formatValue: 0,
      isMounted: false
    };
  },


  watch: {
    value: {
      handler: function handler(val, oldVal) {
        if (!inBrowser && !this.isMounted || !this.transition) {
          this.formatValue = val;
          return;
        }

        this.$_doAnimateDisplay(oldVal, val);
      },

      immediate: true
    }
  },

  mounted: function mounted() {
    this.isMounted = true;
  },


  methods: {
    $_doAnimateDisplay: function $_doAnimateDisplay() {
      var _this = this;

      var fromValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var step = function step(percent) {
        _this.formatValue = fromValue + (toValue - fromValue) * percent;
      };

      var verify = function verify(id) {
        return id;
      };

      Animate.start(step, verify, noop, this.duration);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-activity-indicator-rolling',{staticClass:"md-progress",attrs:{"process":_vm.formatValue,"size":_vm.size,"width":_vm.width,"color":_vm.color,"border-color":_vm.borderColor,"fill":_vm.fill,"linecap":_vm.linecap,"rotate":_vm.rotate}},[_vm._t("default"),_vm._v(" "),_c('template',{slot:"defs"},[_vm._t("defs")],2)],2)}
__vue__options__.staticRenderFns = []
