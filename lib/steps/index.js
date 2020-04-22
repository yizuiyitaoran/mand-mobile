;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _icon, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _icon2 = _interopRequireDefault(_icon);

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
    name: 'md-steps',

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      steps: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      current: {
        type: Number,
        default: 0,
        validator: function validator(val) {
          return val >= 0;
        }
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      transition: {
        type: Boolean,
        default: false
      },
      verticalAdaptive: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        initialed: false,
        progress: [],
        stepsSize: [],
        currentLength: 0,
        duration: 0.3,
        timer: null
      };
    },


    computed: {
      $_barInnerStyle: function $_barInnerStyle() {
        var _this = this;

        return function (index) {
          var progress = _this.progress;

          var transform = _this.direction === 'horizontal' ? '(' + (progress[index]['len'] - 1) * 100 + '%, 0, 0)' : '(0, ' + (progress[index]['len'] - 1) * 100 + '%, 0)';
          return {
            transform: 'translate3d' + transform,
            transition: 'all ' + progress[index]['time'] + 's linear'
          };
        };
      }
    },

    watch: {
      current: function current(val, oldVal) {
        var _this2 = this;

        var currentStep = this.$_formatValue(val);
        var newProgress = this.$_sliceProgress(currentStep);
        if (this.transition) {
          var isAdd = currentStep >= oldVal;
          this.timer && clearTimeout(this.timer);
          this.timer = setTimeout(function () {
            _this2.$_doTransition(newProgress, isAdd, function (len) {
              if (isAdd && len > _this2.currentLength || !isAdd && len < _this2.currentLength) {
                _this2.currentLength = len;
              }
            });
          }, 100);
        } else {
          this.progress = newProgress;
          this.currentLength = currentStep;
        }
      }
    },

    created: function created() {
      var currentStep = this.$_formatValue(this.current);
      this.currentLength = currentStep;
      this.progress = this.$_sliceProgress(currentStep);
    },
    mounted: function mounted() {
      this.$_initStepSize();
    },
    updated: function updated() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.$_initStepSize();
      });
    },


    methods: {
      $_initStepSize: function $_initStepSize() {
        if (this.direction !== 'vertical' || this.verticalAdaptive) {
          return;
        }
        var iconWrappers = this.$el.querySelectorAll('.icon-wrapper');
        var textWrappers = this.$el.querySelectorAll('.text-wrapper');
        var stepsSize = (0, _util.toArray)(textWrappers).map(function (wrapper, index) {
          var stepHeight = wrapper.clientHeight;
          var iconHeight = iconWrappers[index].clientHeight;
          if (index === textWrappers.length - 1) {
            stepHeight -= iconHeight;
          } else {
            stepHeight += 40;
          }
          return stepHeight > 0 ? stepHeight : 0;
        });

        if (stepsSize.toString() !== this.stepsSize.toString()) {
          this.stepsSize = stepsSize;
        }
      },
      $_getStepSizeForStyle: function $_getStepSizeForStyle(index) {
        var size = this.direction === 'vertical' && !this.verticalAdaptive ? this.stepsSize[index] : 0;
        return size ? {
          height: size + 'px'
        } : null;
      },
      $_getStepStatusClass: function $_getStepStatusClass(index) {
        var currentLength = this.currentLength;

        var status = [];

        if (index < currentLength) {
          status.push('reached');
        }

        if (index === Math.floor(currentLength)) {
          status.push('current');
        }

        return status.join(' ');
      },
      $_formatValue: function $_formatValue(val) {
        if (val < 0) {
          return 0;
        } else if (val > this.steps.length - 1) {
          return this.steps.length - 1;
        } else {
          return val;
        }
      },
      $_sliceProgress: function $_sliceProgress(current) {
        var _this4 = this;

        return this.steps.slice(0, this.steps.length - 1).map(function (step, index) {
          var offset = current - index;
          var progress = _this4.progress[index];
          var isNewProgress = progress === undefined;
          var len = void 0,
              time = void 0;
          if (offset <= 0) {
            len = 0;
          } else if (offset >= 1) {
            len = 1;
          } else {
            len = offset;
          }
          time = (isNewProgress ? len : Math.abs(progress.len - len)) * _this4.duration;
          return {
            len: len,
            time: time
          };
        });
      },
      $_doTransition: function $_doTransition(progress, isAdd, step) {
        var _this5 = this;

        var currentLength = isAdd ? 0 : this.currentLength;
        var walk = function walk(index) {
          if (index < progress.length & index > -1 && progress[index]) {
            if (isAdd) {
              currentLength += progress[index].len;
            } else {
              currentLength -= _this5.progress[index].len - progress[index].len;
            }

            setTimeout(function () {
              index += isAdd ? 1 : -1;
              step(currentLength);
              walk(index);
            }, progress[index].time * 1000);
          }
          _this5.$set(_this5.progress, index, progress[index]);
        };
        walk(isAdd ? 0 : progress.length - 1);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-steps",class:{
    'md-steps-vertical': _vm.direction == 'vertical',
    'md-steps-horizontal': _vm.direction == 'horizontal',
    'vertical-adaptive': _vm.direction == 'vertical' && _vm.verticalAdaptive,
    'no-current': _vm.currentLength % 1 !== 0
  }},[_vm._l((_vm.steps),function(step,index){return [_c('div',{key:("steps-" + index),staticClass:"step-wrapper",class:[_vm.$_getStepStatusClass(index)]},[(_vm.$scopedSlots.icon)?_c('div',{staticClass:"icon-wrapper"},[_vm._t("icon",null,{"index":index,"currentIndex":_vm.currentLength})],2):_c('div',{staticClass:"icon-wrapper"},[(index < _vm.currentLength)?[(_vm.$scopedSlots.reached || _vm.$slots.reached)?_vm._t("reached",null,{"index":index}):_c('div',{staticClass:"step-node-default"},[_c('div',{staticClass:"step-node-default-icon",staticStyle:{"width":"6px","height":"6px","border-radius":"50%"}})])]:(index === _vm.currentLength)?[(_vm.$scopedSlots.current || _vm.$slots.current)?_vm._t("current",null,{"index":index}):_c('md-icon',{attrs:{"name":"success"}})]:[(_vm.$scopedSlots.unreached || _vm.$slots.unreached)?_vm._t("unreached",null,{"index":index}):_c('div',{staticClass:"step-node-default"},[_c('div',{staticClass:"step-node-default-icon",staticStyle:{"width":"6px","height":"6px","border-radius":"50%"}})])]],2),_vm._v(" "),_c('div',{staticClass:"text-wrapper"},[(_vm.$scopedSlots.content)?_vm._t("content",null,{"index":index,"step":step}):[_c('div',{staticClass:"name"},[_vm._v("\n            "+_vm._s(step.name)+"\n          ")]),_vm._v(" "),(step.text)?_c('div',{staticClass:"desc"},[_vm._v("\n            "+_vm._s(step.text)+"\n          ")]):_vm._e()]],2)]),_vm._v(" "),_c('div',{key:("bar-" + index),staticClass:"bar",class:[_vm.direction === 'horizontal' ? 'horizontal-bar' : 'vertical-bar'],style:(_vm.$_getStepSizeForStyle(index))},[(_vm.progress[index])?_c('i',{staticClass:"bar-inner",style:(_vm.$_barInnerStyle(index))}):_vm._e()])]})],2)}
__vue__options__.staticRenderFns = []
