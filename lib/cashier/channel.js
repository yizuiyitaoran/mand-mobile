;(function(){
var _components;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Button from '../button';
import Icon from '../icon';
import ChannelItem from './channel-item';

export default {
  name: 'md-cashier-channel',

  components: (_components = {}, _defineProperty(_components, Button.name, Button), _defineProperty(_components, Icon.name, Icon), _defineProperty(_components, ChannelItem.name, ChannelItem), _components),

  props: ['paymentTitle', 'paymentAmount', 'paymentDescribe', 'moreButtonText', 'payButtonText', 'payButtonDisabled', 'channels', 'channelLimit', 'defaultIndex'],

  data: function data() {
    return {
      isChannelShow: false,
      isChannelActive: false,
      activeChannelIndex: -1
    };
  },
  created: function created() {
    this.activeChannelIndex = this.defaultIndex;
  },


  computed: {
    isSingle: function isSingle() {
      if (this.channelLimit < 1) {
        return true;
      }
      return !(this.channels.length > this.channelLimit);
    }
  },

  watch: {
    defaultIndex: function defaultIndex(val) {
      this.activeChannelIndex = val;
    }
  },

  methods: {
    $_onChannelItemClick: function $_onChannelItemClick(item, index) {
      if (item.disabled) {
        return;
      }
      this.activeChannelIndex = index;
      this.$emit('select', item);
    },
    $_onChannelMoreClick: function $_onChannelMoreClick() {
      var _this = this;

      if (this.isChannelActive) {
        return;
      }
      this.isChannelShow = true;
      this.$nextTick(function () {
        _this.isChannelActive = true;
      });
    },
    $_onChannelBtnClick: function $_onChannelBtnClick() {
      var item = this.channels[this.activeChannelIndex];
      this.$emit('pay', item);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-cashier-channel"},[_c('div',{staticClass:"choose-text"},[(_vm.paymentTitle)?_c('p',{staticClass:"choose-title",domProps:{"innerHTML":_vm._s(_vm.paymentTitle)}}):_vm._e(),_vm._v(" "),(_vm.paymentAmount)?_c('p',{staticClass:"choose-number",domProps:{"innerHTML":_vm._s(_vm.paymentAmount)}}):_vm._e(),_vm._v(" "),(_vm.paymentDescribe)?_c('p',{staticClass:"choose-describe",domProps:{"innerHTML":_vm._s(_vm.paymentDescribe)}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"choose-channel",class:{active: _vm.isChannelActive}},[_vm._t("default"),_vm._v(" "),(_vm.isChannelShow || _vm.isSingle)?_c('div',{staticClass:"choose-channel-list"},[_vm._l((_vm.channels),function(item,index){return [_c('md-cashier-channel-item',{key:index,class:{default: index === _vm.defaultIndex},attrs:{"data":item,"active":index === _vm.activeChannelIndex},nativeOn:{"click":function($event){return _vm.$_onChannelItemClick(item, index)}}})]})],2):(_vm.channels[_vm.defaultIndex])?_c('div',{staticClass:"choose-channel-list"},[_c('md-cashier-channel-item',{staticClass:"default",attrs:{"data":_vm.channels[_vm.defaultIndex],"active":""},nativeOn:{"click":function($event){return _vm.$_onChannelItemClick(_vm.channels[_vm.defaultIndex], _vm.defaultIndex)}}})],1):_vm._e(),_vm._v(" "),(!_vm.isSingle)?_c('div',{staticClass:"choose-channel-more",class:{disabled: _vm.isChannelActive},domProps:{"innerHTML":_vm._s(_vm.moreButtonText)},on:{"click":_vm.$_onChannelMoreClick}}):_vm._e()],2),_vm._v(" "),_c('div',{staticClass:"md-cashier-block-btn"},[_c('md-button',{staticClass:"md-cashier-pay-button",attrs:{"type":_vm.payButtonDisabled ? 'disabled': 'primary'},on:{"click":_vm.$_onChannelBtnClick}},[_vm._t("button",[_vm._v(_vm._s(_vm.payButtonText))])],2)],1)])}
__vue__options__.staticRenderFns = []
