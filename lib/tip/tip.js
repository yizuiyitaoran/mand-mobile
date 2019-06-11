;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_style/global.css', './style/tip.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_style/global.css'), require('./style/tip.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.global, global.tip);
    global.tip = mod.exports;
  }
})(this, function (exports, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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
    name: 'md-tip-content',
    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      placement: {
        type: String
      },
      closable: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String
      },
      iconSvg: {
        type: Boolean
      },
      content: {
        type: [String, Number]
      },
      name: {
        type: [String, Number]
      }
    },

    computed: {
      wrapperCls: function wrapperCls() {
        var _ref;

        return _ref = {
          'has-close': this.closable
        }, _defineProperty(_ref, 'is-' + this.placement, ['left', 'bottom', 'right'].indexOf(this.placement) !== -1), _defineProperty(_ref, this.name, !!this.name), _ref;
      }
    },

    methods: {
      $_onClose: function $_onClose() {
        this.$emit('close');
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-tip",class:_vm.wrapperCls},[_c('div',{staticClass:"md-tip-content"},[(!_vm.$slots.default)?[(_vm.icon)?_c('md-icon',{staticClass:"content-icon",attrs:{"name":_vm.icon,"svg":_vm.iconSvg}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"content-text",domProps:{"textContent":_vm._s(_vm.content)}})]:[_vm._t("default")],_vm._v(" "),(_vm.closable)?_c('md-icon',{attrs:{"name":"close","size":"md"},nativeOn:{"click":function($event){return _vm.$_onClose($event)}}}):_vm._e()],2),_vm._v(" "),_c('div',{staticClass:"md-tip-bg"})])}
__vue__options__.staticRenderFns = []
