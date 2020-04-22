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
    name: 'md-detail-item',

    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: [String, Number],
        default: ''
      },
      bold: {
        type: Boolean,
        default: false
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-detail-item",class:{ 'is-bold': _vm.bold }},[_c('div',{staticClass:"md-detail-title",domProps:{"textContent":_vm._s(_vm.title)}}),_vm._v(" "),_c('div',{staticClass:"md-detail-content"},[_vm._t("default",[_vm._v(_vm._s(_vm.content))])],2)])}
__vue__options__.staticRenderFns = []
