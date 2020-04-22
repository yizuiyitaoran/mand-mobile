;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../activity-indicator/roller', '../_util', '../_util/animate', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../activity-indicator/roller'), require('../_util'), require('../_util/animate'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.roller, global._util, global.animate, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _roller, _util, _animate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _roller2 = _interopRequireDefault(_roller);

  var _animate2 = _interopRequireDefault(_animate);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  exports.default = {
    name: 'md-progress',

    components: _defineProperty({}, _roller2.default.name, _roller2.default),

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
          if (!_util.inBrowser && !this.isMounted || !this.transition) {
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

        _animate2.default.start(step, verify, _util.noop, this.duration);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-activity-indicator-rolling',{staticClass:"md-progress",attrs:{"process":_vm.formatValue,"size":_vm.size,"width":_vm.width,"color":_vm.color,"border-color":_vm.borderColor,"fill":_vm.fill,"linecap":_vm.linecap,"rotate":_vm.rotate}},[_vm._t("default"),_vm._v(" "),_c('template',{slot:"defs"},[_vm._t("defs")],2)],2)}
__vue__options__.staticRenderFns = []
