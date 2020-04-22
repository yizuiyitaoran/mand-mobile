;(function(){


import Transition from '../transition';
import popupMixin from './mixins';

export default {
  name: 'md-popup',

  mixins: [popupMixin],

  components: {
    'md-transition': Transition
  },

  props: {
    position: {
      type: String,
      default: 'center'
    },
    transition: {
      type: String,
      default: function _default() {
        switch (this.position) {
          case 'bottom':
            return 'md-slide-up';

          case 'top':
            return 'md-slide-down';

          case 'left':
            return 'md-slide-right';

          case 'right':
            return 'md-slide-left';
          default:
            return 'md-fade';}
      }
    },
    preventScroll: {
      type: Boolean,
      default: false
    },
    preventScrollExclude: {
      type: [String, Function],
      default: function _default() {
        return '';
      }
    }
  },

  data: function data() {
    return {
      isPopupShow: false,

      isPopupBoxShow: false,

      isAnimation: false,
      largeRadius: false
    };
  },


  watch: {
    value: function value(val) {
      var _this = this;

      if (val) {
        if (this.isAnimation) {
          setTimeout(function () {
            _this.$_showPopupBox();
          }, 50);
        } else {
          this.$_showPopupBox();
        }
      } else {
        this.$_hidePopupBox();
      }
    },
    preventScrollExclude: function preventScrollExclude(val, oldVal) {
      this.$_preventScrollExclude(false, oldVal);

      this.$_preventScrollExclude(true, val);
    }
  },

  mounted: function mounted() {
    this.value && this.$_showPopupBox();
  },


  methods: {
    $_showPopupBox: function $_showPopupBox() {
      this.isPopupShow = true;
      this.isAnimation = true;

      this.isPopupBoxShow = true;

      if (process.env.NODE_ENV === 'test') {
        this.$_onPopupTransitionStart();
        this.$_onPopupTransitionEnd();
      }

      this.preventScroll && this.$_preventScroll(true);
    },
    $_hidePopupBox: function $_hidePopupBox() {
      this.isAnimation = true;
      this.isPopupBoxShow = false;
      this.preventScroll && this.$_preventScroll(false);
      this.$emit('input', false);

      if (process.env.NODE_ENV === 'test') {
        this.$_onPopupTransitionStart();
        this.$_onPopupTransitionEnd();
      }
    },
    $_preventScroll: function $_preventScroll(isBind) {
      var handler = isBind ? 'addEventListener' : 'removeEventListener';
      var masker = this.$el.querySelector('.md-popup-mask');
      var boxer = this.$el.querySelector('.md-popup-box');

      masker && masker[handler]('touchmove', this.$_preventDefault, false);
      boxer && boxer[handler]('touchmove', this.$_preventDefault, false);
      this.$_preventScrollExclude(isBind);
    },
    $_preventScrollExclude: function $_preventScrollExclude(isBind, preventScrollExclude) {
      var handler = isBind ? 'addEventListener' : 'removeEventListener';
      preventScrollExclude = preventScrollExclude || this.preventScrollExclude;
      var excluder = preventScrollExclude && typeof preventScrollExclude === 'string' ? this.$el.querySelector(preventScrollExclude) : preventScrollExclude;
      excluder && excluder[handler]('touchmove', this.$_stopImmediatePropagation, false);
    },
    $_preventDefault: function $_preventDefault(event) {
      event.preventDefault();
    },
    $_stopImmediatePropagation: function $_stopImmediatePropagation(event) {
      event.stopImmediatePropagation();
    },
    $_onPopupTransitionStart: function $_onPopupTransitionStart() {
      if (!this.isPopupBoxShow) {
        this.$emit('beforeHide');
        this.$emit('before-hide');
      } else {
        this.$emit('beforeShow');
        this.$emit('before-show');
      }
    },
    $_onPopupTransitionEnd: function $_onPopupTransitionEnd() {
      if (!this.isAnimation) {
        return;
      }

      if (!this.isPopupBoxShow) {
        this.isPopupShow = false;
        this.$emit('hide');
      } else {
        this.$emit('show');
      }

      this.isAnimation = false;
    },
    $_onPopupMaskClick: function $_onPopupMaskClick() {
      if (this.maskClosable) {
        this.$_hidePopupBox();
        this.$emit('maskClick');
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isPopupShow),expression:"isPopupShow"}],staticClass:"md-popup",class:[
    _vm.hasMask ? 'with-mask' : '',
    _vm.largeRadius ? 'large-radius' : '',
    _vm.position
  ]},[_c('transition',{attrs:{"name":"md-mask-fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasMask && _vm.isPopupBoxShow),expression:"hasMask && isPopupBoxShow"}],staticClass:"md-popup-mask",on:{"click":_vm.$_onPopupMaskClick}})]),_vm._v(" "),_c('md-transition',{attrs:{"name":_vm.transition},on:{"before-enter":_vm.$_onPopupTransitionStart,"before-leave":_vm.$_onPopupTransitionStart,"after-enter":_vm.$_onPopupTransitionEnd,"after-leave":_vm.$_onPopupTransitionEnd}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isPopupBoxShow),expression:"isPopupBoxShow"}],staticClass:"md-popup-box",class:[
        _vm.transition
      ]},[_vm._t("default")],2)])],1)}
__vue__options__.staticRenderFns = []
