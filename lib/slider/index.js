;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-slider',

    props: {
      value: {
        type: [Array, Number],
        default: 0
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      range: {
        type: Boolean,
        default: false
      },
      format: {
        type: Function,
        default: function _default(val) {
          return val;
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        isDragging: false,
        isDragingUpper: false,
        values: [this.min, this.max],
        startDragMousePos: 0,
        startVal: 0
      };
    },


    watch: {
      value: {
        immediate: true,
        handler: function handler(val) {
          if (Array.isArray(val) && (val[0] !== this.values[0] || val[1] !== this.values[1]) || val !== this.values[0]) {
            this.$_updateValue(val);
          }
        }
      },
      disabled: function disabled(newVal) {
        if (!newVal) {
          this.$_stopDrag();
        }
      }
    },

    computed: {
      lowerHandlePosition: function lowerHandlePosition() {
        return (this.values[0] - this.min) / (this.max - this.min) * 100;
      },
      upperHandlePosition: function upperHandlePosition() {
        return (this.values[1] - this.min) / (this.max - this.min) * 100;
      },
      barStyle: function barStyle() {
        var range = this.range,
            values = this.values,
            min = this.min,
            max = this.max,
            lowerHandlePosition = this.lowerHandlePosition;


        if (range) {
          return {
            width: (values[1] - values[0]) / (max - min) * 100 + '%',
            left: lowerHandlePosition + '%'
          };
        } else {
          return {
            width: (values[0] - min) / (max - min) * 100 + '%'
          };
        }
      }
    },

    methods: {
      $_updateValue: function $_updateValue(newVal) {
        var newValues = [];

        if (Array.isArray(newVal)) {
          newValues = [newVal[0], newVal[1]];
        } else {
          newValues[0] = newVal;
        }

        if (typeof newValues[0] !== 'number') {
          newValues[0] = this.values[0];
        } else {
          newValues[0] = Math.round((newValues[0] - this.min) / this.step) * this.step + this.min;
        }

        if (typeof newValues[1] !== 'number') {
          newValues[1] = this.values[1];
        } else {
          newValues[1] = Math.round((newValues[1] - this.min) / this.step) * this.step + this.min;
        }

        if (newValues[0] < this.min) {
          newValues[0] = this.min;
        }
        if (newValues[1] > this.max) {
          newValues[1] = this.max;
        }
        if (newValues[0] > newValues[1]) {
          if (newValues[0] === this.values[0]) {
            newValues[1] = newValues[0];
          } else {
            newValues[0] = newValues[1];
          }
        }

        if (this.values[0] === newValues[0] && this.values[1] === newValues[1]) {
          return;
        }

        this.values = newValues;

        if (this.range) {
          this.$emit('input', this.values);
        } else {
          this.$emit('input', this.values[0]);
        }
      },
      $_startLowerDrag: function $_startLowerDrag(e) {
        if (this.disabled) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        e = e.changedTouches ? e.changedTouches[0] : e;
        this.startDragMousePos = e.pageX;
        this.startVal = this.values[0];
        this.isDragingUpper = false;
        this.isDragging = true;
        window.addEventListener('mousemove', this.$_onDrag);
        window.addEventListener('touchmove', this.$_onDrag);
        window.addEventListener('mouseup', this.$_onUp);
        window.addEventListener('touchend', this.$_onUp);
      },
      $_startUpperDrag: function $_startUpperDrag(e) {
        if (this.disabled) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        e = e.changedTouches ? e.changedTouches[0] : e;
        this.startDragMousePos = e.pageX;
        this.startVal = this.values[1];
        this.isDragingUpper = true;
        this.isDragging = true;
        window.addEventListener('mousemove', this.$_onDrag);
        window.addEventListener('touchmove', this.$_onDrag);
        window.addEventListener('mouseup', this.$_onUp);
        window.addEventListener('touchend', this.$_onUp);
      },
      $_onDrag: function $_onDrag(e) {
        var _this = this;

        if (this.disabled) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (!this.isDragging) {
          return;
        }
        e = e.changedTouches ? e.changedTouches[0] : e;
        window.requestAnimationFrame(function () {
          var diff = (e.pageX - _this.startDragMousePos) / _this.$el.offsetWidth * (_this.max - _this.min);
          var nextVal = _this.startVal + diff;
          if (_this.isDragging) {
            if (_this.isDragingUpper) {
              _this.$_updateValue([null, nextVal]);
            } else {
              _this.$_updateValue([nextVal, null]);
            }
          }
        });
      },
      $_onUp: function $_onUp(e) {
        e.preventDefault();
        e.stopPropagation();
        this.$_stopDrag();
      },
      $_stopDrag: function $_stopDrag() {
        this.isDragging = false;
        this.isDragingUpper = false;
        window.removeEventListener('mousemove', this.$_onDrag);
        window.removeEventListener('touchmove', this.$_onDrag);
        window.removeEventListener('mouseup', this.$_onUp);
        window.removeEventListener('touchend', this.$_onUp);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-slider",class:{'is-disabled': _vm.disabled}},[(_vm.range)?[_c('div',{staticClass:"md-slider-bar",style:(_vm.barStyle)}),_vm._v(" "),_c('div',{staticClass:"md-slider-handle is-lower",class:{
        'is-active': _vm.isDragging && !_vm.isDragingUpper
      },style:({'left': _vm.lowerHandlePosition + '%'}),attrs:{"data-hint":_vm.format(_vm.values[0])}},[_c('span',{on:{"mousedown":_vm.$_startLowerDrag,"touchstart":_vm.$_startLowerDrag}})]),_vm._v(" "),_c('div',{staticClass:"md-slider-handle is-higher",class:{
        'is-active': _vm.isDragging && _vm.isDragingUpper
      },style:({'left': _vm.upperHandlePosition + '%'}),attrs:{"data-hint":_vm.format(_vm.values[1])}},[_c('span',{on:{"mousedown":_vm.$_startUpperDrag,"touchstart":_vm.$_startUpperDrag}})])]:[_c('div',{staticClass:"md-slider-bar",style:(_vm.barStyle)}),_vm._v(" "),_c('div',{staticClass:"md-slider-handle",class:{
        'is-active': _vm.isDragging
      },style:({'left': _vm.lowerHandlePosition + '%'}),attrs:{"data-hint":_vm.format(_vm.values[0])}},[_c('span',{on:{"mousedown":_vm.$_startLowerDrag,"touchstart":_vm.$_startLowerDrag}})])]],2)}
__vue__options__.staticRenderFns = []
