;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../field-item', '../number-keyboard', './cursor', '../_util', '../_util/formate-value', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../field-item'), require('../number-keyboard'), require('./cursor'), require('../_util'), require('../_util/formate-value'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.fieldItem, global.numberKeyboard, global.cursor, global._util, global.formateValue, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _icon, _fieldItem, _numberKeyboard, _cursor, _util, _formateValue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _icon2 = _interopRequireDefault(_icon);

  var _fieldItem2 = _interopRequireDefault(_fieldItem);

  var _numberKeyboard2 = _interopRequireDefault(_numberKeyboard);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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
    name: 'md-input-item',

    components: (_components = {}, _defineProperty(_components, _icon2.default.name, _icon2.default), _defineProperty(_components, _fieldItem2.default.name, _fieldItem2.default), _defineProperty(_components, _numberKeyboard2.default.name, _numberKeyboard2.default), _components),

    inject: {
      rootField: {
        from: 'rootField',
        default: function _default() {
          return {};
        }
      }
    },

    props: {
      type: {
        type: String,
        default: 'text'
      },
      previewType: {
        type: String,
        default: ''
      },
      name: {
        type: [String, Number],
        default: function _default() {
          return (0, _util.randomId)('input-item');
        }
      },
      title: {
        type: String,
        default: ''
      },
      brief: {
        type: String,
        default: ''
      },
      value: {
        type: [String, Number],
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      maxlength: {
        type: [String, Number],
        default: ''
      },
      size: {
        type: String,
        default: 'normal'
      },
      align: {
        type: String,
        default: 'left'
      },
      error: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      solid: {
        type: Boolean,
        default: true
      },
      clearable: {
        type: Boolean,
        default: false
      },
      isVirtualKeyboard: {
        type: Boolean,
        default: false
      },
      virtualKeyboardDisorder: {
        type: Boolean
      },
      virtualKeyboardOkText: {
        type: String
      },
      virtualKeyboardVm: {
        type: [Object, String],
        default: null
      },
      isTitleLatent: {
        type: Boolean,
        default: false
      },
      isFormative: {
        type: Boolean,
        default: false
      },
      isHighlight: {
        type: Boolean,
        default: false
      },
      isAmount: {
        type: Boolean,
        default: false
      },
      formation: {
        type: Function,
        default: _util.noop
      }
    },

    data: function data() {
      return {
        inputValue: '',
        inputBindValue: '',
        inputNumberKeyboard: '',
        isInputFocus: false,
        isInputEditing: false,
        isPreview: false
      };
    },


    computed: {
      inputItemType: function inputItemType() {
        return (this.isPreview ? this.previewType : this.type) || 'text';
      },
      inputType: function inputType() {
        var inputType = this.inputItemType || 'text';
        if (inputType === 'bankCard' || inputType === 'phone' || inputType === 'digit') {
          inputType = 'tel';
        } else if (inputType === 'money') {
          inputType = 'text';
        }
        return inputType;
      },
      inputMaxLength: function inputMaxLength() {
        if (this.inputItemType === 'phone') {
          return 11;
        } else {
          return this.maxlength;
        }
      },
      inputPlaceholder: function inputPlaceholder() {
        return this.isTitleLatent && this.isInputActive ? '' : this.placeholder;
      },
      isInputActive: function isInputActive() {
        return !this.isInputEmpty || this.isInputFocus;
      },
      isInputEmpty: function isInputEmpty() {
        return !this.inputValue.length;
      },
      isInputFormative: function isInputFormative() {
        var type = this.inputItemType;
        return this.isFormative || type === 'bankCard' || type === 'phone' || type === 'money' || type === 'digit';
      },
      isDisabled: function isDisabled() {
        return this.rootField.disabled || this.disabled;
      }
    },

    watch: {
      value: function value(val) {
        if (val !== this.$_trimValue(this.inputValue)) {
          this.inputValue = this.$_formateValue(this.$_subValue(val + '')).value;
        }
      },

      previewType: {
        handler: function handler(val) {
          this.isPreview = !!val;
        },

        immediate: true
      },
      inputValue: function inputValue(val) {
        this.inputBindValue = val;
        val = this.isInputFormative ? this.$_trimValue(val) : val;
        if (val !== this.value) {
          this.$emit('input', val);
          this.$emit('change', this.name, val);
        }
      },
      isInputFocus: function isInputFocus(val) {
        if (!this.isVirtualKeyboard || !this.inputNumberKeyboard) {
          return;
        }
        if (val) {
          this.inputNumberKeyboard.show();
          this.$emit('focus', this.name);
        } else {
          this.inputNumberKeyboard.hide();
          this.$emit('blur', this.name);
        }
      }
    },
    created: function created() {
      this.inputValue = this.$_formateValue(this.$_subValue(this.value + '')).value;
    },
    mounted: function mounted() {
      var _this = this;

      this.isVirtualKeyboard && this.$nextTick(function () {
        _this.$_initNumberKeyBoard();
      });
    },
    beforeDestroy: function beforeDestroy() {
      var keyboard = this.inputNumberKeyboard;
      if (keyboard && keyboard.$el) {
        document.body.removeChild(keyboard.$el);
      }
    },


    methods: {
      $_formateValue: function $_formateValue(curValue) {
        var curPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var type = this.inputItemType;
        var name = this.name;
        var oldValue = this.inputValue;
        var isAdd = oldValue.length > curValue.length ? -1 : 1;

        var formateValue = { value: curValue, range: curPos };

        if (!this.isInputFormative || curValue === '') {
          return formateValue;
        }

        var customValue = this.formation(name, curValue, curPos);

        if (customValue) {
          return customValue;
        }

        var gap = ' ';
        switch (type) {
          case 'bankCard':
            curValue = this.$_subValue((0, _formateValue.trimValue)(curValue.replace(/\D/g, '')));
            formateValue = (0, _formateValue.formatValueByGapStep)(4, curValue, gap, 'left', curPos, isAdd, oldValue);
            break;
          case 'phone':
            curValue = this.$_subValue((0, _formateValue.trimValue)(curValue.replace(/\D/g, '')));
            formateValue = (0, _formateValue.formatValueByGapRule)('3|4|4', curValue, gap, curPos, isAdd);
            break;
          case 'money':
            gap = ',';
            curValue = this.$_subValue((0, _formateValue.trimValue)(curValue.replace(/[^\d.]/g, '')));

            var dotPos = curValue.indexOf('.');

            var moneyCurValue = curValue.split('.')[0];
            var moneyCurDecimal = ~dotPos ? '.' + curValue.split('.')[1] : '';

            formateValue = (0, _formateValue.formatValueByGapStep)(3, (0, _formateValue.trimValue)(moneyCurValue, gap), gap, 'right', curPos, isAdd, oldValue.split('.')[0]);
            formateValue.value += moneyCurDecimal;
            break;
          case 'digit':
            curValue = this.$_subValue((0, _formateValue.trimValue)(curValue.replace(/\D/g, '')));
            formateValue.value = curValue;
            break;

          default:
            break;
        }

        return formateValue;
      },
      isInputError: function isInputError() {
        return this.$slots.error || this.error !== '';
      },
      isInputBrief: function isInputBrief() {
        return this.$slots.brief || this.brief !== '';
      },
      $_trimValue: function $_trimValue(val) {
        return (0, _formateValue.trimValue)(val, '\\s|,');
      },
      $_subValue: function $_subValue(val) {
        var len = this.inputMaxLength;
        if (len !== '') {
          return val.substring(0, len);
        } else {
          return val;
        }
      },
      $_startEditInput: function $_startEditInput() {
        this.isInputEditing = true;
        this.$_stopEditInput();
      },

      $_stopEditInput: (0, _util.debounce)(function () {
        this.isInputEditing = false;
      }, 500),
      $_clearInput: function $_clearInput() {
        this.inputValue = '';
        !this.isTitleLatent && this.focus();
        this.isPreview = false;
      },
      $_stopPreview: function $_stopPreview() {
        this.$_clearInput();
        this.$emit('update:previewType', '');
      },
      $_focusFakeInput: function $_focusFakeInput() {
        var _this2 = this;

        this.isInputFocus = true;

        setTimeout(function () {
          _this2.$_addBlurListener();
        }, 0);
      },
      $_blurFakeInput: function $_blurFakeInput() {
        this.isInputFocus = false;
        this.$_removeBlurListener();
      },
      $_addBlurListener: function $_addBlurListener() {
        document.addEventListener('click', this.$_blurFakeInput, false);
      },
      $_removeBlurListener: function $_removeBlurListener() {
        document.removeEventListener('click', this.$_blurFakeInput, false);
      },
      $_initNumberKeyBoard: function $_initNumberKeyBoard() {
        var keyboard = (_typeof(this.virtualKeyboardVm) === 'object' ? this.virtualKeyboardVm : this.$vnode.context.$refs[this.virtualKeyboardVm]) || this.$refs['number-keyboard'];

        if (Array.isArray(keyboard)) {
          keyboard = keyboard[0];
        }

        keyboard.$on('enter', this.$_onNumberKeyBoardEnter);
        keyboard.$on('delete', this.$_onNumberKeyBoardDelete);
        keyboard.$on('confirm', this.$_onNumberKeyBoardConfirm);
        this.inputNumberKeyboard = keyboard;
        document.body.appendChild(keyboard.$el);
      },
      $_onInput: function $_onInput(event) {
        var formateValue = this.$_formateValue(event.target.value, this.isInputFormative ? (0, _cursor.getCursorsPosition)(event.target) : 0);

        this.inputValue = formateValue.value;
        this.inputBindValue = formateValue.value;

        if (this.isInputFormative) {
          this.$nextTick(function () {
            (0, _cursor.setCursorsPosition)(event.target, formateValue.range);
          });
        }
      },
      $_onKeyup: function $_onKeyup(event) {
        this.$emit('keyup', this.name, event);
        if (+event.keyCode === 13 || +event.keyCode === 108) {
          this.$emit('confirm', this.name, this.inputValue);
        }
      },
      $_onKeydown: function $_onKeydown(event) {
        this.$emit('keydown', this.name, event);
        if (!(+event.keyCode === 13 || +event.keyCode === 108)) {
          this.$_startEditInput();
          this.isPreview && this.$_stopPreview();
        }
      },
      $_onFocus: function $_onFocus() {
        this.isInputFocus = true;
        this.$emit('focus', this.name);
      },
      $_onBlur: function $_onBlur() {
        var _this3 = this;

        setTimeout(function () {
          _this3.isInputFocus = false;
          _this3.$emit('blur', _this3.name);
        }, 100);
      },
      $_onFakeInputClick: function $_onFakeInputClick(event) {
        if (this.isDisabled || this.readonly) {
          return;
        }

        this.$_blurFakeInput();

        if (!this.isInputFocus) {
          this.$_focusFakeInput(event);
        }
      },
      $_onNumberKeyBoardEnter: function $_onNumberKeyBoardEnter(val) {
        if (this.isPreview) {
          this.$_stopPreview();
        }
        if (this.inputMaxLength > 0 && this.$_trimValue(this.inputValue).length >= this.inputMaxLength) {
          return;
        }
        this.inputValue = this.$_formateValue(this.inputValue + val).value;
        this.$_startEditInput();
      },
      $_onNumberKeyBoardDelete: function $_onNumberKeyBoardDelete() {
        var inputValue = this.inputValue;
        if (inputValue === '') {
          return;
        }
        this.inputValue = this.$_formateValue(inputValue.substring(0, inputValue.length - 1)).value;
        this.$_startEditInput();
        if (this.isPreview) {
          this.$_stopPreview();
        }
      },
      $_onNumberKeyBoardConfirm: function $_onNumberKeyBoardConfirm() {
        this.$emit('confirm', this.name, this.inputValue);
      },
      focus: function focus() {
        var _this4 = this;

        if (this.isVirtualKeyboard) {
          this.$_onFakeInputClick();
        } else {
          this.$el.querySelector('.md-input-item-input').focus();
          setTimeout(function () {
            _this4.isInputFocus = true;
          }, 200);
        }
      },
      blur: function blur() {
        if (this.isVirtualKeyboard) {
          this.$_blurFakeInput();
        } else {
          this.$el.querySelector('.md-input-item-input').blur();
          this.isInputFocus = false;
        }
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
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-field-item',{staticClass:"md-input-item",class:[
    _vm.isHighlight ? 'is-highlight' : '',
    _vm.isTitleLatent ? 'is-title-latent' : '',
    _vm.isInputActive ? 'is-active' : '',
    _vm.isInputFocus ? 'is-focus' : '',
    _vm.isInputError() ? 'is-error' : '',
    _vm.isInputBrief() && !_vm.isInputError() ? 'with-brief' : '',
    _vm.isDisabled ? 'is-disabled': '',
    _vm.isAmount ? 'is-amount': '',
    _vm.clearable ? 'is-clear' : '',
    _vm.align,
    _vm.size
  ],attrs:{"title":_vm.title,"solid":_vm.solid && !_vm.isTitleLatent}},[_c('template',{slot:"left"},[_vm._t("left")],2),_vm._v(" "),(!_vm.isVirtualKeyboard)?[((_vm.inputType)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputBindValue),expression:"inputBindValue"}],staticClass:"md-input-item-input",attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"disabled":_vm.isDisabled,"readonly":_vm.readonly,"maxlength":_vm.isInputFormative ? '' : _vm.maxlength,"autocomplete":"off","type":"checkbox"},domProps:{"checked":Array.isArray(_vm.inputBindValue)?_vm._i(_vm.inputBindValue,null)>-1:(_vm.inputBindValue)},on:{"focus":_vm.$_onFocus,"blur":_vm.$_onBlur,"keyup":_vm.$_onKeyup,"keydown":_vm.$_onKeydown,"input":_vm.$_onInput,"change":function($event){var $$a=_vm.inputBindValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.inputBindValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.inputBindValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.inputBindValue=$$c}}}}):((_vm.inputType)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputBindValue),expression:"inputBindValue"}],staticClass:"md-input-item-input",attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"disabled":_vm.isDisabled,"readonly":_vm.readonly,"maxlength":_vm.isInputFormative ? '' : _vm.maxlength,"autocomplete":"off","type":"radio"},domProps:{"checked":_vm._q(_vm.inputBindValue,null)},on:{"focus":_vm.$_onFocus,"blur":_vm.$_onBlur,"keyup":_vm.$_onKeyup,"keydown":_vm.$_onKeydown,"input":_vm.$_onInput,"change":function($event){_vm.inputBindValue=null}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputBindValue),expression:"inputBindValue"}],staticClass:"md-input-item-input",attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"disabled":_vm.isDisabled,"readonly":_vm.readonly,"maxlength":_vm.isInputFormative ? '' : _vm.maxlength,"autocomplete":"off","type":_vm.inputType},domProps:{"value":(_vm.inputBindValue)},on:{"focus":_vm.$_onFocus,"blur":_vm.$_onBlur,"keyup":_vm.$_onKeyup,"keydown":_vm.$_onKeydown,"input":[function($event){if($event.target.composing){ return; }_vm.inputBindValue=$event.target.value},_vm.$_onInput]}})]:[_c('div',{staticClass:"md-input-item-fake",class:{
        'is-focus': _vm.isInputFocus,
        'is-waiting': !_vm.isInputEditing,
        'disabled': _vm.isDisabled,
        'readonly': _vm.readonly
      },on:{"click":_vm.$_onFakeInputClick}},[_c('span',{domProps:{"textContent":_vm._s(_vm.inputValue)}}),_vm._v(" "),(_vm.inputValue === '' && _vm.inputPlaceholder !== '')?_c('span',{staticClass:"md-input-item-fake-placeholder",domProps:{"textContent":_vm._s(_vm.inputPlaceholder)}}):_vm._e()])],_vm._v(" "),_c('template',{slot:"right"},[(_vm.clearable && !_vm.isDisabled && !_vm.readonly)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isInputEmpty && _vm.isInputFocus),expression:"!isInputEmpty && isInputFocus"}],staticClass:"md-input-item-clear",on:{"click":_vm.$_clearInput}},[_c('md-icon',{attrs:{"name":"clear"}})],1):_vm._e(),_vm._v(" "),_vm._t("right")],2),_vm._v(" "),_c('template',{slot:"children"},[(_vm.isInputError())?_c('div',{staticClass:"md-input-item-msg"},[(_vm.error !== '')?_c('p',{domProps:{"textContent":_vm._s(_vm.error)}}):_vm._t("error")],2):_vm._e(),_vm._v(" "),(_vm.isInputBrief() && !_vm.isInputError())?_c('div',{staticClass:"md-input-item-brief"},[(_vm.brief !== '')?_c('p',{domProps:{"textContent":_vm._s(_vm.brief)}}):_vm._t("brief")],2):_vm._e(),_vm._v(" "),(_vm.isVirtualKeyboard && !_vm.virtualKeyboardVm)?_c('md-number-keyboard',{ref:"number-keyboard",staticClass:"md-input-item-number-keyboard",attrs:{"id":(_vm.name + "-number-keyboard"),"ok-text":_vm.virtualKeyboardOkText,"disorder":_vm.virtualKeyboardDisorder}}):_vm._e()],1)],2)}
__vue__options__.staticRenderFns = []
