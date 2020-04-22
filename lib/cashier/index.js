;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../popup/title-bar', '../popup/mixins', '../popup/mixins/title-bar', '../captcha', '../icon', '../activity-indicator/roller-success', '../_util', './channel', './channel-button', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../popup/title-bar'), require('../popup/mixins'), require('../popup/mixins/title-bar'), require('../captcha'), require('../icon'), require('../activity-indicator/roller-success'), require('../_util'), require('./channel'), require('./channel-button'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.titleBar, global.mixins, global.titleBar, global.captcha, global.icon, global.rollerSuccess, global._util, global.channel, global.channelButton, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _popup, _titleBar, _mixins, _titleBar3, _captcha, _icon, _rollerSuccess, _util, _channel, _channelButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  var _mixins2 = _interopRequireDefault(_mixins);

  var _titleBar4 = _interopRequireDefault(_titleBar3);

  var _captcha2 = _interopRequireDefault(_captcha);

  var _icon2 = _interopRequireDefault(_icon);

  var _rollerSuccess2 = _interopRequireDefault(_rollerSuccess);

  var _channel2 = _interopRequireDefault(_channel);

  var _channelButton2 = _interopRequireDefault(_channelButton);

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
    name: 'md-cashier',

    mixins: [_mixins2.default, _titleBar4.default],

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _titleBar2.default.name, _titleBar2.default), _defineProperty(_components, _captcha2.default.name, _captcha2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _defineProperty(_components, _rollerSuccess2.default.name, _rollerSuccess2.default), _defineProperty(_components, _channel2.default.name, _channel2.default), _defineProperty(_components, _channelButton2.default.name, _channelButton2.default), _components),

    props: {
      channels: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      channelLimit: {
        type: Number,
        default: 2
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      paymentTitle: {
        type: String,
        default: '\u652F\u4ED8\u91D1\u989D(\u5143)' },
      paymentAmount: {
        type: String,
        default: '0.00'
      },
      paymentDescribe: {
        type: String,
        default: ''
      },
      payButtonText: {
        type: String,
        default: '\u786E\u5B9A\u652F\u4ED8' },
      payButtonDisabled: {
        type: Boolean,
        default: false
      },
      moreButtonText: {
        type: String,
        default: '\u66F4\u591A\u652F\u4ED8\u65B9\u5F0F' },
      title: {
        default: '\u652F\u4ED8' }

    },

    data: function data() {
      return {
        isCashierShow: false,
        scene: 'choose',
        sceneKey: Date.now(),
        sceneOption: {
          loading: {
            text: '\u652F\u4ED8\u7ED3\u679C\u67E5\u8BE2\u4E2D...' },
          success: {
            text: '\u652F\u4ED8\u6210\u529F',
            buttonText: '\u6211\u77E5\u9053\u4E86',
            handler: null
          },
          fail: {
            text: '\u652F\u4ED8\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5',
            buttonText: '\u6211\u77E5\u9053\u4E86',
            handler: null
          },
          captcha: {
            text: '',
            brief: '',
            maxlength: 4,
            count: 60,
            autoCountdown: true,
            onSend: _util.noop,
            onSubmit: _util.noop
          }
        }
      };
    },


    watch: {
      value: function value(val) {
        this.isCashierShow = val;
      },
      isCashierShow: function isCashierShow(val) {
        this.$emit('input', val);
      }
    },

    created: function created() {
      this.$_initialCashier();

      if (this.channels.length < 3) {
        this.isChannelShow = true;
        this.isChannelActive = true;
      }
    },


    methods: {
      $_initialCashier: function $_initialCashier() {
        this.isCashierShow = this.value;
      },
      $_resetCashier: function $_resetCashier() {
        this.scene = 'choose';
        this.isChannelShow = false;
        this.isChannelActive = false;
      },
      $_onPopupShow: function $_onPopupShow() {
        this.$emit('show');
      },
      $_onPopupHide: function $_onPopupHide() {
        this.$_resetCashier();
        this.$emit('hide');
      },
      $_onPopupCancel: function $_onPopupCancel() {
        this.isCashierShow = false;
        this.$emit('cancel');
      },
      next: function next(scene) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.sceneOption[scene]) {
          (0, _util.extend)(this.sceneOption[scene], option);
        }
        this.scene = scene;
        this.sceneKey = Date.now();
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-cashier"},[_c('md-popup',{staticClass:"inner-popup",attrs:{"position":"bottom","mask-closable":false,"prevent-scroll-exclude":".choose-channel","prevent-scroll":""},on:{"show":_vm.$_onPopupShow,"hide":_vm.$_onPopupHide},model:{value:(_vm.isCashierShow),callback:function ($$v) {_vm.isCashierShow=$$v},expression:"isCashierShow"}},[_c('md-popup-title-bar',{attrs:{"title":_vm.title,"describe":_vm.describe,"large-radius":_vm.largeRadius,"only-close":""},on:{"cancel":_vm.$_onPopupCancel}}),_vm._v(" "),_c('div',{staticClass:"md-cashier-container"},[_vm._t("header",null,{"scene":_vm.scene}),_vm._v(" "),(_vm.scene === 'choose')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block md-cashier-choose"},[_c('md-cashier-channel',_vm._g({ref:"channel",attrs:{"payment-title":_vm.paymentTitle,"payment-amount":_vm.paymentAmount,"payment-describe":_vm.paymentDescribe,"more-button-text":_vm.moreButtonText,"pay-button-text":_vm.payButtonText,"pay-button-disabled":_vm.payButtonDisabled,"channels":_vm.channels,"channelLimit":_vm.channelLimit,"default-index":_vm.defaultIndex}},_vm.$listeners),[_vm._t("channel"),_vm._v(" "),_c('template',{slot:"button"},[_vm._t("payButton")],2)],2)],1):(_vm.scene === 'captcha')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block md-cashier-captcha"},[_c('md-captcha',{ref:"captcha",attrs:{"maxlength":_vm.sceneOption.captcha.maxlength,"count":_vm.sceneOption.captcha.count,"countNormalText":_vm.sceneOption.captcha.countNormalText,"countActiveText":_vm.sceneOption.captcha.countActiveText,"auto-countdown":_vm.sceneOption.captcha.autoCountdown,"brief":_vm.sceneOption.captcha.brief,"is-view":""},on:{"send":_vm.sceneOption.captcha.onSend,"submit":_vm.sceneOption.captcha.onSubmit}},[_c('div',{domProps:{"textContent":_vm._s(_vm.sceneOption.captcha.text)}})])],1):(_vm.scene === 'loading' || _vm.scene === 'success')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block",class:{
          'md-cashier-loading': _vm.scene === 'loading',
          'md-cashier-success': _vm.scene === 'success'
        }},[_c('div',{staticClass:"md-cashier-block-icon"},[_c('md-activity-indicator-rolling-success',{ref:"rolling",attrs:{"is-success":_vm.scene === 'success'}})],1),_vm._v(" "),_c('div',{staticClass:"md-cashier-block-text"},[_vm._v(_vm._s(_vm.scene === 'success' ? _vm.sceneOption.success.text : _vm.sceneOption.loading.text))]),_vm._v(" "),(_vm.scene === 'success')?_c('md-cashier-channel-button',{attrs:{"actions":_vm.sceneOption.success.actions ||
            [{
              buttonText: _vm.sceneOption.success.buttonText,
              handler: _vm.sceneOption.success.handler
            }]}}):_vm._e()],1):(_vm.scene === 'fail')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block md-cashier-fail"},[_c('div',{staticClass:"md-cashier-block-icon"},[_c('md-icon',{attrs:{"name":"warn-color"}})],1),_vm._v(" "),_c('div',{staticClass:"md-cashier-block-text",domProps:{"textContent":_vm._s(_vm.sceneOption.fail.text)}}),_vm._v(" "),_c('md-cashier-channel-button',{attrs:{"actions":_vm.sceneOption.fail.actions ||
            [{
              buttonText: _vm.sceneOption.fail.buttonText,
              handler: _vm.sceneOption.fail.handler
            }]}})],1):(_vm.scene === 'custom')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block md-cashier-custom"},[_vm._t("scene")],2):_vm._e(),_vm._v(" "),_vm._t("footer",null,{"scene":_vm.scene})],2)],1)],1)}
__vue__options__.staticRenderFns = []
