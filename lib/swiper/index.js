;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util/scroller', '../_util/render', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util/scroller'), require('../_util/render'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.scroller, global.render, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _scroller, _render, _util) {
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

  var PAGING_SCALE = 0.5;
  var PAGING_DURATION = 300;

  exports.default = {
    name: 'md-swiper',

    props: {
      autoplay: {
        type: Number,
        default: 3000,
        validator: function validator(value) {
          if (value === 0) {
            return true;
          }
          return value >= 500;
        }
      },
      transition: {
        type: String,
        default: 'slide',
        validator: function validator(value) {
          return ['slide', 'slideY', 'fade'].indexOf(value) > -1;
        }
      },
      transitionDuration: {
        type: Number,
        default: 250
      },
      defaultIndex: {
        type: Number,
        default: 0,
        validator: function validator(value) {
          return value > -1;
        }
      },
      hasDots: {
        type: Boolean,
        default: true
      },
      isPrevent: {
        type: Boolean,
        default: true
      },
      isLoop: {
        type: Boolean,
        default: true
      },
      dragable: {
        type: Boolean,
        default: true
      },
      useNativeDriver: {
        type: Boolean,
        default: true
      }
    },

    data: function data() {
      return {
        ready: false,
        dragging: false,
        userScrolling: null,
        isInitial: false,
        duration: 0,
        index: 0,
        fromIndex: 0,
        toIndex: 0,
        firstIndex: 0,
        lastIndex: 0,
        oItemCount: 0,
        rItemCount: 0,
        dimension: 0,
        dragState: {},
        touchAngle: 45,
        timer: null,
        noDrag: false,
        scroller: null,
        isStoped: true,
        $swiper: null,
        transitionEndHandler: null
      };
    },


    watch: {
      autoplay: {
        handler: function handler(val) {
          this.duration = val;
        },

        immediate: true
      }
    },

    computed: {
      isLastItem: function isLastItem() {
        return this.index === this.rItemCount - 1;
      },
      isFirstItem: function isFirstItem() {
        return this.index === 0;
      },
      realIndex: function realIndex() {
        return this.getIndex();
      },
      isSlide: function isSlide() {
        return this.transition.toLowerCase().indexOf('slide') > -1;
      },
      isVertical: function isVertical() {
        return this.transition === 'slideY';
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
    destroyed: function destroyed() {
      this.$_resizeLeaveBehavior();
    },


    methods: {
      $_resize: function $_resize() {
        var _this = this;

        if (this.__resizeTimeout__) {
          clearTimeout(this.__resizeTimeout__);
        }

        var startIndex = this.index;
        this.__resizeTimeout__ = setTimeout(function () {
          _this.$_reInitItems(startIndex);
        }, 300);
      },
      $_onDragStart: function $_onDragStart(e) {
        this.transitionEndHandler && this.transitionEndHandler();

        if (this.isPrevent) {
          e.preventDefault();
        }
        this.dragging = true;
        this.userScrolling = null;
        this.$_doOnTouchStart(e);
      },
      $_onDragMove: function $_onDragMove(e) {
        if (this.isPrevent) {
          e.preventDefault();
        }

        if (!this.dragging) {
          return;
        }
        this.$_doOnTouchMove(e);
      },
      $_onDragEnd: function $_onDragEnd(e) {
        if (this.isPrevent) {
          e.preventDefault();
        }

        if (this.userScrolling) {
          this.play(this.duration);

          this.dragging = false;
          this.dragState = {};
          return;
        }

        if (!this.dragging) {
          return;
        }
        this.$_doOnTouchEnd(e);
        this.dragging = false;
      },
      $_getDimension: function $_getDimension() {
        this.dimension = this.isVertical ? this.$el.clientHeight : this.$el.clientWidth;
      },
      $_initScroller: function $_initScroller() {
        var _this2 = this;

        var scroller = new _scroller2.default(function (left, top) {
          (0, _render.render)(_this2.$swiper, left, top, 1, _this2.useNativeDriver);
        }, {
          scrollingY: this.isVertical,
          scrollingX: !this.isVertical,
          snapping: false,
          bouncing: false,
          animationDuration: this.transitionDuration,

          scrollingComplete: function scrollingComplete() {
            _this2.transitionEndHandler && _this2.transitionEndHandler();
          }
        });

        var container = this.$swiperBox;
        var contentWidth = this.isVertical ? container.clientWidth : container.clientWidth * this.rItemCount;
        var contentHeight = this.isVertical ? container.clientHeight * this.rItemCount : container.clientHeight;
        scroller.setPosition(container.clientLeft, container.clientTop);
        scroller.setDimensions(container.clientWidth, container.clientHeight, contentWidth, contentHeight);

        this.scroller = scroller;
      },
      $_backupItem: function $_backupItem(children) {
        var firstNode = children[0].$el.cloneNode(true);
        var lastNode = children[children.length - 1].$el.cloneNode(true);

        if (children.length > 1 && this.isLoop) {
          var firstNodeCopy = this.$swiper.querySelector('.md-swiper-item-first-copy');
          var lastNodeCopy = this.$swiper.querySelector('.md-swiper-item-last-copy');
          firstNodeCopy && this.$swiper.removeChild(firstNodeCopy);
          lastNodeCopy && this.$swiper.removeChild(lastNodeCopy);

          firstNode.className += ' md-swiper-item-first-copy';
          lastNode.className += ' md-swiper-item-last-copy';
          if (this.isVertical) {
            firstNode.style.height = this.dimension + 'px';
            lastNode.style.height = this.dimension + 'px';
          } else {
            firstNode.style.width = this.dimension + 'px';
            lastNode.style.width = this.dimension + 'px';
          }
          this.$swiper.appendChild(firstNode);
          this.$swiper.insertBefore(lastNode, this.$swiper.childNodes[0]);

          this.firstIndex++;
          this.lastIndex++;
          this.index++;

          this.rItemCount += 2;
        }
      },
      $_translate: function $_translate(element, offset) {
        var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (!element) {
          (0, _util.warn)('[md-swiper] no element for translate');
          return;
        }
        var x = this.isVertical ? 0 : -offset;
        var y = this.isVertical ? -offset : 0;
        this.scroller.scrollTo(x, y, animate);
      },
      $_opacity: function $_opacity() {
        var _this3 = this;

        var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var opacity = arguments[1];

        var children = this.$children;

        if (!children || !children.length) {
          return;
        }

        if (typeof opacity !== 'undefined') {
          var toIndex = 0;
          var fromIndex = this.toIndex;
          var itemCount = this.rItemCount;

          if (opacity > 0) {
            if (fromIndex > 0) {
              toIndex = fromIndex - 1;
            } else if (fromIndex === 0) {
              toIndex = itemCount - 1;
            }
          } else {
            if (fromIndex < itemCount - 1) {
              toIndex = fromIndex + 1;
            } else if (fromIndex === itemCount - 1) {
              toIndex = 0;
            }
          }
          var _from = children[fromIndex].$el;
          var _to = children[toIndex].$el;
          _from.style.opacity = 1 - Math.abs(opacity);
          _from.style.transition = animate ? 'opacity 300ms ease' : '';
          _to.style.opacity = Math.abs(opacity);
          return;
        }

        var from = children[this.fromIndex].$el;
        var to = children[this.toIndex].$el;
        from.style.opacity = 0;
        from.style.transition = animate ? 'opacity 500ms ease' : '';
        to.style.opacity = 1;
        if (animate) {
          setTimeout(function () {
            _this3.$emit('after-change', _this3.fromIndex, _this3.toIndex);
          }, 500);
        }
      },
      $_initState: function $_initState(children, startIndex) {
        this.oItemCount = children.length;
        this.rItemCount = children.length;
        this.noDrag = children.length === 1 || !this.dragable;

        this.index = startIndex !== undefined ? this.$_calcDisplayIndex(startIndex) : this.defaultIndex >= 0 && this.defaultIndex < children.length ? parseInt(this.defaultIndex) : 0;

        this.firstIndex = 0;
        this.lastIndex = children.length - 1;
        this.fromIndex = this.index === this.firstIndex ? this.lastIndex : this.index === this.lastIndex ? this.firstIndex : this.index + 1;
        this.toIndex = this.index;
      },
      $_reInitItems: function $_reInitItems(startIndex) {
        var children = this.$children;

        if (!children || !children.length) {
          return;
        }

        this.$_getDimension();
        this.$_initState(children, startIndex);

        if (this.isSlide) {
          this.$_backupItem(children);
          this.$_initScroller();
          this.$_translate(this.$swiper, -this.dimension * this.index, false);
        } else {
          this.$_opacity(false);
        }
        this.isInitial = true;
      },
      $_startPlay: function $_startPlay() {
        var _this4 = this;

        if (this.duration > 0 && this.oItemCount > 1) {
          this.$_clearTimer();
          this.timer = setInterval(function () {
            if (!_this4.isLoop && _this4.index >= _this4.rItemCount - 1) {
              return _this4.$_clearTimer();
            }
            if (!_this4.dragging) {
              _this4.next();
            }
          }, this.duration);
        }
      },
      $_clearTimer: function $_clearTimer() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      $_isScroll: function $_isScroll(dragState, diffX, diffY) {
        var vertical = this.isVertical;
        var currentLeft = dragState.currentLeft,
            currentTop = dragState.currentTop,
            startLeft = dragState.startLeft,
            startTop = dragState.startTop;


        if (this.userScrolling === null) {
          if (!vertical && currentTop === startTop || vertical && currentLeft === startLeft) {
            return false;
          } else {
            if (diffX * diffX + diffY * diffY >= 25) {
              var _touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
              return !vertical ? _touchAngle > this.touchAngle : 90 - _touchAngle > this.touchAngle;
            } else {
              return false;
            }
          }
        }

        return this.userScrolling;
      },
      $_calcDisplayIndex: function $_calcDisplayIndex(index) {
        if (this.isLoop && this.isSlide && this.oItemCount > 0) {
          return index - 1 < 0 ? this.oItemCount - 1 : index - 1 > this.oItemCount - 1 ? 0 : index - 1;
        }
        return index;
      },
      $_calcuRealIndex: function $_calcuRealIndex(index) {
        if (index < 0) {
          index = 0;
        } else if (this.oItemCount > 0 && index > this.oItemCount - 1) {
          index = this.oItemCount - 1;
        }

        if (this.isLoop && this.isSlide) {
          return index + 1;
        }
        return index;
      },
      $_doTransition: function $_doTransition(towards, options) {
        var _this5 = this;

        if (this.oItemCount === 0) {
          return;
        }
        if (!options && this.oItemCount < 2) {
          return;
        }

        var index = this.index;
        var itemCount = this.rItemCount;
        var oldIndex = this.index;

        if (!towards) {
          return;
        }

        if (options && options.index !== undefined) {
          this.index = options.index;
        } else if (towards === 'prev') {
          if (index > 0) {
            this.index = index - 1;
          } else if (!this.isSlide && index === 0) {
            this.index = itemCount - 1;
          } else if (this.isLoop && index === 0) {
            this.index = itemCount - 1;
          }
        } else if (towards === 'next') {
          if (index < itemCount - 1) {
            this.index = index + 1;
          } else if (!this.isSlide && index === itemCount - 1) {
            this.index = 0;
          } else if (this.isLoop && index === itemCount - 1) {
            this.index = 1;
          }
        }

        if (this.isLoop && this.isSlide) {
          this.fromIndex = this.$_calcDisplayIndex(oldIndex);
          this.toIndex = this.$_calcDisplayIndex(this.index);
        } else {
          this.fromIndex = this.toIndex;
          this.toIndex = this.index;
        }
        this.$emit('before-change', this.fromIndex, this.toIndex);
        if (!this.isSlide) {
          this.$_opacity();
          return;
        }

        setTimeout(function () {
          var isFirstItem = _this5.isFirstItem && _this5.isLoop;
          var isLastItem = _this5.isLastItem && _this5.isLoop;

          _this5.transitionEndHandler = function () {
            if (isLastItem) {
              var x = _this5.isVertical ? 0 : _this5.firstIndex * _this5.dimension;
              var y = _this5.isVertical ? _this5.firstIndex * _this5.dimension : 0;
              _this5.scroller.scrollTo(x, y, false);
            }
            if (isFirstItem) {
              var _x3 = _this5.isVertical ? 0 : _this5.lastIndex * _this5.dimension;
              var _y = _this5.isVertical ? _this5.lastIndex * _this5.dimension : 0;
              _this5.scroller.scrollTo(_x3, _y, false);
            }

            _this5.$emit('after-change', _this5.fromIndex, _this5.toIndex);
            _this5.transitionEndHandler = null;
          };
          _this5.$_translate(_this5.$swiper, -_this5.dimension * _this5.index);

          if (isFirstItem) {
            _this5.index = _this5.lastIndex;
          } else if (isLastItem) {
            _this5.index = _this5.firstIndex;
          }
        }, 10);
      },
      $_doOnTouchStart: function $_doOnTouchStart(event) {
        if (this.noDrag) {
          return;
        }
        this.stop();

        var element = this.$el;

        var dragState = this.dragState;

        var point = event.changedTouches ? event.changedTouches[0] : event;

        dragState.startTime = new Date();
        dragState.startLeft = point.pageX;
        dragState.startTop = point.pageY;
        dragState.itemWidth = process.env.NODE_ENV !== 'test' ? element.offsetWidth : 100;
        dragState.itemHeight = process.env.NODE_ENV !== 'test' ? element.offsetHeight : 100;
      },
      $_doOnTouchMove: function $_doOnTouchMove(event) {
        if (this.noDrag) {
          return;
        }

        var dragState = this.dragState;

        var point = event.changedTouches ? event.changedTouches[0] : event;

        dragState.currentLeft = point.pageX;
        dragState.currentTop = point.pageY;

        var offsetLeft = dragState.currentLeft - dragState.startLeft;
        var offsetTop = dragState.currentTop - dragState.startTop;
        this.userScrolling = this.$_isScroll(dragState, Math.abs(offsetLeft), Math.abs(offsetTop));

        if (this.userScrolling) {
          return;
        }

        event.preventDefault();

        var _offsetLeft = Math.min(Math.max(-dragState.itemWidth + 1, offsetLeft), dragState.itemWidth - 1);
        var _offsetTop = Math.min(Math.max(-dragState.itemHeight + 1, offsetTop), dragState.itemHeight - 1);

        var offset = this.isVertical ? _offsetTop - dragState.itemHeight * this.index : _offsetLeft - dragState.itemWidth * this.index;

        if (this.isSlide) {
          this.$_translate(this.$swiper, offset, false);
        } else {
          this.$_opacity(false, offsetLeft / dragState.itemWidth);
        }
      },
      $_doOnTouchEnd: function $_doOnTouchEnd() {
        if (this.noDrag) {
          return;
        }
        var dragState = this.dragState;
        var towards = null;


        var dragDuration = new Date() - dragState.startTime;
        var offsetLeft = dragState.currentLeft - dragState.startLeft;
        var offsetTop = dragState.currentTop - dragState.startTop;
        var itemWidth = dragState.itemWidth;
        var itemHeight = dragState.itemHeight;
        var index = this.index;
        var itemCount = this.rItemCount;
        var isFastDrag = dragDuration < PAGING_DURATION;

        if (isFastDrag && dragState.currentLeft === undefined) {
          this.play(this.duration);
          return;
        }

        if (this.isVertical) {
          if (Math.abs(offsetTop) > itemHeight * PAGING_SCALE || isFastDrag) {
            towards = offsetTop < 0 ? 'next' : 'prev';
          } else {
            this.$_translate(this.$swiper, -this.dimension * index, true);
          }
        } else {
          if (Math.abs(offsetLeft) > itemWidth * PAGING_SCALE || isFastDrag) {
            towards = offsetLeft < 0 ? 'next' : 'prev';
          } else {
            if (this.isSlide) {
              this.$_translate(this.$swiper, -this.dimension * index, true);
            } else {
              this.$_opacity(true, 0);
            }
          }
        }

        if (!this.isLoop) {
          if (index === 0 && towards === 'prev' || index === itemCount - 1 && towards === 'next') {
            towards = null;
          }
        }

        this.$_doTransition(towards);

        this.dragState = {};

        this.play(this.duration);
      },
      $_resizeEnterBehavior: function $_resizeEnterBehavior() {
        var _this6 = this;

        this.ready = true;
        this.$swiper = this.$el.querySelector('.md-swiper-container');
        this.$swiperBox = this.$el.querySelector('.md-swiper-box');
        this.$nextTick(function () {
          _this6.$_reInitItems();
          _this6.play(_this6.duration);
          window.addEventListener('resize', _this6.$_resize);
        });
      },
      $_resizeLeaveBehavior: function $_resizeLeaveBehavior() {
        this.ready = false;
        this.$_clearTimer();
        window.removeEventListener('resize', this.$_resize);
        if (this.__resizeTimeout__) {
          clearTimeout(this.__resizeTimeout__);
        }
      },
      next: function next() {
        this.$_doTransition('next');
      },
      prev: function prev() {
        this.$_doTransition('prev');
      },
      goto: function goto(displayIndex) {
        if (isNaN(displayIndex)) {
          return;
        }
        displayIndex = parseInt(displayIndex);

        var realIndex = this.$_calcuRealIndex(displayIndex);
        var towards = realIndex > this.index ? 'next' : 'pre';

        this.$_doTransition(towards, {
          index: realIndex
        });

        this.play(this.duration);
      },
      getIndex: function getIndex() {
        return this.$_calcDisplayIndex(this.index);
      },
      play: function play() {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;

        this.$_clearTimer();
        if (duration < 500) {
          return;
        }

        this.duration = duration || this.autoplay;
        this.$_startPlay();
        this.isStoped = false;
      },
      stop: function stop() {
        this.$_clearTimer();
        this.isStoped = true;
      },
      swiperItemCreated: function swiperItemCreated() {
        var _this7 = this;

        if (!this.ready) {
          return;
        }

        this.$nextTick(function () {
          _this7.$_clearTimer();
          _this7.$_reInitItems();
          if (!_this7.isStoped) {
            _this7.play(_this7.duration);
          }
        });
      },


      swiperItemDestroyed: (0, _util.debounce)(function () {
        var _this8 = this;

        if (!this.ready) {
          return;
        }

        this.$nextTick(function () {
          _this8.$_clearTimer();
          _this8.$_reInitItems();
          if (!_this8.isStoped) {
            _this8.play(_this8.duration);
          }
        });
      }, 50)
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-swiper",class:{'md-swiper-vertical': _vm.isVertical, 'md-swiper-fade': !_vm.isSlide, 'disabled': !_vm.isInitial},on:{"mousedown":_vm.$_onDragStart,"mousemove":_vm.$_onDragMove,"mouseup":_vm.$_onDragEnd,"mouseleave":_vm.$_onDragEnd,"touchstart":_vm.$_onDragStart,"touchmove":_vm.$_onDragMove,"touchend":_vm.$_onDragEnd,"touchcancel":_vm.$_onDragEnd}},[_c('div',{staticClass:"md-swiper-box"},[_c('div',{staticClass:"md-swiper-container"},[_vm._t("default")],2)]),_vm._v(" "),(_vm.oItemCount > 1 && _vm.hasDots)?_c('div',{staticClass:"md-swiper-indicators",class:{'disabled': !_vm.hasDots}},[_vm._l((_vm.oItemCount),function(index){return [_c('div',{key:index,staticClass:"md-swiper-indicator",class:{ 'md-swiper-indicator-active': index - 1 === _vm.realIndex }})]})],2):_vm._e()])}
__vue__options__.staticRenderFns = []
