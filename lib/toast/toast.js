;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../icon', '../_style/global.css', './style/toast.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../icon'), require('../_style/global.css'), require('./style/toast.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.icon, global.global, global.toast);
    global.toast = mod.exports;
  }
})(this, function (exports, _popup, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _icon2 = _interopRequireDefault(_icon);

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
    name: 'md-toast',

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _components),

    props: {
      icon: {
        type: String,
        default: ''
      },
      iconSvg: {
        type: Boolean,
        default: false
      },
      content: {
        type: [String, Number],
        default: ''
      },
      duration: {
        type: Number,
        default: 0
      },
      position: {
        type: String,
        default: 'center'
      },
      hasMask: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        visible: false
      };
    },
    beforeDestroy: function beforeDestroy() {
      if (this.$_timer) {
        clearTimeout(this.$_timer);
      }
    },


    methods: {
      $_onShow: function $_onShow() {
        this.$emit('show');
      },
      $_onHide: function $_onHide() {
        this.$emit('hide');
      },
      fire: function fire() {
        var _this = this;

        if (this.$_timer) {
          clearTimeout(this.$_timer);
        }
        if (this.visible && this.duration) {
          this.$_timer = setTimeout(function () {
            _this.hide();
          }, this.duration);
        }
      },
      show: function show() {
        this.visible = true;
        this.fire();
      },
      hide: function hide() {
        this.visible = false;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-toast",class:[_vm.position]},[_c('md-popup',{attrs:{"value":_vm.visible,"hasMask":_vm.hasMask,"maskClosable":false},on:{"show":_vm.$_onShow,"hide":_vm.$_onHide}},[(_vm.$slots.default)?_c('div',{staticClass:"md-toast-content"},[_vm._t("default")],2):_c('div',{staticClass:"md-toast-content"},[(_vm.icon)?_c('md-icon',{attrs:{"name":_vm.icon,"size":"lg","svg":_vm.iconSvg}}):_vm._e(),_vm._v(" "),(_vm.content)?_c('div',{staticClass:"md-toast-text",domProps:{"textContent":_vm._s(_vm.content)}}):_vm._e()],1)])],1)}
__vue__options__.staticRenderFns = []
