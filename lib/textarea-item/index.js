;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../field-item', '../icon', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../field-item'), require('../icon'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fieldItem, global.icon, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _fieldItem, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _fieldItem2 = _interopRequireDefault(_fieldItem);

  var _icon2 = _interopRequireDefault(_icon);

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
    name: 'md-textarea-item',
    components: (_components = {}, _defineProperty(_components, _fieldItem2.default.name, _fieldItem2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _components),
    props: {
      title: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      maxLength: {
        type: [String, Number],
        default: ''
      },
      maxHeight: {
        type: [String, Number],
        default: ''
      },
      solid: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      rows: {
        type: [String, Number],
        default: '3'
      },
      autosize: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        defalut: ''
      }
    },
    data: function data() {
      return {
        maxHeightInner: this.maxHeight,
        inputValue: this.value,
        isInputFocus: false
      };
    },

    computed: {
      isDisabled: function isDisabled() {
        return this.disabled;
      },
      errorInfo: function errorInfo() {
        return this.error;
      },
      isInputEmpty: function isInputEmpty() {
        return !this.inputValue.length;
      }
    },
    watch: {
      value: function value(val) {
        var _this = this;

        this.inputValue = val;
        this.$nextTick(function () {
          _this.resizeTextarea();
        });
      },
      inputValue: function inputValue(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      },
      maxHeight: function maxHeight(val) {
        this.maxHeightInner = val;
        this.resizeTextarea();
      }
    },
    mounted: function mounted() {
      this.resizeTextarea();
    },

    methods: {
      $_onInput: function $_onInput(event) {
        var _this2 = this;

        this.inputValue = event.target.value;

        this.$nextTick(function () {
          _this2.resizeTextarea();
        });
      },
      $_clearInput: function $_clearInput() {
        var _this3 = this;

        this.inputValue = '';
        this.$nextTick(function () {
          _this3.resizeTextarea();
        });
        this.focus();
      },
      $_onKeyup: function $_onKeyup(event) {
        this.$emit('keyup', event);
      },
      $_onKeydown: function $_onKeydown(event) {
        this.$emit('keydown', event);
      },
      $_onFocus: function $_onFocus() {
        this.isInputFocus = true;
        this.$emit('focus');
      },
      $_onBlur: function $_onBlur() {
        var _this4 = this;

        setTimeout(function () {
          _this4.isInputFocus = false;
          _this4.$emit('blur');
        }, 100);
      },
      $_calcTextareaHeight: function $_calcTextareaHeight(textarea) {
        textarea.style.height = 'auto';

        var scrollHeight = textarea.scrollHeight;

        if (scrollHeight === 0) {
          return;
        }

        if (this.maxHeightInner && scrollHeight > this.maxHeightInner) {
          scrollHeight = this.maxHeightInner;
        }

        textarea.style.height = scrollHeight + 'px';
      },
      resizeTextarea: function resizeTextarea() {
        if (this.autosize) {
          this.$_calcTextareaHeight(this.$refs.textarea);
        }
      },
      focus: function focus() {
        var _this5 = this;

        this.$refs.textarea.focus();
        setTimeout(function () {
          _this5.isInputFocus = true;
        }, 200);
      },
      blur: function blur() {
        this.$refs.textarea.blur();
        this.isInputFocus = false;
      },
      getValue: function getValue() {
        return this.inputValue;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-field-item',{staticClass:"md-textarea-item",class:[
    _vm.isDisabled ? 'is-disabled' : '',
    _vm.errorInfo ? 'is-error' : ''
  ],attrs:{"title":_vm.title,"solid":_vm.solid}},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"textarea",staticClass:"md-textarea-item__textarea",attrs:{"disabled":_vm.isDisabled,"readonly":_vm.readonly,"maxlength":_vm.maxLength,"placeholder":_vm.placeholder,"rows":_vm.rows},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value},_vm.$_onInput],"focus":_vm.$_onFocus,"blur":_vm.$_onBlur,"keyup":_vm.$_onKeyup,"keydown":_vm.$_onKeydown}}),_vm._v(" "),_vm._t("footer"),_vm._v(" "),_c('template',{slot:"right"},[(_vm.clearable && !_vm.isDisabled && !_vm.readonly)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isInputEmpty && _vm.isInputFocus),expression:"!isInputEmpty && isInputFocus"}],staticClass:"md-textarea-item__clear",on:{"click":_vm.$_clearInput}},[_c('md-icon',{attrs:{"name":"clear"}})],1):_vm._e(),_vm._v(" "),_vm._t("right")],2),_vm._v(" "),_c('template',{slot:"children"},[(_vm.errorInfo)?_c('div',{staticClass:"md-textarea-item-msg"},[_c('p',[_vm._v(_vm._s(_vm.errorInfo))])]):_vm._e()])],2)}
__vue__options__.staticRenderFns = []
