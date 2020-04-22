;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './index', '../field', '../cell-item', '../input-item', './mixins', '../_style/global.css', './style/list.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./index'), require('../field'), require('../cell-item'), require('../input-item'), require('./mixins'), require('../_style/global.css'), require('./style/list.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index, global.field, global.cellItem, global.inputItem, global.mixins, global.global, global.list);
    global.list = mod.exports;
  }
})(this, function (exports, _index, _field, _cellItem, _inputItem, _mixins) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _index2 = _interopRequireDefault(_index);

  var _field2 = _interopRequireDefault(_field);

  var _cellItem2 = _interopRequireDefault(_cellItem);

  var _inputItem2 = _interopRequireDefault(_inputItem);

  var _mixins2 = _interopRequireDefault(_mixins);

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
    name: 'md-radio-list',

    mixins: [_mixins2.default],

    components: (_components = {}, _defineProperty(_components, _index2.default.name, _index2.default), _defineProperty(_components, _field2.default.name, _field2.default), _defineProperty(_components, _cellItem2.default.name, _cellItem2.default), _defineProperty(_components, _inputItem2.default.name, _inputItem2.default), _components),

    props: {
      options: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      value: {
        default: ''
      },
      hasInput: {
        type: Boolean,
        default: false
      },
      inputLabel: {
        type: String,
        default: ''
      },
      inputPlaceholder: {
        type: String,
        default: ''
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

    data: function data() {
      return {
        selectedValue: this.value,
        inputSelected: false,
        inputValue: ''
      };
    },


    computed: {
      currentValue: function currentValue() {
        if (this.inputSelected) {
          return this.inputValue;
        } else {
          return this.selectedValue;
        }
      },
      hasSlot: function hasSlot() {
        return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default;
      },
      withoutIcon: function withoutIcon() {
        return this.isSlotScope && !this.icon;
      }
    },

    watch: {
      value: function value(val) {
        if (val !== this.selectedValue) {
          this.selectedValue = val;
        }
      },
      currentValue: function currentValue(val) {
        this.$emit('input', val);
      }
    },

    methods: {
      $_select: function $_select(option, index) {
        this.selectedValue = option.value;
        this.inputSelected = false;
        this.inputValue && (this.inputValue = '');
        this.$emit('change', option, index);
      },
      select: function select(value) {
        this.selectedValue = value;
        this.inputSelected = false;
      },
      selectByIndex: function selectByIndex(index) {
        var item = this.options[index];
        if (item) {
          this.select(item.value);
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-radio-list",class:{ 'is-align-center': _vm.alignCenter }},[_vm._l((_vm.options),function(item,index){return _c('md-cell-item',{key:index,staticClass:"md-radio-item",class:{
      'is-selected': _vm.selectedValue === item.value && !_vm.inputSelected,
    },attrs:{"title":_vm.hasSlot ? '' : (item.text || item.label),"brief":_vm.hasSlot ? '' : item.brief,"disabled":item.disabled,"noBorder":index === _vm.options.length - 1},on:{"click":function($event){return _vm.$_select(item, index)}}},[(_vm.hasSlot)?[_vm._t("default",null,{"option":item,"index":index,"selected":_vm.currentValue === item.value})]:_vm._e(),_vm._v(" "),(!_vm.alignCenter && !_vm.inputSelected && !_vm.withoutIcon)?_c('md-radio',{attrs:{"slot":_vm.iconPosition === 'right' ? 'right' : 'left',"name":item.value,"disabled":item.disabled,"size":_vm.iconSize,"icon":_vm.icon,"icon-inverse":_vm.iconInverse,"icon-disabled":_vm.iconDisabled,"icon-svg":_vm.iconSvg},slot:_vm.iconPosition === 'right' ? 'right' : 'left',model:{value:(_vm.selectedValue),callback:function ($$v) {_vm.selectedValue=$$v},expression:"selectedValue"}}):_vm._e()],2)}),_vm._v(" "),(_vm.hasInput)?_c('md-input-item',{ref:"inputItem",staticClass:"md-radio-item",class:{
      'is-selected': _vm.inputSelected,
    },attrs:{"title":_vm.inputLabel,"placeholder":_vm.inputPlaceholder},on:{"focus":function($event){_vm.inputSelected = true}},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v},expression:"inputValue"}}):_vm._e()],2)}
__vue__options__.staticRenderFns = []
