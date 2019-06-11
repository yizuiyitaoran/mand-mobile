;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './roller', './spinner', './carousel', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./roller'), require('./spinner'), require('./carousel'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.roller, global.spinner, global.carousel, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _roller, _spinner, _carousel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _roller2 = _interopRequireDefault(_roller);

  var _spinner2 = _interopRequireDefault(_spinner);

  var _carousel2 = _interopRequireDefault(_carousel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _components;

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
    name: 'md-activity-indicator',

    components: (_components = {}, _defineProperty(_components, _roller2.default.name, _roller2.default), _defineProperty(_components, _spinner2.default.name, _spinner2.default), _defineProperty(_components, _carousel2.default.name, _carousel2.default), _components),

    props: {
      type: {
        type: String,
        default: 'roller' },
      size: {
        type: Number,
        default: 70
      },
      width: {
        type: Number
      },
      color: {
        type: String,
        default: function _default() {
          if (this.type === 'spinner') {
            return 'dark';
          } else {
            return '#2F86F6';
          }
        }
      },
      textColor: {
        type: String,
        default: '#999'
      },
      textSize: {
        type: Number
      },
      vertical: {
        type: Boolean,
        default: false
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-activity-indicator",class:_vm.type},[_c('div',{staticClass:"indicator-container",class:{vertical: _vm.vertical}},[_c('div',{staticClass:"indicator-loading"},[(_vm.type === 'roller')?[_c('md-activity-indicator-rolling',{attrs:{"size":_vm.size,"color":_vm.color,"width":_vm.width}})]:(_vm.type === 'spinner')?[_c('md-activity-indicator-spinning',{attrs:{"size":_vm.size,"color":_vm.color}})]:(_vm.type === 'carousel')?[_c('md-activity-indicator-carousel',{attrs:{"size":_vm.size,"color":_vm.color}})]:_vm._e()],2),_vm._v(" "),(_vm.$slots.default)?_c('div',{staticClass:"md-activity-indicator-text indicator-text",style:({fontSize: (_vm.textSize + "px"), color: _vm.textColor})},[_vm._t("default")],2):_vm._e()])])}
__vue__options__.staticRenderFns = []
