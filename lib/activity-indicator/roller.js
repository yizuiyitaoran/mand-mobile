;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/roller.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/roller.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.roller);
    global.roller = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-activity-indicator-rolling',

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
      process: {
        type: Number
      }
    },

    computed: {
      id: function id() {
        return this.$options.name + '-keyframes-' + this.size;
      },
      strokeWidth: function strokeWidth() {
        return this.width || this.size / 12;
      },
      strokeDasharray: function strokeDasharray() {
        return this.process * this.circlePerimeter + ' ' + (1 - this.process) * this.circlePerimeter;
      },
      radius: function radius() {
        return this.size / 2;
      },
      viewBoxSize: function viewBoxSize() {
        return this.size + 2 * this.strokeWidth;
      },
      circlePerimeter: function circlePerimeter() {
        return this.size * 3.1415;
      },
      duration: function duration() {
        return 2;
      },
      isAutoAnimation: function isAutoAnimation() {
        return this.process === undefined;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-activity-indicator-rolling"},[_c('div',{staticClass:"rolling-container"},[_c('svg',{staticClass:"md-activity-indicator-svg rolling",style:({width: (_vm.size + "px"), height: (_vm.size + "px"), transform: ("rotateZ(" + _vm.rotate + "deg)")}),attrs:{"viewBox":("0 0 " + _vm.viewBoxSize + " " + _vm.viewBoxSize),"preserveAspectRatio":"xMidYMid"}},[_c('circle',{attrs:{"fill":"none","stroke":_vm.borderColor,"stroke-width":_vm.strokeWidth,"cx":_vm.viewBoxSize/2,"cy":_vm.viewBoxSize/2,"r":_vm.radius}}),_vm._v(" "),(!_vm.$slots.circle)?_c('g',{staticClass:"circle"},[(_vm.isAutoAnimation || _vm.process > 0)?_c('circle',{staticClass:"stroke",attrs:{"cx":_vm.viewBoxSize/2,"cy":_vm.viewBoxSize/2,"fill":_vm.fill,"stroke":_vm.color,"stroke-width":_vm.strokeWidth,"stroke-dasharray":_vm.isAutoAnimation ? ("" + (110 * _vm.circlePerimeter / 125)) : _vm.strokeDasharray,"stroke-linecap":_vm.linecap,"r":_vm.radius}},[(_vm.isAutoAnimation)?_c('animate',{attrs:{"attributeName":"stroke-dashoffset","values":((360 * _vm.circlePerimeter / 125) + ";" + (140 * _vm.circlePerimeter / 125)),"dur":"2.2s","keyTimes":"0;1","calcMode":"spline","fill":"freeze","keySplines":"0.41,0.314,0.8,0.54","repeatCount":"indefinite","begin":"0"}}):_vm._e(),_vm._v(" "),(_vm.isAutoAnimation)?_c('animateTransform',{attrs:{"dur":(_vm.duration + "s"),"values":("0 " + (_vm.viewBoxSize/2) + " " + (_vm.viewBoxSize/2) + ";360 " + (_vm.viewBoxSize/2) + " " + (_vm.viewBoxSize/2)),"attributeName":"transform","type":"rotate","calcMode":"linear","keyTimes":"0;1","begin":"0","repeatCount":"indefinite"}}):_vm._e()],1):_vm._e()]):_vm._t("circle"),_vm._v(" "),_vm._t("defs")],2),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._t("default")],2)])])}
__vue__options__.staticRenderFns = []
