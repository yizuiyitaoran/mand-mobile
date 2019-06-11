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
  exports.default = {
    name: 'md-tag',
    props: {
      size: {
        type: String,
        default: 'large'
      },
      shape: {
        type: String,
        default: 'square'
      },
      sharp: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'ghost'
      },
      fillColor: {
        type: String,
        default: ''
      },
      fontWeight: {
        type: String,
        default: 'normal'
      },
      fontColor: {
        type: String,
        default: ''
      }
    },
    data: function data() {
      return {
        sizeStyle: {}
      };
    },

    computed: {
      computedClass: function computedClass() {
        return ['default', 'size-' + this.size, 'shape-' + this.shape, 'type-' + this.type, 'font-weight-' + this.fontWeight];
      },
      colorStyle: function colorStyle() {
        var style = {};
        if (this.type === 'fill') {
          this.fillColor && (style.background = this.fillColor);
        }
        if (this.fontColor) {
          if (this.type === 'ghost') {
            style.borderColor = this.fontColor;
          }
          style.color = this.fontColor;
        }
        return style;
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.shape === 'circle') {
          var radius = _this.$el.offsetHeight / 2;
          _this.$set(_this.sizeStyle, 'paddingLeft', radius + 'px');
          _this.$set(_this.sizeStyle, 'paddingRight', radius + 'px');
          _this.$set(_this.sizeStyle, 'borderRadius', radius + 'px');
          if (_this.sharp) {
            _this.$set(_this.sizeStyle, (0, _util.transformCamelCase)('border-' + _this.sharp + '-radius'), 0);
          }
        }
      });
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-tag"},[(_vm.shape === 'quarter')?[_c('div',{class:_vm.computedClass},[_c('div',{staticClass:"quarter-content"},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"quarter-bg",style:(_vm.colorStyle)})])]:(_vm.shape === 'coupon')?[_c('div',{class:_vm.computedClass},[_c('div',{staticClass:"coupon-container",style:(_vm.colorStyle)},[(_vm.shape === 'coupon')?_c('div',{staticClass:"left-coupon",style:({ background: _vm.fillColor ? 'radial-gradient(circle at left, transparent 33%, ' + _vm.fillColor + ' 33%)' : ''})}):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.shape === 'coupon')?_c('div',{staticClass:"right-coupon",style:({ background: _vm.fillColor ? 'radial-gradient(circle at right, transparent 33%, ' + _vm.fillColor + ' 33%)' : ''})}):_vm._e()],2)])]:[_c('div',{class:_vm.computedClass,style:([_vm.colorStyle, _vm.sizeStyle])},[_vm._t("default")],2)]],2)}
__vue__options__.staticRenderFns = []
