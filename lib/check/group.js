;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Check from './index';

export default {
  name: 'md-check-group',

  components: _defineProperty({}, Check.name, Check),

  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    max: {
      type: Number,
      default: 0
    }
  },

  data: function data() {
    return {
      children: {}
    };
  },
  provide: function provide() {
    return {
      rootGroup: this
    };
  },


  methods: {
    register: function register(child) {
      child.name && (this.children[child.name] = child);
    },
    unregister: function unregister(child) {
      child.name && delete this.children[child.name];
    },
    check: function check(name) {
      var index = this.value.indexOf(name);
      if (index === -1 && (this.max < 1 || this.value.length < this.max)) {
        this.$emit('input', this.value.concat(name));
      }
    },
    uncheck: function uncheck(name) {
      var index = this.value.indexOf(name);
      if (index !== -1) {
        this.$emit('input', this.value.slice(0, index).concat(this.value.slice(index + 1)));
      }
    },
    toggle: function toggle(name) {
      var index = this.value.indexOf(name);
      if (index === -1) {
        this.check(name);
      } else {
        this.uncheck(name);
      }
    },
    toggleAll: function toggleAll(checked) {
      var _this = this;

      var children = this.children;

      var names = Object.keys(children).filter(function (name) {
        var child = children[name];
        var isChecked = !!~_this.value.indexOf(name);

        if (child.disabled) {
          return isChecked;
        }
        return checked === false ? false : !checked ? !isChecked : true;
      });
      this.$emit('input', names);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-check-group"},[_vm._t("default")],2)}
__vue__options__.staticRenderFns = []
