;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util', '../_util/scroller', '../_util/render', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util'), require('../_util/scroller'), require('../_util/render'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._util, global.scroller, global.render, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _util, _scroller, _render) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _scroller2 = _interopRequireDefault(_scroller);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    name: 'md-scroll-view',
    props: {
      scrollingX: {
        type: Boolean,
        default: true
      },
      scrollingY: {
        type: Boolean,
        default: true
      },
      bouncing: {
        type: Boolean,
        default: true
      },
      autoReflow: {
        type: Boolean,
        default: false
      },
      manualInit: {
        type: Boolean,
        default: false
      },
      endReachedThreshold: {
        type: Number,
        default: 0
      },
      immediateCheckEndReaching: {
        type: Boolean,
        default: false
      },
      touchAngle: {
        type: Number,
        default: 45
      },
      isPrevent: {
        type: Boolean,
        default: true
      }
    },
    data: function data() {
      return {
        container: null,
        content: null,
        refresher: null,
        more: null,
        scroller: null,
        refreshOffsetY: 0,
        isInitialed: false,
        isMouseDown: false,
        isRefreshing: false,
        isRefreshActive: false,
        isEndReachingStart: false,
        isEndReaching: false,
        scrollX: null,
        scrollY: null,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        containerW: 0,
        containerH: 0,
        contentW: 0,
        contentH: 0,
        reflowTimer: null,
        endReachedHandler: null
      };
    },

    computed: {
      hasRefresher: function hasRefresher() {
        return !!(this.$slots.refresh || this.$scopedSlots.refresh);
      },
      hasMore: function hasMore() {
        return !!(this.$slots.more || this.$scopedSlots.more);
      }
    },
    watch: {
      autoReflow: function autoReflow(val) {
        if (val) {
          this.$_initAutoReflow();
        } else {
          this.$_destroyAutoReflow();
        }
      }
    },
    mounted: function mounted() {
      if (!this.manualInit) {
        this.$_initScroller();
      }
    },
    destroyed: function destroyed() {
      this.$_destroyAutoReflow();
    },

    methods: {
      $_initScroller: function $_initScroller() {
        var _this = this;

        if (this.isInitialed) {
          return;
        }
        this.container = this.$el;
        this.refresher = this.$el.querySelector('.scroll-view-refresh');
        this.more = this.$el.querySelector('.scroll-view-more');
        this.content = this.$el.querySelector('.scroll-view-container');
        this.refreshOffsetY = this.refresher ? this.refresher.clientHeight : 0;
        this.moreOffsetY = this.more ? this.more.clientHeight : 0;
        var container = this.container;
        var content = this.content;
        var rect = container.getBoundingClientRect();
        var scroller = new _scroller2.default(function (left, top) {
          (0, _render.render)(content, left, top);
          if (_this.isInitialed) {
            _this.$_onScroll(left, top);
          }
        }, {
          scrollingX: this.scrollingX,
          scrollingY: this.scrollingY,
          bouncing: this.bouncing,
          zooming: false,
          animationDuration: 200,
          speedMultiplier: 1.2,
          inRequestAnimationFrame: true
        });
        scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);
        if (this.hasRefresher) {
          scroller.activatePullToRefresh(this.refreshOffsetY, function () {
            _this.isRefreshActive = true;
            _this.isRefreshing = false;
            _this.$emit('refreshActive');
          }, function () {
            _this.isRefreshActive = false;
            _this.isRefreshing = false;
          }, function () {
            _this.isRefreshActive = false;
            _this.isRefreshing = true;
            _this.$emit('refreshing');
          });
        }
        this.scroller = scroller;
        this.reflowScroller(true);
        this.autoReflow && this.$_initAutoReflow();
        this.endReachedHandler = (0, _util.debounce)(function () {
          _this.isEndReaching = true;
          _this.$emit('endReached');
          _this.$emit('end-reached');
        }, 50);

        setTimeout(function () {
          _this.isInitialed = true;
        }, 50);

        if (this.immediateCheckEndReaching) {
          this.$nextTick(this.$_checkScrollerEnd);
        }
      },
      $_initAutoReflow: function $_initAutoReflow() {
        var _this2 = this;

        this.$_destroyAutoReflow();
        this.reflowTimer = setInterval(function () {
          _this2.reflowScroller();
        }, 100);
      },
      $_destroyAutoReflow: function $_destroyAutoReflow() {
        this.reflowTimer && clearInterval(this.reflowTimer);
      },
      $_checkScrollerEnd: function $_checkScrollerEnd() {
        if (!this.scroller) {
          return;
        }
        var containerHeight = this.scroller._clientHeight;
        var content = this.scroller._contentHeight;
        var top = this.scroller._scrollTop;
        var moreOffsetY = this.moreOffsetY;
        var moreThreshold = this.endReachedThreshold;
        var endOffset = content - containerHeight - (top + moreOffsetY + moreThreshold);
        if (top >= 0 && !this.isEndReaching && endOffset <= 0 && this.endReachedHandler) {
          this.isEndReachingStart = true;

          this.endReachedHandler();
        }
      },
      $_getScrollerAngle: function $_getScrollerAngle() {
        var diffX = this.currentX - this.startX;
        var diffY = this.currentY - this.startY;
        var angle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        return this.scrollingX ? 90 - angle : angle;
      },
      $_onScrollerTouchStart: function $_onScrollerTouchStart(event) {
        if (!this.scroller) {
          return;
        }
        this.startX = event.targetTouches[0].pageX;
        this.startY = event.targetTouches[0].pageY;
        this.scroller.doTouchStart(event.touches, event.timeStamp);
      },
      $_onScrollerTouchMove: function $_onScrollerTouchMove(event) {
        if (!this.scroller) {
          return;
        }
        var hadPrevent = false;

        if (this.isPrevent) {
          event.preventDefault();

          hadPrevent = true;
        }

        this.currentX = event.targetTouches[0].pageX;
        this.currentY = event.targetTouches[0].pageY;

        if (!this.scrollingX || !this.scrollingY) {
          var currentTouchAngle = this.$_getScrollerAngle();
          if (currentTouchAngle < this.touchAngle) {
            return;
          }
        }

        if (!hadPrevent && event.cancelable) {
          event.preventDefault();
        }

        this.scroller.doTouchMove(event.touches, event.timeStamp, event.scale);

        var boundaryDistance = 15;
        var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        var pX = this.currentX - scrollLeft;
        var pY = this.currentY - scrollTop;
        if (pX > document.documentElement.clientWidth - boundaryDistance || pY > document.documentElement.clientHeight - boundaryDistance || pX < boundaryDistance || pY < boundaryDistance) {
          this.scroller.doTouchEnd(event.timeStamp);
        }
      },
      $_onScrollerTouchEnd: function $_onScrollerTouchEnd(event) {
        if (!this.scroller) {
          return;
        }
        this.scroller.doTouchEnd(event.timeStamp);
      },
      $_onScrollerMouseDown: function $_onScrollerMouseDown(event) {
        if (!this.scroller) {
          return;
        }
        this.startX = event.pageX;
        this.startY = event.pageY;
        this.scroller.doTouchStart([{
          pageX: event.pageX,
          pageY: event.pageY
        }], event.timeStamp);
        this.isMouseDown = true;
      },
      $_onScrollerMouseMove: function $_onScrollerMouseMove(event) {
        if (!this.scroller || !this.isMouseDown) {
          return;
        }

        this.currentX = event.pageX;
        this.currentY = event.pageY;
        if (!this.scrollingX || !this.scrollingY) {
          var currentTouchAngle = this.$_getScrollerAngle();
          if (currentTouchAngle < this.touchAngle) {
            return;
          }
        }
        this.scroller.doTouchMove([{
          pageX: event.pageX,
          pageY: event.pageY
        }], event.timeStamp);
        this.isMouseDown = true;
      },
      $_onScrollerMouseUp: function $_onScrollerMouseUp(event) {
        if (!this.scroller || !this.isMouseDown) {
          return;
        }
        this.scroller.doTouchEnd(event.timeStamp);
        this.isMouseDown = false;
      },
      $_onScroll: function $_onScroll(left, top) {
        left = +left.toFixed(2);
        top = +top.toFixed(2);
        if (this.scrollX === left && this.scrollY === top) {
          return;
        }
        this.scrollX = left;
        this.scrollY = top;
        this.$_checkScrollerEnd();
        this.$emit('scroll', { scrollLeft: left, scrollTop: top });
      },
      init: function init() {
        var _this3 = this;

        this.$nextTick(function () {
          _this3.$_initScroller();
        });
      },
      scrollTo: function scrollTo(left, top) {
        var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!this.scroller) {
          return;
        }
        this.scroller.scrollTo(left, top, animate);
      },
      getOffsets: function getOffsets() {
        if (!this.scroller) {
          return { left: 0, top: 0 };
        }
        return this.scroller.getValues();
      },
      reflowScroller: function reflowScroller() {
        var _this4 = this;

        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var container = this.container;
        var content = this.content;

        if (!this.scroller || !container || !content) {
          return;
        }
        this.$nextTick(function () {
          var containerW = container.clientWidth;
          var containerH = container.clientHeight;
          var contentW = content.offsetWidth;
          var contentH = content.offsetHeight;

          if (force || _this4.containerW !== containerW || _this4.containerH !== containerH || _this4.contentW !== contentW || _this4.contentH !== contentH) {
            _this4.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
            _this4.containerW = containerW;
            _this4.containerH = containerH;
            _this4.contentW = contentW;
            _this4.contentH = contentH;
          }
        });
      },
      triggerRefresh: function triggerRefresh() {
        if (!this.scroller) {
          return;
        }
        this.scroller.triggerPullToRefresh();
      },
      finishRefresh: function finishRefresh() {
        if (!this.scroller) {
          return;
        }
        this.scroller.finishPullToRefresh();
        this.reflowScroller();
      },
      finishLoadMore: function finishLoadMore() {
        if (!this.scroller) {
          return;
        }
        this.isEndReachingStart = false;
        this.isEndReaching = false;
        this.reflowScroller();
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-scroll-view",on:{"touchstart":_vm.$_onScrollerTouchStart,"touchmove":_vm.$_onScrollerTouchMove,"touchend":_vm.$_onScrollerTouchEnd,"touchcancel":_vm.$_onScrollerTouchEnd,"mousedown":_vm.$_onScrollerMouseDown,"mousemove":_vm.$_onScrollerMouseMove,"mouseup":_vm.$_onScrollerMouseUp,"mouseleave":_vm.$_onScrollerMouseUp}},[(_vm.$slots.header)?_c('div',{staticClass:"scroll-view-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"scroll-view-container",class:{
      'horizon': _vm.scrollingX && !_vm.scrollingY
    },attrs:{"scroll-wrapper":""}},[(_vm.hasRefresher)?_c('div',{staticClass:"scroll-view-refresh",class:{
        'refreshing': _vm.isRefreshing,
        'refresh-active': _vm.isRefreshActive,
      }},[_vm._t("refresh",null,{"scrollTop":_vm.scrollY,"isRefreshing":_vm.isRefreshing,"isRefreshActive":_vm.isRefreshActive})],2):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.hasMore)?_c('div',{staticClass:"scroll-view-more",class:{active: _vm.isEndReachingStart || _vm.isEndReaching}},[_vm._t("more",null,{"isEndReaching":_vm.isEndReachingStart || _vm.isEndReaching})],2):_vm._e()],2),_vm._v(" "),(_vm.$slots.footer)?_c('div',{staticClass:"scroll-view-footer"},[_vm._t("footer")],2):_vm._e()])}
__vue__options__.staticRenderFns = []
