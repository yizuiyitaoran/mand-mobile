;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', './mixins', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('./mixins'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.mixins, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _icon, _mixins) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _icon2 = _interopRequireDefault(_icon);

  var _mixins2 = _interopRequireDefault(_mixins);

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
    name: 'md-radio',

    mixins: [_mixins2.default],

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      name: {
        required: true
      },
      value: {
        default: ''
      },
      size: {
        type: String,
        default: 'md'
      },
      label: {
        type: String,
        default: ''
      },
      inline: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      isChecked: function isChecked() {
        return this.value === this.name || this.rootGroup && this.rootGroup.value === this.name;
      },
      currentIcon: function currentIcon() {
        return this.disabled ? this.iconDisabled : this.isChecked ? this.icon : this.iconInverse;
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
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"md-radio",class:{
    'is-disabled': _vm.disabled,
    'is-checked': _vm.isChecked,
    'is-inline': _vm.inline
  },on:{"click":_vm.$_onClick}},[_c('div',{staticClass:"md-radio-icon"},[_c('md-icon',{attrs:{"name":_vm.currentIcon,"size":_vm.size,"svg":_vm.iconSvg}})],1),_vm._v(" "),(_vm.$slots.default || _vm.label)?_c('div',{staticClass:"md-radio-label"},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2):_vm._e()])}
__vue__options__.staticRenderFns = []
