;(function(){


export default {
  name: 'md-radio-group',

  props: {
    value: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 0
    }
  },

  provide: function provide() {
    return {
      rootGroup: this
    };
  },


  methods: {
    check: function check(name) {
      this.$emit('input', name);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-radio-group"},[_vm._t("default")],2)}
__vue__options__.staticRenderFns = []
