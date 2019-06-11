;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './load-spirte', './default-svg-list', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./load-spirte'), require('./default-svg-list'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.loadSpirte, global.defaultSvgList, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _loadSpirte, _defaultSvgList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _loadSpirte2 = _interopRequireDefault(_loadSpirte);

  var _defaultSvgList2 = _interopRequireDefault(_defaultSvgList);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    name: 'md-icon',

    props: {
      name: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'md'
      },
      color: {
        type: String,
        default: ''
      },
      svg: {
        type: Boolean,
        default: false
      }
    },

    mounted: function mounted() {
      (0, _loadSpirte2.default)();
    },


    computed: {
      isInnerSvg: function isInnerSvg() {
        return !!_defaultSvgList2.default[this.name];
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.svg || _vm.isInnerSvg)?_c('svg',{staticClass:"md-icon icon-svg",class:[("md-icon-" + _vm.name), _vm.size],style:({fill: _vm.color}),on:{"click":function($event){return _vm.$emit('click', $event)}}},[_c('use',{attrs:{"xlink:href":("#" + _vm.name)}})]):(_vm.name)?_c('i',{staticClass:"md-icon icon-font",class:[("md-icon-" + _vm.name), _vm.name, _vm.size],style:({color: _vm.color}),on:{"click":function($event){return _vm.$emit('click', $event)}}}):_vm._e()}
__vue__options__.staticRenderFns = []
