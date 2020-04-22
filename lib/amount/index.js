;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util', '../_util/animate', '../_util/formate-value', './number-capital', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util'), require('../_util/animate'), require('../_util/formate-value'), require('./number-capital'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._util, global.animate, global.formateValue, global.numberCapital, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _util, _animate, _formateValue, _numberCapital) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _animate2 = _interopRequireDefault(_animate);

  var _numberCapital2 = _interopRequireDefault(_numberCapital);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    name: 'md-amount',

    filters: {
      doPrecision: function doPrecision(value, precision, isRoundUp) {
        var exponentialForm = Number(value + 'e' + precision);
        var rounded = isRoundUp ? Math.round(exponentialForm) : Math.floor(exponentialForm);
        return Number(rounded + 'e-' + precision).toFixed(precision);
      },
      doFormat: function doFormat(value, hasSeparator, separator) {
        if (!hasSeparator) {
          return value;
        }

        var numberParts = value.split('.');
        var integerValue = numberParts[0];
        var decimalValue = numberParts[1] || '';

        var sign = '';
        if (integerValue.startsWith('-')) {
          integerValue = integerValue.substring(1);
          sign = '-';
        }

        var formateValue = (0, _formateValue.formatValueByGapStep)(3, integerValue, separator, 'right', 0, 1);
        return decimalValue ? '' + sign + formateValue.value + '.' + decimalValue : '' + sign + formateValue.value;
      },
      doCapital: function doCapital(value) {
        return (0, _numberCapital2.default)(value);
      }
    },

    props: {
      value: {
        type: Number,
        default: 0
      },
      precision: {
        type: Number,
        default: 2
      },
      isRoundUp: {
        type: Boolean,
        default: true
      },
      hasSeparator: {
        type: Boolean,
        default: false
      },
      separator: {
        type: String,
        default: ','
      },
      isAnimated: {
        type: Boolean,
        default: false
      },
      transition: {
        type: Boolean,
        default: false
      },
      isCapital: {
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
          if (!_util.inBrowser && !this.isMounted) {
            this.formatValue = val;
            return;
          }
          if (this.isAnimated || this.transition) {
            this.$_doAnimateDisplay(oldVal, val);
          } else {
            this.formatValue = val;
          }
        },

        immediate: true
      }
    },

    computed: {
      legalPrecision: function legalPrecision() {
        return this.precision > 0 ? this.precision : 0;
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
          if (percent === 1) {
            _this.formatValue = toValue;
            return;
          }
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
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"md-amount",class:{numerical: !_vm.isCapital}},[(!_vm.isCapital)?[_vm._v(_vm._s(_vm._f("doFormat")(_vm._f("doPrecision")(_vm.formatValue,_vm.legalPrecision, _vm.isRoundUp),_vm.hasSeparator, _vm.separator)))]:[_vm._v(" "+_vm._s(_vm._f("doCapital")(_vm._f("doPrecision")(_vm.formatValue,4, _vm.isRoundUp)))+" ")]],2)}
__vue__options__.staticRenderFns = []
