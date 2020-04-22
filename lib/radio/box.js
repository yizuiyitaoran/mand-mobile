;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../check-base/box', '../_style/global.css', './style/box.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../check-base/box'), require('../_style/global.css'), require('./style/box.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.box, global.global, global.box);
    global.box = mod.exports;
  }
})(this, function (exports, _box) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _box2 = _interopRequireDefault(_box);

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
    name: 'md-radio-box',

    components: _defineProperty({}, _box2.default.name, _box2.default),

    props: {
      name: {
        default: true
      },
      value: {
        default: false
      },
      label: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      isChecked: function isChecked() {
        return this.value === this.name || this.rootGroup && this.rootGroup.value === this.name;
      }
    },

    inject: {
      rootGroup: { default: null }
    },

    methods: {
      $_onClick: function $_onClick() {
        if (!this.disabled) {
          this.$emit('input', this.name);
          if (this.rootGroup) {
            this.rootGroup.check(this.name);
          }
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-check-base-box',{staticClass:"md-radio-box",attrs:{"label":_vm.label,"is-checked":_vm.isChecked,"disabled":_vm.disabled},nativeOn:{"click":function($event){return _vm.$_onClick($event)}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)}
__vue__options__.staticRenderFns = []
