;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util/scroller', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util/scroller'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.scroller, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _scroller, _util) {
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

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = {
    name: 'md-ruler',

    components: {},

    props: {
      value: {
        type: Number,
        default: 0
      },
      scope: {
        type: Array,
        default: function _default() {
          return [0, 100];
        }
      },
      step: {
        type: Number,
        default: 10
      },
      unit: {
        type: Number,
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      stepTextPosition: {
        type: String,
        default: 'top',
        validator: function validator(val) {
          return !!~['top', 'bottom'].indexOf(val);
        }
      },
      stepTextRender: {
        type: Function,
        default: _util.noop
      }
    },

    data: function data() {
      return {
        clientHeight: 60,
        scroller: null,
        ratio: 2,

        isInitialed: false,
        isDragging: false,
        isScrolling: false,

        x: 0,
        scrollingX: 0,
        blank: 30 };
    },


    computed: {
      unitCount: function unitCount() {
        var _scope = _slicedToArray(this.scope, 2),
            min = _scope[0],
            max = _scope[1],
            unit = this.unit;

        return Math.ceil((max - min) / unit);
      },
      canvasWidth: function canvasWidth() {
        return this.$refs.canvas.clientWidth * this.ratio;
      },
      realMin: function realMin() {
        var scope = this.scope,
            min = this.min;

        var _scope2 = _slicedToArray(scope, 2),
            left = _scope2[0],
            right = _scope2[1];

        if (min > right) {
          return left;
        }
        return min > left ? min : left;
      },
      realMax: function realMax() {
        var scope = this.scope,
            max = this.max;

        var _scope3 = _slicedToArray(scope, 2),
            left = _scope3[0],
            right = _scope3[1];

        if (left > max) {
          return right;
        }
        return max > right ? right : max;
      },
      blankLeft: function blankLeft() {
        var scope = this.scope,
            realMin = this.realMin,
            unit = this.unit,
            blank = this.blank;

        var _scope4 = _slicedToArray(scope, 1),
            min = _scope4[0];

        return Math.ceil((realMin - min) / unit) * blank;
      },
      blankRight: function blankRight() {
        var scope = this.scope,
            realMax = this.realMax,
            unit = this.unit,
            blank = this.blank;

        var _scope5 = _slicedToArray(scope, 2),
            max = _scope5[1];

        return Math.ceil((max - realMax) / unit) * blank;
      },
      isStepTextBottom: function isStepTextBottom() {
        return this.stepTextPosition === 'bottom';
      }
    },

    watch: {
      value: function value() {
        if (this.isScrolling) {
          return;
        }

        this.scrollingX = 0;
        this.isScrolling = true;
        var x = this.$_initX();
        this.$_draw(x);
        this.scroller.scrollTo(x, 0, true);
      }
    },

    mounted: function mounted() {
      var $refs = this.$refs;

      this.ctx = $refs.canvas.getContext('2d');

      this.$_initCanvas();
      this.x = this.canvasWidth;
      this.$_initScroller();
    },


    methods: {
      $_initCanvas: function $_initCanvas() {
        var ratio = this.ratio,
            ctx = this.ctx,
            canvasWidth = this.canvasWidth,
            clientHeight = this.clientHeight,
            $refs = this.$refs;
        var canvas = $refs.canvas;


        canvas.width = canvasWidth;
        canvas.height = clientHeight * ratio;

        var scale = 1 / ratio;
        ctx.scale(scale, 1);
      },
      $_initScroller: function $_initScroller() {
        var _this = this;

        var blankLeft = this.blankLeft,
            blankRight = this.blankRight,
            blank = this.blank,
            unitCount = this.unitCount,
            canvasWidth = this.canvasWidth,
            clientHeight = this.clientHeight;


        var drawFn = (0, _util.throttle)(this.$_draw, 10);
        var scroller = new _scroller2.default(function (left) {
          _this.isInitialed && drawFn(left);
        }, {
          scrollingX: true,
          scrollingY: false,
          snapping: true,
          snappingVelocity: 1,
          animationDuration: 200,
          inRequestAnimationFrame: true,
          scrollingComplete: function scrollingComplete() {
            _this.isScrolling = false;
          }
        });

        var innerWidth = unitCount * blank + canvasWidth - blankLeft - blankRight;
        var x = this.$_initX();
        this.$_draw(x);
        scroller.setDimensions(canvasWidth, clientHeight, innerWidth, clientHeight);
        scroller.setSnapSize(blank, 0);
        scroller.scrollTo(x, 0, false);

        this.scroller = scroller;
        this.isInitialed = true;
      },
      $_initX: function $_initX() {
        var value = this.value,
            scope = this.scope,
            realMin = this.realMin,
            realMax = this.realMax,
            unit = this.unit,
            blank = this.blank,
            unitCount = this.unitCount,
            canvasWidth = this.canvasWidth;

        var _scope6 = _slicedToArray(scope, 1),
            min = _scope6[0];

        this.x = canvasWidth - Math.ceil((realMin - min) / unit) * blank;

        if (value <= realMin) {
          return 0;
        } else if (value >= realMax) {
          return unitCount * blank;
        } else {
          return Math.ceil((value - realMin) / unit) * blank;
        }
      },
      $_draw: function $_draw(left) {
        left = +left.toFixed(2);
        var ctx = this.ctx,
            ratio = this.ratio,
            scrollingX = this.scrollingX,
            canvasWidth = this.canvasWidth,
            clientHeight = this.clientHeight;


        this.scrollingX = left;
        this.x += scrollingX - left;

        var scale = ratio * ratio;
        ctx.clearRect(0, 0, canvasWidth * scale, clientHeight * scale);

        this.$_drawLine();
      },
      $_drawLine: function $_drawLine() {
        var ctx = this.ctx,
            x = this.x,
            scope = this.scope,
            step = this.step,
            unit = this.unit,
            ratio = this.ratio,
            blank = this.blank,
            unitCount = this.unitCount,
            isStepTextBottom = this.isStepTextBottom;
        var blankLeft = this.blankLeft,
            blankRight = this.blankRight,
            canvasWidth = this.canvasWidth;

        var _scope7 = _slicedToArray(scope, 1),
            scopeLeft = _scope7[0];

        var _fontSize = 22;
        var _y = 120 - (isStepTextBottom ? _fontSize + 40 : 0);
        var _stepUnit = Math.round(step / unit);

        ctx.lineWidth = 2;
        ctx.font = _fontSize * ratio + 'px DIN Alternate, "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\u5FAE\u8F6F\u96C5\u9ED1",Arial,sans-serif';

        for (var i = 0; i <= unitCount; i++) {
          var _x = x + i * blank;

          if (_x < 0 || _x > canvasWidth * 2) {
            continue;
          }

          var outRange = _x < x + blankLeft || _x > x + 1 + unitCount * blank - blankRight;
          if (outRange) {
            ctx.fillStyle = '#E2E4EA';
            ctx.strokeStyle = '#E2E4EA';
          } else {
            ctx.fillStyle = '#C5CAD5';
            ctx.strokeStyle = '#858B9C';
          }

          ctx.beginPath();
          ctx.moveTo(_x, _y);

          if (i % _stepUnit === 0) {
            var text = this.$_matchStepText(scopeLeft + unit * i);
            var textOffset = String(text).length * _fontSize / 2;
            ctx.fillText(text, _x - textOffset, _fontSize * ratio + (isStepTextBottom ? 70 : 0));

            ctx.lineTo(_x, _y - 40);
          } else {
            ctx.lineTo(_x, _y - 20);
          }
          ctx.stroke();
        }

        ctx.strokeStyle = '#E2E4EA';
        ctx.beginPath();
        ctx.moveTo(x, _y);
        ctx.lineTo(x + unitCount * blank, _y);
        ctx.stroke();

        this.$_updateValue();
      },
      $_matchStepText: function $_matchStepText(step) {
        var match = this.stepTextRender(step);
        return match !== undefined && match !== null ? match : step;
      },
      $_startDrag: function $_startDrag(event) {
        if (this.isDragging) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.scroller.doTouchStart(event.touches, event.timeStamp);

        this.isDragging = true;
        this.isScrolling = true;

        window.addEventListener('touchmove', this.$_onDrag);
      },
      $_onDrag: function $_onDrag(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.isDragging) {
          return;
        }
        this.scroller.doTouchMove(event.touches, event.timeStamp, event.scale);
      },
      $_stopDrag: function $_stopDrag(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        this.scroller.doTouchEnd(event.timeStamp);

        window.removeEventListener('touchmove', this.$_onDrag);
      },
      $_updateValue: function $_updateValue() {
        if (!this.isInitialed) {
          return;
        }

        var x = this.x,
            _scope8 = _slicedToArray(this.scope, 1),
            min = _scope8[0],
            realMin = this.realMin,
            realMax = this.realMax,
            unit = this.unit,
            blank = this.blank,
            canvasWidth = this.canvasWidth;

        if (x > canvasWidth) {
          this.$_onInput(realMin);
          return;
        }

        var _x = x >= 0 ? Math.abs(x - canvasWidth) : Math.abs(x) + canvasWidth;
        var value = min + Math.round(_x / blank) * unit;

        value > realMax && (value = realMax);
        value < realMin && (value = realMin);
        this.$_onInput(value);
      },
      $_onInput: function $_onInput(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-ruler",on:{"touchstart":_vm.$_startDrag,"touchend":_vm.$_stopDrag}},[_c('canvas',{ref:"canvas",staticClass:"md-ruler-canvas"}),_vm._v(" "),_c('div',{staticClass:"md-ruler-cursor",class:[_vm.isStepTextBottom && 'md-ruler-cursor-bottom']}),_vm._v(" "),_c('div',{staticClass:"md-ruler-arrow"})])}
__vue__options__.staticRenderFns = []
