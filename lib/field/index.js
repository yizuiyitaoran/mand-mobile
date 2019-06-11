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
    name: 'md-field',

    props: {
      title: {
        type: String,
        default: ''
      },
      brief: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      }
    },

    provide: function provide() {
      return {
        rootField: this
      };
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fieldset',{staticClass:"md-field",class:{'is-plain': _vm.plain, 'is-disabled': _vm.disabled}},[(_vm.title || _vm.brief || _vm.$slots.header || _vm.$slots.action)?_c('header',{staticClass:"md-field-header"},[_c('div',{staticClass:"md-field-heading"},[(_vm.title)?_c('legend',{staticClass:"md-field-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.brief)?_c('p',{staticClass:"md-field-brief",domProps:{"textContent":_vm._s(_vm.brief)}}):_vm._e(),_vm._v(" "),_vm._t("header")],2),_vm._v(" "),_c('div',{staticClass:"md-field-action"},[_vm._t("action")],2)]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"md-field-content"},[_vm._t("default")],2),_vm._v(" "),(_vm.$slots.footer)?_c('footer',{staticClass:"md-field-footer"},[_vm._t("footer")],2):_vm._e()])}
__vue__options__.staticRenderFns = []
