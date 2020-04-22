;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './index', './group', '../cell-item', './mixin', '../_style/global.css', './style/list.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./index'), require('./group'), require('../cell-item'), require('./mixin'), require('../_style/global.css'), require('./style/list.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index, global.group, global.cellItem, global.mixin, global.global, global.list);
    global.list = mod.exports;
  }
})(this, function (exports, _index, _group, _cellItem, _mixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _index2 = _interopRequireDefault(_index);

  var _group2 = _interopRequireDefault(_group);

  var _cellItem2 = _interopRequireDefault(_cellItem);

  var _mixin2 = _interopRequireDefault(_mixin);

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
    name: 'md-check-list',

    mixins: [_mixin2.default],

    components: (_components = {}, _defineProperty(_components, _index2.default.name, _index2.default), _defineProperty(_components, _group2.default.name, _group2.default), _defineProperty(_components, _cellItem2.default.name, _cellItem2.default), _components),

    props: {
      options: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      value: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      alignCenter: {
        type: Boolean,
        default: false
      },
      isSlotScope: {
        type: Boolean,
        default: undefined
      }
    },

    computed: {
      hasSlot: function hasSlot() {
        return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default;
      }
    },

    methods: {
      $_check: function $_check(option) {
        this.$refs.group.toggle(option.value);
      },
      $_onInput: function $_onInput(value) {
        this.$emit('input', value);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-check-group',{ref:"group",staticClass:"md-check-list",class:{ 'is-align-center': _vm.alignCenter },attrs:{"value":_vm.value},on:{"input":_vm.$_onInput}},_vm._l((_vm.options),function(item,index){return _c('md-cell-item',{key:index,staticClass:"md-check-item",class:{
      'is-checked': _vm.value.indexOf(item.value) !== -1,
    },attrs:{"title":_vm.hasSlot ? '' : (item.text || item.label),"brief":_vm.hasSlot ? '' : item.brief,"disabled":item.disabled},on:{"click":function($event){return _vm.$_check(item, index)}}},[(_vm.hasSlot)?[_vm._t("default",null,{"option":item,"index":index,"selected":_vm.value.indexOf(item.value) > -1})]:_vm._e(),_vm._v(" "),(!_vm.alignCenter)?_c('md-check',{attrs:{"slot":_vm.iconPosition === 'right' ? 'right' : 'left',"name":item.value,"disabled":item.disabled,"size":_vm.iconSize,"icon":_vm.icon,"icon-inverse":_vm.iconInverse,"icon-disabled":_vm.iconDisabled,"icon-svg":_vm.iconSvg},slot:_vm.iconPosition === 'right' ? 'right' : 'left'}):_vm._e()],2)}),1)}
__vue__options__.staticRenderFns = []
