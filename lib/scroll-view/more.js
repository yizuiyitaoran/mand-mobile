;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/more.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/more.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.more);
    global.more = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-scroll-view-more',
    props: {
      loadingText: {
        type: String,
        default: '更多加载中...'
      },
      finishedText: {
        type: String,
        default: '全部已加载'
      },
      isFinished: {
        type: Boolean,
        default: false
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-scroll-view-more"},[(!_vm.isFinished)?[_vm._v("\n    "+_vm._s(_vm.loadingText)+"\n  ")]:[_vm._v("\n    "+_vm._s(_vm.finishedText)+"\n  ")]],2)}
__vue__options__.staticRenderFns = []
