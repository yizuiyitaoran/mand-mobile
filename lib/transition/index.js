;(function(){

export default {
  name: 'md-transition',

  functional: true,

  render: function render(h, context) {
    return h('transition', context.data, context.children);
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
