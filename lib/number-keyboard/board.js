;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util', './key', '../_style/global.css', './style/board.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util'), require('./key'), require('../_style/global.css'), require('./style/board.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._util, global.key, global.global, global.board);
    global.board = mod.exports;
  }
})(this, function (exports, _util, _key) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _key2 = _interopRequireDefault(_key);

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
    name: 'md-number-keyboard-container',

    components: _defineProperty({}, _key2.default.name, _key2.default),

    props: {
      type: {
        type: String,
        default: 'professional'
      },
      disorder: {
        type: Boolean,
        default: false
      },
      hideDot: {
        type: Boolean,
        default: false
      },
      okText: {
        type: String,
        default: '确定'
      },
      isView: {
        type: Boolean
      },
      textRender: {
        type: Function,
        default: _util.noop
      }
    },

    data: function data() {
      return {
        keyNumberList: []
      };
    },


    computed: {
      dotText: function dotText() {
        return this.textRender('.') || '.';
      }
    },

    created: function created() {
      this.$_generateKeyNumber();
    },


    methods: {
      $_generateKeyNumber: function $_generateKeyNumber() {
        var _this = this;

        var baseStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var baseStackTmp = [].concat(baseStack);

        this.keyNumberList = baseStack.map(function (item) {
          var val = _this.disorder ? baseStackTmp.splice(parseInt(Math.random() * baseStackTmp.length), 1)[0] || 0 : item;
          return _this.textRender(val) || val;
        });
      },
      $_onNumberKeyClick: function $_onNumberKeyClick(val) {
        this.$emit('enter', val);
      },
      $_onDeleteClick: function $_onDeleteClick() {
        this.$emit('delete');
      },
      $_onConfirmeClick: function $_onConfirmeClick() {
        this.$emit('confirm');
      },
      $_onSlideDoneClick: function $_onSlideDoneClick() {
        this.$emit('hide');
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-number-keyboard-container",class:_vm.type},[_c('div',{staticClass:"keyboard-number"},[_c('ul',{staticClass:"keyboard-number-list"},[_vm._l((9),function(n){return _c('md-number-key',{key:n-1,staticClass:"keyboard-number-item",attrs:{"value":_vm.keyNumberList[n-1]},on:{"press":_vm.$_onNumberKeyClick}})}),_vm._v(" "),(_vm.type === 'professional')?[(!_vm.hideDot)?_c('md-number-key',{staticClass:"keyboard-number-item",attrs:{"value":_vm.dotText},on:{"press":_vm.$_onNumberKeyClick}}):_vm._e(),_vm._v(" "),_c('md-number-key',{staticClass:"keyboard-number-item",class:{'large-item': _vm.hideDot},attrs:{"value":_vm.keyNumberList[9]},on:{"press":_vm.$_onNumberKeyClick}}),_vm._v(" "),(_vm.isView)?_c('li',{staticClass:"keyboard-number-item"}):_c('md-number-key',{staticClass:"keyboard-number-item slidedown",attrs:{"no-touch":"","no-prevent":""},on:{"press":_vm.$_onSlideDoneClick}})]:[_c('li',{staticClass:"keyboard-number-item no-bg"}),_vm._v(" "),_c('md-number-key',{staticClass:"keyboard-number-item",attrs:{"value":_vm.keyNumberList[9]},on:{"press":_vm.$_onNumberKeyClick}}),_vm._v(" "),_c('md-number-key',{staticClass:"keyboard-number-item no-bg delete",on:{"press":_vm.$_onDeleteClick}})]],2)]),_vm._v(" "),(_vm.type === 'professional')?_c('div',{staticClass:"keyboard-operate"},[_c('ul',{staticClass:"keyboard-operate-list"},[_c('md-number-key',{staticClass:"keyboard-operate-item delete",on:{"press":_vm.$_onDeleteClick}}),_vm._v(" "),_c('md-number-key',{staticClass:"keyboard-operate-item confirm",attrs:{"value":_vm.okText,"no-touch":"","no-prevent":""},on:{"press":_vm.$_onConfirmeClick}})],1)]):_vm._e()])}
__vue__options__.staticRenderFns = []
