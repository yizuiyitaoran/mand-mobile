;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import CheckBaseBox from '../check-base/box';

export default {
  name: 'md-check-box',

  components: _defineProperty({}, CheckBaseBox.name, CheckBaseBox),

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
      return this.value === this.name || this.rootGroup && this.rootGroup.value.indexOf(this.name) !== -1;
    }
  },

  inject: {
    rootGroup: { default: null }
  },

  mounted: function mounted() {
    this.rootGroup && this.rootGroup.register(this);
  },
  destroyed: function destroyed() {
    this.rootGroup && this.rootGroup.unregister(this);
  },


  methods: {
    $_onClick: function $_onClick() {
      if (this.disabled) {
        return;
      }

      if (typeof this.name === 'boolean') {
        this.$emit('input', !this.value);
      } else if (this.isChecked) {
        this.$emit('input', '');
        if (this.rootGroup) {
          this.rootGroup.uncheck(this.name);
        }
      } else {
        this.$emit('input', this.name);
        if (this.rootGroup) {
          this.rootGroup.check(this.name);
        }
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-check-base-box',{staticClass:"md-check-box",attrs:{"label":_vm.label,"is-checked":_vm.isChecked,"disabled":_vm.disabled},nativeOn:{"click":function($event){return _vm.$_onClick($event)}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)}
__vue__options__.staticRenderFns = []
