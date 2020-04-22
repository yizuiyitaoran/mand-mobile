;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/key.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/key.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.key);
    global.key = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-number-key',

    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      noTouch: {
        type: Boolean,
        default: false
      },
      noPrevent: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        active: false
      };
    },


    methods: {
      $_onFocus: function $_onFocus(event) {
        if (!this.noPrevent) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
        if (!this.noTouch) {
          this.active = true;
        }
        this.$emit('press', this.value);
      },
      $_onBlur: function $_onBlur() {
        this.active = false;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.noTouch)?_c('li',{class:[_vm.active ? 'active' : ''],on:{"click":_vm.$_onFocus}},[_c('span',{domProps:{"textContent":_vm._s(_vm.value)}})]):_c('li',{class:[_vm.active ? 'active' : ''],on:{"touchstart":_vm.$_onFocus,"touchmove":_vm.$_onBlur,"touchend":_vm.$_onBlur,"touchcancel":_vm.$_onBlur,"click":_vm.$_onFocus}},[_c('span',{domProps:{"textContent":_vm._s(_vm.value)}})])}
__vue__options__.staticRenderFns = []
