;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var DEFUALT_TITLE_WIDTH = '40%';
  var DEFUALT_WIDTH = '100%';

  exports.default = {
    name: 'md-skeleton',

    props: {
      loading: {
        type: Boolean,
        default: true
      },
      avatar: {
        type: Boolean,
        default: false
      },
      row: {
        type: Number,
        default: 3
      },
      title: {
        type: Boolean,
        default: false
      },
      titleWidth: {
        type: [Number, String],
        default: DEFUALT_TITLE_WIDTH
      },
      rowWidth: {
        type: [Number, String, Array],
        default: DEFUALT_WIDTH
      },
      avatarSize: {
        type: String,
        default: 'md'
      }
    },

    methods: {
      isNumber: function isNumber(n) {
        return typeof n === 'number';
      },
      getRowWidth: function getRowWidth(index) {
        var rowWidth = this.rowWidth,
            isNumber = this.isNumber;

        if (rowWidth && Array.isArray(rowWidth)) {
          return isNumber(rowWidth[index]) ? rowWidth[index] + '%' : rowWidth[index];
        } else if (rowWidth) {
          return isNumber(rowWidth) ? rowWidth + '%' : rowWidth;
        }
        return DEFUALT_WIDTH;
      },
      getTitleWidth: function getTitleWidth() {
        var titleWidth = this.titleWidth,
            isNumber = this.isNumber;

        if (titleWidth) {
          return isNumber(titleWidth) ? titleWidth + '%' : titleWidth;
        }
        return DEFUALT_TITLE_WIDTH;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.loading)?_c('div',{staticClass:"md-skeleton"},[(_vm.avatar)?_c('div',{class:{
      'md-skeleton-avatar': true,
      'md-skeleton-avatar-large': _vm.avatarSize === 'lg',
      'md-skeleton-avatar-small': _vm.avatarSize === 'sm',
    }}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"md-skeleton-content"},[(_vm.title)?_c('h4',{staticClass:"md-skeleton-title",style:({ width: _vm.getTitleWidth() })}):_vm._e(),_vm._v(" "),_vm._l((_vm.row),function(index){return _c('div',{key:index,staticClass:"md-skeleton-row",style:({width: index === _vm.row ? '60%' : _vm.getRowWidth(index - 1)})})})],2)]):_c('div',[_vm._t("default")],2)}
__vue__options__.staticRenderFns = []
