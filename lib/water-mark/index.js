;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var fontSize = 14;
  var color = '#858B9C';

  exports.default = {
    name: 'md-water-mark',

    props: {
      content: {
        type: String,
        default: ''
      },
      spacing: {
        type: [String, Number],
        default: '20vw'
      },
      repeatX: {
        type: Boolean,
        default: true
      },
      repeatY: {
        type: Boolean,
        default: true
      },
      rotate: {
        type: [String, Number],
        default: -30
      },
      opacity: {
        type: [String, Number],
        default: 0.1
      }
    },

    data: function data() {
      return {
        repetition: process.env.NODE_ENV === 'test' ? 2 : 50
      };
    },
    mounted: function mounted() {
      if (this.content) {
        this.ctx = this.$refs.canvas.getContext('2d');
        this.ratio = Math.max((0, _util.getDpr)(), 2);

        this.$_initCanvas();
        this.$_computedSpacing();
        this.$_draw();
      }
    },


    methods: {
      $_initCanvas: function $_initCanvas() {
        var ctx = this.ctx,
            ratio = this.ratio,
            $refs = this.$refs;
        var mark = $refs.mark,
            canvas = $refs.canvas;
        var clientWidth = mark.clientWidth,
            clientHeight = mark.clientHeight;


        this.ctxWidth = canvas.width = clientWidth * ratio;
        this.ctxHeight = canvas.height = clientHeight * ratio;

        ctx.scale(1 / ratio, 1 / ratio);
      },
      $_computedSpacing: function $_computedSpacing() {
        var spacing = this.spacing,
            ratio = this.ratio;


        if (typeof spacing === 'number') {
          this.realSpacing = spacing;
          return;
        }

        var _$exec = /([0-9]+)([A-Za-z]+)/.exec(spacing),
            _$exec2 = _slicedToArray(_$exec, 3),
            _$exec2$ = _$exec2[1],
            amount = _$exec2$ === undefined ? 20 : _$exec2$,
            _$exec2$2 = _$exec2[2],
            unit = _$exec2$2 === undefined ? 'vw' : _$exec2$2;

        if (unit === 'px') {
          this.realSpacing = amount;
        } else if (unit === 'vh') {
          var height = window.screen.height;
          this.realSpacing = amount * height / 100;
        } else if (unit === 'vw') {
          var width = window.screen.width;
          this.realSpacing = amount * width / 100;
        }

        this.realSpacing *= ratio;
      },
      $_draw: function $_draw() {
        var content = this.content,
            ctx = this.ctx,
            realSpacing = this.realSpacing,
            ratio = this.ratio,
            ctxWidth = this.ctxWidth,
            ctxHeight = this.ctxHeight;


        var _fontSize = fontSize * ratio;
        var contentLength = content.length * _fontSize;
        var xCount = Math.ceil(ctxWidth * ratio / (contentLength + realSpacing));
        var yCount = Math.ceil(ctxHeight * ratio / (_fontSize + realSpacing));

        ctx.font = _fontSize + 'px DIN Alternate, "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\u5FAE\u8F6F\u96C5\u9ED1",Arial,sans-serif';
        ctx.fillStyle = color;

        var ctxX = 0;
        var ctxY = 0;
        for (var y = 0; y < yCount; y++) {
          ctxX = 0;
          for (var x = 0; x < xCount; x++) {
            ctx.fillText(content, ctxX, ctxY);
            ctxX += contentLength;
          }
          ctxY += _fontSize + realSpacing;
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-water-mark"},[_c('div',{staticClass:"water-mark-container"},[_vm._t("default")],2),_vm._v(" "),(!!_vm.$scopedSlots.watermark || _vm.content)?_c('div',{ref:"mark",staticClass:"water-mark-list"},[_c('div',{staticClass:"water-mark-list-wrapper",style:({
         opacity: _vm.opacity,
         transform: ("rotate(" + _vm.rotate + "deg)")
       })},[(_vm.content)?[_c('canvas',{ref:"canvas",staticClass:"water-mark-canvas"})]:(!!_vm.$scopedSlots.watermark)?_vm._l(((_vm.repeatY ? _vm.repetition : 1)),function(i){return _c('ul',{key:("line-" + i),staticClass:"water-mark-line",style:({
          marginBottom: _vm.spacing,
        })},_vm._l(((_vm.repeatX ? _vm.repetition : 1)),function(j){return _c('li',{key:("item-" + j),staticClass:"water-mark-item",style:(i % 2 === 0 ? {
            marginLeft: _vm.repeatX ? _vm.spacing : 0,
          } : {
            marginRight: _vm.repeatX ? _vm.spacing : 0,
          })},[_vm._t("watermark",null,{"coord":{row: i, col: j}})],2)}),0)}):_vm._e()],2)]):_vm._e()])}
__vue__options__.staticRenderFns = []
