;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _icon2 = _interopRequireDefault(_icon);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
    name: 'md-notice-bar',

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      mode: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default' },
      time: {
        type: Number,
        default: 0
      },
      round: {
        type: Boolean,
        default: false
      },
      multiRows: {
        type: Boolean,
        default: false
      },
      scrollable: {
        type: Boolean,
        default: false
      },

      icon: {
        type: String,
        default: ''
      },
      iconSvg: {
        type: Boolean,
        default: false
      },

      closable: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        isShow: true,
        overflow: false
      };
    },


    computed: {
      customLeft: function customLeft() {
        return !!this.$slots.left;
      },
      customRight: function customRight() {
        return !!this.$slots.right;
      },
      rightIcon: function rightIcon() {
        return this.mode === 'link' ? 'arrow-right' : 'close';
      }
    },

    updated: function updated() {
      this.$_checkOverflow();
    },
    mounted: function mounted() {
      if (this.time) {
        this.$_hide(this.time);
      }
      this.$_checkOverflow();
    },


    methods: {
      $_hide: function $_hide(time) {
        var _this = this;

        setTimeout(function () {
          _this.isShow = false;
        }, time);
      },
      $_close: function $_close() {
        if (this.mode === 'closable' || this.closable) {
          this.isShow = false;
        }
        this.$emit('close');
      },
      $_checkOverflow: function $_checkOverflow() {
        if (!this.scrollable) {
          return;
        }
        var _$refs = this.$refs,
            wrap = _$refs.wrap,
            content = _$refs.content;

        if (!wrap || !content) {
          return;
        }

        var paddingLeft = window.getComputedStyle(content, null).getPropertyValue('padding').split(' ')[3] || '0px';
        var left = +paddingLeft.match(/\d+/g)[0];

        this.overflow = content.scrollWidth - left > Math.ceil(wrap.getBoundingClientRect().width);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isShow)?_c('div',{staticClass:"md-notice-bar",class:[
    _vm.round && 'md-notice-bar-round',
    _vm.type
  ]},[_c('div',{staticClass:"md-notice-bar-left",class:[(!_vm.customLeft && !_vm.icon) && 'md-notice-bar-empty']},[(_vm.customLeft)?[_vm._t("left")]:(_vm.icon)?[_c('md-icon',{staticClass:"md-notice-icon",attrs:{"name":_vm.icon,"svg":_vm.iconSvg}})]:_vm._e()],2),_vm._v(" "),_c('div',{ref:"wrap",staticClass:"md-notice-bar-content",class:[
      _vm.multiRows && 'md-notice-bar-multi-content'
    ]},[_c('div',{ref:"content",class:[(_vm.overflow && _vm.scrollable) && 'md-notice-bar-content-animate']},[_vm._t("default")],2)]),_vm._v(" "),_c('div',{staticClass:"md-notice-bar-right"},[(_vm.customRight)?[_vm._t("right")]:(_vm.mode || _vm.closable)?[_c('md-icon',{staticClass:"md-notice-icon md-notice-icon-right",attrs:{"name":_vm.rightIcon},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.$_close($event)}}})]:_vm._e()],2)]):_vm._e()}
__vue__options__.staticRenderFns = []
