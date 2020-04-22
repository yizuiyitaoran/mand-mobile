;(function(){

export default {
  name: 'md-scroll-view-more',
  props: {
    loadingText: {
      type: String,
      default: '更多加载中...'
    },
    finishedText: {
      type: String,
      default: '全部已加载'
    },
    isFinished: {
      type: Boolean,
      default: false
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-scroll-view-more"},[(!_vm.isFinished)?[_vm._v("\n    "+_vm._s(_vm.loadingText)+"\n  ")]:[_vm._v("\n    "+_vm._s(_vm.finishedText)+"\n  ")]],2)}
__vue__options__.staticRenderFns = []
