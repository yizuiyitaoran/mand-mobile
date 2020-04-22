;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './mixins/title-bar', '../icon', '../_style/global.css', './style/title-bar.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./mixins/title-bar'), require('../icon'), require('../_style/global.css'), require('./style/title-bar.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.titleBar, global.icon, global.global, global.titleBar);
    global.titleBar = mod.exports;
  }
})(this, function (exports, _titleBar, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _titleBar2 = _interopRequireDefault(_titleBar);

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
    name: 'md-popup-title-bar',

    mixins: [_titleBar2.default],

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {},

    watch: {
      largeRadius: {
        handler: function handler(val) {
          this.$parent.largeRadius = val;
        },

        immediate: true
      }
    },

    methods: {
      $_preventScroll: function $_preventScroll(e) {
        e.preventDefault();
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-popup-title-bar",class:[
    ("title-align-" + _vm.titleAlign) ].concat( {large: !!_vm.describe, 'large-radius': _vm.largeRadius}
  ),on:{"touchmove":_vm.$_preventScroll}},[(!_vm.onlyClose)?[(_vm.cancelText)?_c('div',{staticClass:"title-bar-left md-popup-cancel",domProps:{"innerHTML":_vm._s(_vm.cancelText)},on:{"click":function($event){return _vm.$emit('cancel')}}}):(_vm.$slots.cancel)?_c('div',{staticClass:"title-bar-left md-popup-cancel",on:{"click":function($event){return _vm.$emit('cancel')}}},[_vm._t("cancel")],2):_vm._e()]:_vm._e(),_vm._v(" "),(_vm.title)?_c('div',{staticClass:"title-bar-title"},[(_vm.title)?_c('p',{staticClass:"title",domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.describe)?_c('p',{staticClass:"describe",domProps:{"innerHTML":_vm._s(_vm.describe)}}):_vm._e()]):_c('div',{staticClass:"title-bar-title"},[_vm._t("title")],2),_vm._v(" "),(!_vm.onlyClose)?[(_vm.okText)?_c('div',{staticClass:"title-bar-right md-popup-confirm",domProps:{"innerHTML":_vm._s(_vm.okText)},on:{"click":function($event){return _vm.$emit('confirm')}}}):(_vm.$slots.confirm)?_c('div',{staticClass:"title-bar-right md-popup-confirm",on:{"click":function($event){return _vm.$emit('confirm')}}},[_vm._t("confirm")],2):_vm._e()]:_vm._e(),_vm._v(" "),(_vm.onlyClose)?[_c('div',{staticClass:"title-bar-right md-popup-close",on:{"click":function($event){return _vm.$emit('cancel')}}},[_c('md-icon',{attrs:{"name":"close","size":"lg"}})],1)]:_vm._e()],2)}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-2da7db53"
