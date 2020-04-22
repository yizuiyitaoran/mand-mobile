;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../popup/title-bar', './picker-column', './mixins', './cascade', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../popup/title-bar'), require('./picker-column'), require('./mixins'), require('./cascade'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.titleBar, global.pickerColumn, global.mixins, global.cascade, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _popup, _titleBar, _pickerColumn, _mixins, _cascade, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  var _pickerColumn2 = _interopRequireDefault(_pickerColumn);

  var _mixins2 = _interopRequireDefault(_mixins);

  var _cascade2 = _interopRequireDefault(_cascade);

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
    name: 'md-picker',

    mixins: [_mixins2.default],

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _titleBar2.default.name, _titleBar2.default), _defineProperty(_components, _pickerColumn2.default.name, _pickerColumn2.default), _components),

    props: {
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      cols: {
        type: Number,
        default: 1
      },
      defaultValue: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      defaultIndex: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      invalidIndex: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      isCascade: {
        type: Boolean,
        default: false
      }

    },

    data: function data() {
      return {
        isPickerShow: false,
        isPickerFirstPopup: true,
        oldActivedIndexs: null
      };
    },


    computed: {
      column: function column() {
        return this.$refs['pickerColumn'];
      },
      isScrollInitialed: function isScrollInitialed() {
        return this.column.isScrollInitialed;
      }
    },

    watch: {
      value: function value(val) {
        this.isPickerShow = val;
        val && this.$_initPicker();
      },
      isPickerShow: function isPickerShow(val) {
        if (!val) {
          this.$emit('input', val);
        }
      },

      data: {
        handler: function handler(val, oldVal) {
          if (!(0, _util.compareObjects)(val, oldVal)) {
            this.$_initPickerColumn();
          }
        },

        deep: true,
        immediate: true
      },
      defaultIndex: {
        handler: function handler(val, oldVal) {
          if (!(0, _util.compareObjects)(val, oldVal)) {
            this.$_initPickerColumn();
          }
        },

        deep: true
      }
    },

    mounted: function mounted() {
      var _this = this;

      this.$_initPicker();

      if (this.isView) {
        this.$nextTick(function () {
          _this.column.refresh();
        });
      }
    },


    methods: {
      $_initPicker: function $_initPicker() {
        var _this2 = this;

        if (!this.isView && this.value) {
          this.isPickerShow = this.value;
        }

        this.column.inheritPickerApi(this, ['refresh']);

        if (this.isPickerFirstPopup) {
          this.isPickerFirstPopup = false;
        } else {
          setTimeout(function () {
            _this2.oldActivedIndexs = (0, _util.extend)([], _this2.column.activedIndexs);
          }, 100);
        }
      },
      $_initPickerColumn: function $_initPickerColumn() {
        var _this3 = this;

        if (!this.isCascade) {
          return;
        }

        var defaultIndex = this.$_getDefaultIndex();
        var defaultValue = this.$_getDefaultValue();

        this.$nextTick(function () {
          (0, _cascade2.default)(_this3.column, {
            currentLevel: -1,
            maxLevel: _this3.cols,
            values: _this3.data || [],
            defaultIndex: defaultIndex,
            defaultValue: defaultValue
          });
        });
      },
      $_resetPickerColumn: function $_resetPickerColumn() {
        this.$_initPickerColumn();
      },
      $_getDefaultIndex: function $_getDefaultIndex() {
        return this.oldActivedIndexs || this.defaultIndex;
      },
      $_getDefaultValue: function $_getDefaultValue() {
        return this.oldActivedIndexs ? [] : this.defaultValue;
      },
      $_onPickerConfirm: function $_onPickerConfirm() {
        var column = this.column;
        var columnValues = column.getColumnValues();
        var isScrolling = false;
        column.scrollers.forEach(function (scroller) {
          if (scroller._isAnimating !== false || scroller._isDecelerating !== false || scroller._isDragging !== false || scroller._isGesturing !== false) {
            isScrolling = true;
            return false;
          }
        });

        if (!isScrolling) {
          this.isPickerShow = false;
          this.$emit('confirm', columnValues);
        }
      },
      $_onPickerInitialed: function $_onPickerInitialed() {
        this.$emit('initialed');
      },
      $_onPickerCancel: function $_onPickerCancel() {
        var _this4 = this;

        this.isPickerShow = false;
        this.$emit('cancel');

        this.$nextTick(function () {
          _this4.$_resetPickerColumn();
          _this4.column.refresh();
        });
      },
      $_onPickerChange: function $_onPickerChange(columnIndex, itemIndex, values) {
        var _this5 = this;

        if (this.isCascade) {
          (0, _cascade2.default)(this.column, {
            currentLevel: columnIndex,
            maxLevel: this.cols,
            values: values
          }, function () {
            _this5.column.refresh(null, columnIndex + 1);
          });
        }

        this.$emit('change', columnIndex, itemIndex, values);
      },
      $_onPickerBeforeShow: function $_onPickerBeforeShow() {
        var _this6 = this;

        if (!this.isScrollInitialed) {
          this.$nextTick(function () {
            _this6.column.refresh();
          });
        }
      },
      $_onPickerHide: function $_onPickerHide() {
        this.$emit('hide');
      },
      $_onPickerShow: function $_onPickerShow() {
        this.$emit('show');
      },
      refresh: function refresh() {
        this.column.isScrollInitialed = false;

        if (this.isView || this.isPickerShow) {
          this.column.refresh.apply(this.column, arguments);
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-picker",class:{'with-popup': !_vm.isView}},[(_vm.isView)?[_c('md-picker-column',{ref:"pickerColumn",attrs:{"data":_vm.data,"default-value":_vm.defaultValue,"default-index":_vm.defaultIndex,"invalid-index":_vm.invalidIndex,"line-height":_vm.lineHeight,"keep-index":_vm.keepIndex,"cols":_vm.cols},on:{"initialed":function($event){return _vm.$emit('initialed')},"change":_vm.$_onPickerChange}})]:[_c('md-popup',{ref:"popup",staticClass:"inner-popup",attrs:{"position":"bottom","mask-closable":_vm.maskClosable,"prevent-scroll":""},on:{"beforeShow":_vm.$_onPickerBeforeShow,"show":_vm.$_onPickerShow,"hide":_vm.$_onPickerHide,"maskClick":_vm.$_onPickerCancel},model:{value:(_vm.isPickerShow),callback:function ($$v) {_vm.isPickerShow=$$v},expression:"isPickerShow"}},[_c('md-popup-title-bar',{attrs:{"title":_vm.title,"describe":_vm.describe,"ok-text":_vm.okText,"cancel-text":_vm.cancelText,"large-radius":_vm.largeRadius},on:{"confirm":_vm.$_onPickerConfirm,"cancel":_vm.$_onPickerCancel}}),_vm._v(" "),_c('md-picker-column',{ref:"pickerColumn",attrs:{"data":_vm.data,"default-value":_vm.$_getDefaultValue(),"default-index":_vm.$_getDefaultIndex(),"invalid-index":_vm.invalidIndex,"line-height":_vm.lineHeight,"keep-index":_vm.keepIndex,"cols":_vm.cols},on:{"initialed":_vm.$_onPickerInitialed,"change":_vm.$_onPickerChange}})],1)]],2)}
__vue__options__.staticRenderFns = []
