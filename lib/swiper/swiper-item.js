;(function(){


export default {
  name: 'md-swiper-item',

  computed: {
    swiperWidth: function swiperWidth() {
      return !this.$parent.isVertical ? this.$parent.dimension + 'px' : 'auto';
    },
    swiperHeight: function swiperHeight() {
      return this.$parent.isVertical ? this.$parent.dimension + 'px' : 'auto';
    }
  },

  mounted: function mounted() {
    return this.$parent && this.$parent.swiperItemCreated(this);
  },
  destroyed: function destroyed() {
    return this.$parent && this.$parent.swiperItemDestroyed(this);
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-swiper-item",style:({'width': _vm.swiperWidth, 'height': _vm.swiperHeight })},[_vm._t("default")],2)}
__vue__options__.staticRenderFns = []
