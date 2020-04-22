;(function(){
var _components;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Icon from '../icon';
import Popup from '../popup';
import PopupTitlebar from '../popup/title-bar';
import popupMixin from '../popup/mixins';
import popupTitleBarMixin from '../popup/mixins/title-bar';
import RadioList from '../radio-list';
import radioMixin from '../radio/mixins';
import ScrollView from '../scroll-view';
import CheckList from '../check-list';

export default {
  name: 'md-selector',

  mixins: [popupMixin, popupTitleBarMixin, radioMixin],

  components: (_components = {}, _defineProperty(_components, Icon.name, Icon), _defineProperty(_components, RadioList.name, RadioList), _defineProperty(_components, CheckList.name, CheckList), _defineProperty(_components, Popup.name, Popup), _defineProperty(_components, PopupTitlebar.name, PopupTitlebar), _defineProperty(_components, ScrollView.name, ScrollView), _components),

  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultValue: {
      default: ''
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    minHeight: {
      type: [Number, String],
      default: 'auto'
    },
    cancelText: {
      default: function _default() {
        return this.okText ? '取消' : '';
      }
    },
    iconPosition: {
      default: 'right'
    },
    multi: {
      type: Boolean,
      default: false
    },
    hideTitleBar: {
      type: Boolean,
      default: false
    }

  },

  data: function data() {
    return {
      isSelectorShow: this.value,
      radioKey: Date.now(),
      checkKey: Date.now() + 1,
      activeIndex: -1,
      tmpActiveIndex: -1,
      multiDefaultValue: []
    };
  },


  computed: {
    isNeedConfirm: function isNeedConfirm() {
      return this.okText !== '';
    },
    hasSlot: function hasSlot() {
      return !!this.$scopedSlots.default;
    }
  },

  watch: {
    value: function value(val) {
      this.isSelectorShow = val;
    },
    isSelectorShow: function isSelectorShow(val) {
      this.$emit('input', val);
    },

    defaultValue: {
      handler: function handler(val) {
        if (!this.multi || val === '') {
          return;
        }

        this.multiDefaultValue = !Array.isArray(val) ? [val] : val;
      },

      immediate: true
    }
  },

  methods: {
    $_setScroller: function $_setScroller() {
      this.$refs.scroll.reflowScroller();
    },
    $_onSelectorConfirm: function $_onSelectorConfirm() {
      if (this.multi) {
        this.$emit('confirm', this.multiDefaultValue.slice());
        this.isSelectorShow = false;
        return;
      }

      if (this.tmpActiveIndex > -1) {
        this.activeIndex = this.tmpActiveIndex;
        this.isSelectorShow = false;
        this.$emit('confirm', this.data[this.activeIndex]);
      }
    },
    $_onSelectorCancel: function $_onSelectorCancel() {
      this.isSelectorShow = false;
      this.tmpActiveIndex = this.activeIndex;

      if (this.tmpActiveIndex !== -1) {
        this.$refs.radio.selectByIndex(this.tmpActiveIndex);
      } else {
        this.radioKey = Date.now();
        this.checkKey = Date.now() + 1;
      }

      this.$emit('cancel');
    },
    $_onSelectorChoose: function $_onSelectorChoose(item, index) {
      this.tmpActiveIndex = index;
      if (!this.isNeedConfirm) {
        this.activeIndex = index;
        this.isSelectorShow = false;
      }

      this.$emit('choose', item);
    },
    $_onSelectorShow: function $_onSelectorShow() {
      this.$_setScroller();
      this.$emit('show');
    },
    $_onSelectorHide: function $_onSelectorHide() {
      this.$emit('hide');
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-selector",class:{
    'is-normal': !_vm.isCheck,
    'is-check': _vm.isCheck
  }},[_c('md-popup',{staticClass:"inner-popup",attrs:{"position":"bottom","mask-closable":_vm.maskClosable},on:{"show":_vm.$_onSelectorShow,"hide":_vm.$_onSelectorHide,"maskClick":_vm.$_onSelectorCancel},model:{value:(_vm.isSelectorShow),callback:function ($$v) {_vm.isSelectorShow=$$v},expression:"isSelectorShow"}},[_c('md-popup-title-bar',{directives:[{name:"show",rawName:"v-show",value:(!_vm.hideTitleBar || _vm.isNeedConfirm),expression:"!hideTitleBar || isNeedConfirm"}],attrs:{"title":_vm.title,"describe":_vm.describe,"ok-text":_vm.okText,"cancel-text":_vm.cancelText,"large-radius":_vm.largeRadius,"only-close":!_vm.isCheck && !_vm.isNeedConfirm && !_vm.cancelText},on:{"confirm":_vm.$_onSelectorConfirm,"cancel":_vm.$_onSelectorCancel}}),_vm._v(" "),_c('div',{staticClass:"md-selector-container"},[_c('md-scroll-view',{ref:"scroll",style:({
          maxHeight: ("" + _vm.maxHeight),
          minHeight: ("" + _vm.minHeight)
        }),attrs:{"scrolling-x":false}},[_vm._t("header"),_vm._v(" "),(!_vm.multi)?[_c('md-radio-list',{key:_vm.radioKey,ref:"radio",staticClass:"md-selector-list",attrs:{"value":_vm.defaultValue,"options":_vm.data,"is-slot-scope":_vm.hasSlot,"icon":_vm.icon,"icon-disabled":_vm.iconDisabled,"icon-inverse":_vm.iconInverse,"icon-position":_vm.iconPosition,"icon-size":_vm.iconSize,"icon-svg":_vm.iconSvg},on:{"change":_vm.$_onSelectorChoose},scopedSlots:_vm._u([{key:"default",fn:function(ref){
        var option = ref.option;
        var index = ref.index;
        var selected = ref.selected;
return [_vm._t("default",null,{"option":option,"index":index,"selected":selected})]}}],null,true)})]:[_c('md-check-list',{key:_vm.checkKey,ref:"check",staticClass:"md-selector-list",attrs:{"options":_vm.data,"is-slot-scope":_vm.hasSlot,"icon":_vm.icon,"icon-disabled":_vm.iconDisabled,"icon-inverse":_vm.iconInverse,"icon-position":_vm.iconPosition,"icon-size":_vm.iconSize,"icon-svg":_vm.iconSvg},scopedSlots:_vm._u([{key:"default",fn:function(ref){
        var option = ref.option;
        var index = ref.index;
        var selected = ref.selected;
return [_vm._t("default",null,{"option":option,"index":index,"selected":selected})]}}],null,true),model:{value:(_vm.multiDefaultValue),callback:function ($$v) {_vm.multiDefaultValue=$$v},expression:"multiDefaultValue"}})],_vm._v(" "),_vm._t("footer")],2)],1)],1)],1)}
__vue__options__.staticRenderFns = []
