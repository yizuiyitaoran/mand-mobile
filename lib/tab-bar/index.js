;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../scroll-view', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../scroll-view'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.scrollView, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _scrollView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _scrollView2 = _interopRequireDefault(_scrollView);

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
    name: 'md-tab-bar',

    components: _defineProperty({}, _scrollView2.default.name, _scrollView2.default),

    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      items: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      hasInk: {
        type: Boolean,
        default: true
      },
      inkLength: {
        type: Number,
        default: 100
      },
      immediate: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        currentName: '',
        wrapperW: 0,
        contentW: 0,
        inkWidth: 0,
        inkPos: 0,
        scrollerTmpKey: Date.now(),
        maskStartShown: false,
        maskEndShown: true
      };
    },


    computed: {
      scrollable: function scrollable() {
        return this.contentW > this.wrapperW;
      },
      currentIndex: function currentIndex() {
        for (var i = 0, len = this.items.length; i < len; i++) {
          if (this.items[i].name === this.currentName) {
            return i;
          }
        }
      },
      currentTab: function currentTab() {
        if (this.currentIndex) {
          return this.items[this.currentIndex];
        }
      }
    },

    watch: {
      value: {
        immediate: true,
        handler: function handler(val) {
          if (val !== this.currentName) {
            this.currentName = val;
          }
        }
      },
      inkWidth: function inkWidth() {
        this.$nextTick(function () {
          this.reflow();
        });
      },
      items: function items() {
        this.$nextTick(function () {
          this.reflow();
        });
      },
      currentIndex: function currentIndex() {
        this.$nextTick(function () {
          this.reflow();
        });
      },
      scrollable: function scrollable() {
        this.scrollerTmpKey = Date.now();
      }
    },

    created: function created() {
      if (this.currentName === '' && this.items.length) {
        this.currentName = this.items[0].name;
        this.$emit('change', this.items[0], 0, 0);
      }
    },
    mounted: function mounted() {
      this.$_resizeEnterBehavior();
    },
    activated: function activated() {
      this.$_resizeEnterBehavior();
    },
    deactivated: function deactivated() {
      this.$_resizeLeaveBehavior();
    },
    beforeDestroy: function beforeDestroy() {
      this.$_resizeLeaveBehavior();
    },


    methods: {
      $_onScroll: function $_onScroll(_ref) {
        var scrollLeft = _ref.scrollLeft;

        if (scrollLeft > 0) {
          this.maskStartShown = true;
        } else {
          this.maskStartShown = false;
        }

        if (scrollLeft >= this.$refs.scroller.contentW - this.$refs.scroller.containerW) {
          this.maskEndShown = false;
        } else {
          this.maskEndShown = true;
        }
      },
      $_onClick: function $_onClick(item, index) {
        if (item.disabled) {
          return;
        }
        this.$emit('change', item, index, this.currentIndex);
        this.currentName = item.name;
        this.$emit('input', item.name);
      },
      $_resizeEnterBehavior: function $_resizeEnterBehavior() {
        var _this = this;

        window.addEventListener('resize', this.reflow);
        this.reflow();

        if (this.immediate) {
          this.$nextTick(function () {
            _this.$emit('change', _this.items[_this.currentIndex], _this.currentIndex);
          });
        }
      },
      $_resizeLeaveBehavior: function $_resizeLeaveBehavior() {
        window.removeEventListener('resize', this.reflow);
      },
      reflow: function reflow() {
        var _this2 = this;

        if (!this.$refs.items || this.$refs.items.length === 0) {
          return;
        }

        this.wrapperW = this.$refs.wrapper.offsetWidth;

        var contentWidth = 0;
        for (var i = 0, len = this.items.length; i < len; i++) {
          var _$refs$items$i$getBou = this.$refs.items[i].getBoundingClientRect(),
              width = _$refs$items$i$getBou.width;

          contentWidth += width;
        }
        this.contentW = contentWidth;
        this.$refs.scroller.reflowScroller();
        this.$nextTick(function () {
          if (!_this2.$refs.items || !_this2.$refs.items[_this2.currentIndex]) {
            return;
          }

          var target = _this2.$refs.items[_this2.currentIndex];
          _this2.inkWidth = target.offsetWidth * _this2.inkLength / 100;
          _this2.inkPos = target.offsetLeft + (target.offsetWidth - _this2.inkWidth) / 2;

          var prevTarget = _this2.$refs.items[_this2.currentIndex - 1];
          var nextTarget = _this2.$refs.items[_this2.currentIndex + 1];

          if (!prevTarget) {
            _this2.$refs.scroller.scrollTo(0, 0, true);
            return;
          }

          if (!nextTarget) {
            _this2.$refs.scroller.scrollTo(_this2.contentW, 0, true);
            return;
          }

          var wrapperRect = _this2.$refs.wrapper.getBoundingClientRect();
          var prevTargetRect = prevTarget.getBoundingClientRect();
          var nextTargetRect = nextTarget.getBoundingClientRect();

          if (prevTargetRect && prevTargetRect.left < wrapperRect.left) {
            _this2.$refs.scroller.scrollTo(prevTarget.offsetLeft, 0, true);
          } else if (nextTargetRect && nextTargetRect.right > wrapperRect.right) {
            _this2.$refs.scroller.scrollTo(nextTarget.offsetLeft + nextTarget.offsetWidth - _this2.wrapperW, 0, true);
          }
        });
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"md-tab-bar"},[_c('div',{ref:"wrapper",staticClass:"md-tab-bar-inner"},[(_vm.scrollable)?[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.maskStartShown),expression:"maskStartShown"}],staticClass:"md-tab-bar-start"}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.maskEndShown),expression:"maskEndShown"}],staticClass:"md-tab-bar-end"})]:_vm._e(),_vm._v(" "),_c('md-scroll-view',{key:_vm.scrollerTmpKey,ref:"scroller",attrs:{"scrolling-x":_vm.scrollable,"scrolling-y":false},on:{"scroll":_vm.$_onScroll}},[_c('div',{staticClass:"md-tab-bar-list",style:({width: _vm.contentW + 'px'})},_vm._l((_vm.items),function(item,index){return _c('a',{key:item.name,ref:"items",refInFor:true,staticClass:"md-tab-bar-item",class:{
            'is-active': _vm.currentName === item.name,
            'is-disabled': !!item.disabled
          },on:{"click":function($event){return _vm.$_onClick(item, index)}}},[_vm._t("item",[_vm._v(_vm._s(item.label))],{"item":item,"items":_vm.items,"index":index,"currentName":_vm.currentName})],2)}),0),_vm._v(" "),(_vm.hasInk)?_c('span',{staticClass:"md-tab-bar-ink",class:{
          'is-disabled': _vm.currentTab && _vm.currentTab.disabled
        },style:({
          width: _vm.inkWidth + 'px',
          transform: 'translateX(' + _vm.inkPos + 'px)',
        })}):_vm._e()])],2)])}
__vue__options__.staticRenderFns = []
