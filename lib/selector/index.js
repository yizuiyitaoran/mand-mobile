;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../popup', '../popup/title-bar', '../popup/mixins', '../popup/mixins/title-bar', '../radio-list', '../radio/mixins', '../scroll-view', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../popup'), require('../popup/title-bar'), require('../popup/mixins'), require('../popup/mixins/title-bar'), require('../radio-list'), require('../radio/mixins'), require('../scroll-view'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.popup, global.titleBar, global.mixins, global.titleBar, global.radioList, global.mixins, global.scrollView, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _icon, _popup, _titleBar, _mixins, _titleBar3, _radioList, _mixins3, _scrollView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _icon2 = _interopRequireDefault(_icon);

  var _popup2 = _interopRequireDefault(_popup);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  var _mixins2 = _interopRequireDefault(_mixins);

  var _titleBar4 = _interopRequireDefault(_titleBar3);

  var _radioList2 = _interopRequireDefault(_radioList);

  var _mixins4 = _interopRequireDefault(_mixins3);

  var _scrollView2 = _interopRequireDefault(_scrollView);

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
    name: 'md-selector',

    mixins: [_mixins2.default, _titleBar4.default, _mixins4.default],

    components: (_components = {}, _defineProperty(_components, _icon2.default.name, _icon2.default), _defineProperty(_components, _radioList2.default.name, _radioList2.default), _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _titleBar2.default.name, _titleBar2.default), _defineProperty(_components, _scrollView2.default.name, _scrollView2.default), _components),

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
      }

    },

    data: function data() {
      return {
        isSelectorShow: this.value,
        radioKey: Date.now(),
        activeIndex: -1,
        tmpActiveIndex: -1
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
      }
    },

    methods: {
      $_setScroller: function $_setScroller() {
        this.$refs.scroll.reflowScroller();
      },
      $_onSelectorConfirm: function $_onSelectorConfirm() {
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
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-selector",class:{
    'is-normal': !_vm.isCheck,
    'is-check': _vm.isCheck
  }},[_c('md-popup',{staticClass:"inner-popup",attrs:{"position":"bottom","mask-closable":_vm.maskClosable},on:{"show":_vm.$_onSelectorShow,"hide":_vm.$_onSelectorHide,"maskClick":_vm.$_onSelectorCancel},model:{value:(_vm.isSelectorShow),callback:function ($$v) {_vm.isSelectorShow=$$v},expression:"isSelectorShow"}},[_c('md-popup-title-bar',{attrs:{"title":_vm.title,"describe":_vm.describe,"ok-text":_vm.okText,"cancel-text":_vm.cancelText},on:{"confirm":_vm.$_onSelectorConfirm,"cancel":_vm.$_onSelectorCancel}},[(!_vm.isCheck && !_vm.isNeedConfirm && !_vm.cancelText)?_c('md-icon',{attrs:{"slot":"cancel","name":"close","size":"lg"},slot:"cancel"}):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"md-selector-container"},[_c('md-scroll-view',{ref:"scroll",style:({
          maxHeight: ("" + _vm.maxHeight),
          minHeight: ("" + _vm.minHeight)
        }),attrs:{"scrolling-x":false}},[_c('md-radio-list',{key:_vm.radioKey,ref:"radio",staticClass:"md-selector-list",attrs:{"value":_vm.defaultValue,"options":_vm.data,"is-slot-scope":_vm.hasSlot,"icon":_vm.icon,"icon-disabled":_vm.iconDisabled,"icon-inverse":_vm.iconInverse,"icon-position":_vm.iconPosition,"icon-size":_vm.iconSize,"icon-svg":_vm.iconSvg},on:{"change":_vm.$_onSelectorChoose},scopedSlots:_vm._u([{key:"default",fn:function(ref){
        var option = ref.option;
return [_vm._t("default",null,{"option":option})]}}],null,true)})],1)],1)],1)],1)}
__vue__options__.staticRenderFns = []
