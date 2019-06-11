;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../field-item', '../water-mark', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../field-item'), require('../water-mark'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fieldItem, global.waterMark, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _fieldItem, _waterMark) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _fieldItem2 = _interopRequireDefault(_fieldItem);

  var _waterMark2 = _interopRequireDefault(_waterMark);

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
    name: 'md-bill',

    components: (_components = {}, _defineProperty(_components, _fieldItem2.default.name, _fieldItem2.default), _defineProperty(_components, _waterMark2.default.name, _waterMark2.default), _components),

    props: {
      title: {
        type: String,
        default: ''
      },
      no: {
        type: [String, Number],
        default: ''
      },
      waterMark: {
        type: String,
        default: ''
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-water-mark',{staticClass:"md-bill",attrs:{"content":_vm.waterMark},scopedSlots:_vm._u([{key:"watermark",fn:function(props){return (!!_vm.$scopedSlots.watermark)?[_vm._t("watermark",null,{"coord":props.coord})]:undefined}}],null,true)},[_c('header',{staticClass:"md-bill-header"},[(!_vm.$slots.header)?[(_vm.title)?_c('h4',{staticClass:"md-bill-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.no)?_c('div',{staticClass:"md-bill-no"},[_vm._v("NO."+_vm._s(_vm.no))]):_vm._e()]:[_vm._t("header")]],2),_vm._v(" "),_c('div',{staticClass:"md-bill-neck"},[_c('span')]),_vm._v(" "),_c('div',{staticClass:"md-bill-content"},[_c('div',{staticClass:"md-bill-detail"},[_vm._t("default")],2),_vm._v(" "),(_vm.$slots.footer)?_c('footer',{staticClass:"md-bill-footer"},[_vm._t("footer")],2):_vm._e()])])}
__vue__options__.staticRenderFns = []
