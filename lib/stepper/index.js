;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function getDecimalNum(num) {
    try {
      return num.toString().split('.')[1].length;
    } catch (e) {
      return 0;
    }
  }

  function accAdd(num1, num2) {
    var r1 = getDecimalNum(num1);
    var r2 = getDecimalNum(num2);
    var m = Math.pow(10, Math.max(r1, r2));
    return +((num1 * m + num2 * m) / m);
  }

  function subtr(num1, num2) {
    var r1 = getDecimalNum(num1);
    var r2 = getDecimalNum(num2);
    var m = Math.pow(10, Math.max(r1, r2));
    var n = r1 >= r2 ? r1 : r2;
    return +((num1 * m - num2 * m) / m).toFixed(n);
  }

  exports.default = {
    name: 'md-stepper',

    components: {},

    props: {
      defaultValue: {
        type: [Number, String],
        default: 0
      },
      value: {
        type: [Number, String],
        default: 0
      },
      step: {
        type: [Number, String],
        default: 1
      },
      min: {
        type: [Number, String],
        default: -Number.MAX_VALUE
      },
      max: {
        type: [Number, String],
        default: Number.MAX_VALUE
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      isInteger: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        isMin: false,
        isMax: false,
        isEditing: false,
        currentNum: 0
      };
    },


    computed: {
      contentLength: function contentLength() {
        if (!this.value) {
          return 2;
        }
        var length = this.value.toString().length;
        return length > 2 ? length : 2;
      }
    },

    watch: {
      defaultValue: function defaultValue(val) {
        this.currentNum = this.$_getCurrentNum(val);
      },
      value: function value(val) {
        if (this.isEditing) {
          return;
        }
        this.currentNum = this.$_getCurrentNum(val);
      },
      min: function min(val) {
        if (this.currentNum < val) {
          this.currentNum = val;
        }
        this.$_checkStatus();
      },
      max: function max(val) {
        if (this.currentNum > val) {
          this.currentNum = val;
        }
        this.$_checkStatus();
      },
      currentNum: function currentNum(val, oldVal) {
        this.$_checkStatus();

        if (val !== this.value) {
          this.$emit('input', val);
          this.$emit('change', val);
        }

        var diff = val - oldVal;

        if (diff > 0) {
          this.$emit('increase', diff);
        } else if (diff < 0) {
          this.$emit('decrease', Math.abs(diff));
        }
      }
    },

    mounted: function mounted() {
      this.$_checkMinMax();
      this.currentNum = this.$_getCurrentNum(this.value || this.defaultValue);
      this.$_checkStatus();
    },


    methods: {
      $_reduce: function $_reduce() {
        if (this.disabled || this.isMin) {
          return;
        }
        this.currentNum = subtr(this.currentNum, this.step);
        this.$_onChange();
      },
      $_add: function $_add() {
        if (this.disabled || this.isMax) {
          return;
        }
        this.currentNum = accAdd(this.currentNum, this.step);
        this.$_onChange();
      },
      $_formatNum: function $_formatNum(value) {
        value = String(value).replace(/[^0-9.-]/g, '');
        return value === '' ? 0 : this.isInteger ? Math.floor(value) : +value;
      },
      $_getCurrentNum: function $_getCurrentNum(value) {
        return Math.max(Math.min(this.max, this.$_formatNum(value)), this.min);
      },
      $_checkStatus: function $_checkStatus() {
        this.isMin = this.currentNum <= this.min;
        this.isMax = this.currentNum >= this.max;
      },
      $_checkMinMax: function $_checkMinMax() {
        if (this.min > this.max) {
          (0, _util.warn)('[md-vue-stepper] minNum is larger than maxNum');
        }
        return this.max > this.min;
      },
      $_onInput: function $_onInput(event) {
        var value = event.target.value;

        var formatted = this.$_formatNum(value);
        if (+value !== formatted) {
          event.target.value = formatted;
        }
        this.currentNum = formatted;
      },
      $_onFocus: function $_onFocus() {
        this.isEditing = true;
      },
      $_onChange: function $_onChange() {
        this.isEditing = false;
        this.currentNum = this.$_getCurrentNum(this.currentNum);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-stepper",class:{'disabled': _vm.disabled}},[_c('div',{staticClass:"md-stepper-button md-stepper-button-reduce",class:{'disabled': _vm.isMin},on:{"click":_vm.$_reduce}}),_vm._v(" "),_c('div',{staticClass:"md-stepper-number"},[_c('input',{attrs:{"type":"tel","size":_vm.contentLength,"readOnly":_vm.readOnly},domProps:{"value":_vm.currentNum},on:{"input":_vm.$_onInput,"focus":_vm.$_onFocus,"blur":_vm.$_onChange}})]),_vm._v(" "),_c('div',{staticClass:"md-stepper-button md-stepper-button-add",class:{'disabled': _vm.isMax},on:{"click":_vm.$_add}})])}
__vue__options__.staticRenderFns = []
