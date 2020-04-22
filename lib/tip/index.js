(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'vue', './tip', '../_util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('vue'), require('./tip'), require('../_util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue, global.tip, global._util);
    global.index = mod.exports;
  }
})(this, function (exports, _vue, _tip, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vue2 = _interopRequireDefault(_vue);

  var _tip2 = _interopRequireDefault(_tip);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Tip = _vue2.default.extend(_tip2.default);

  exports.default = {
    name: 'md-tip',

    props: {
      placement: {
        type: String,
        default: 'top'
      },
      name: {
        type: [String, Number],
        default: function _default() {
          return (0, _util.randomId)('tip');
        }
      },
      icon: {
        type: String
      },
      iconSvg: {
        type: Boolean,
        default: false
      },
      content: {
        type: [String, Number],
        default: ''
      },
      closable: {
        type: Boolean,
        default: true
      },
      fill: {
        type: Boolean,
        default: false
      },
      offset: {
        type: Object,
        default: function _default() {
          return { top: 0, left: 0 };
        }
      }
    },

    mounted: function mounted() {
      this.wrapperEl = this.$_getFirstScrollWrapper(this.$el);
    },
    beforeDestroy: function beforeDestroy() {
      if (this.$_tipVM) {
        var el = this.$_tipVM.$el;
        var parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
        this.$_tipVM.$destroy();
      }
    },


    /**
     * Only render the first node of slots
     * and add tip tirgger handler on it
     */
    render: function render() {
      // eslint-disable-line no-unused-vars
      if (!this.$slots.default || !this.$slots.default.length) {
        return this.$slots.default;
      }

      var firstNode = null;
      this.$slots.default.some(function (node) {
        firstNode = node;
        return !!node.data;
      });

      if (firstNode) {
        var on = firstNode.data.on = firstNode.data.on || {};
        var nativeOn = firstNode.data.nativeOn = firstNode.data.nativeOn || {};

        on.click = this.$_addEventHandle(on.click, this.show);
        nativeOn.click = this.$_addEventHandle(nativeOn.click, this.show);
      }

      return firstNode;
    },


    methods: {
      /**
       * Add extra tip trigger handler
       * without overwriting the old ones
       */
      $_addEventHandle: function $_addEventHandle(old, fn) {
        if (!old) {
          return fn;
        } else if (Array.isArray(old)) {
          return old.indexOf(fn) > -1 ? old : old.concat(fn);
        } else {
          return old === fn ? old : [old, fn];
        }
      },


      /**
       * Get the first scrollable parent,
       * so we can append the tip element to
       * the right parent container
       */
      $_getFirstScrollWrapper: function $_getFirstScrollWrapper(node) {
        if (node === null || node === document.body) {
          return node;
        }

        var overflowY = window.getComputedStyle(node).overflowY;
        var isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
        var isScrollView = node && node.getAttribute('scroll-wrapper') !== null;

        if (isScrollable && node.scrollHeight > node.clientHeight || isScrollView) {
          return node;
        } else {
          return this.$_getFirstScrollWrapper(node.parentNode);
        }
      },
      $_getSize: function $_getSize(node) {
        return {
          width: node.offsetWidth,
          height: node.offsetHeight
        };
      },


      /**
       * Get the relative position of an element
       * inside a wrapper
       */
      $_getPosition: function $_getPosition(node, wrapper) {
        var x = 0;
        var y = 0;
        var el = node;

        while (el) {
          x += el.offsetLeft;
          y += el.offsetTop;

          if (el === wrapper || el === document.body || el === null) {
            break;
          }

          el = el.offsetParent;
        }

        return { x: x, y: y };
      },


      /**
       * Lazy create tip element
       */
      $_getOrNewTip: function $_getOrNewTip() {
        if (this.$_tipVM) {
          return this.$_tipVM;
        }

        var tipVM = this.$_tipVM = new Tip({
          propsData: {
            icon: this.icon,
            iconSvg: this.iconSvg,
            placement: this.placement,
            content: this.content,
            closable: this.closable,
            name: this.name
          }
        }).$mount();

        tipVM.$on('close', this.hide);

        return tipVM;
      },


      /**
       * Calculate the position of tip,
       * and relayout it's position
       */
      layout: function layout() {
        if (!this.$_tipVM) {
          return;
        }

        var tipEl = this.$_tipVM.$el;
        var referenceEl = this.$el;
        var delta = this.$_getPosition(this.$el, this.wrapperEl);
        var size = this.$_getSize(this.$el, this.wrapperEl);
        var offsetTop = this.offset.top || 0;
        var offsetLeft = this.offset.left || 0;

        var tipElWidth = tipEl.offsetWidth;
        var tipElHeight = tipEl.offsetHeight;
        var cssText = '';

        if (this.fill && (this.placement === 'top' || this.placement === 'bottom')) {
          tipElWidth = size.width;
          cssText += 'width: ' + tipElWidth + 'px;';
        }

        if (this.fill && (this.placement === 'left' || this.placement === 'right')) {
          tipElHeight = size.height;
          cssText += 'height: ' + tipElHeight + 'px;';
        }

        switch (this.placement) {
          case 'left':
            delta.y += (referenceEl.offsetHeight - tipElHeight) / 2;
            delta.x -= tipElWidth + 10;
            break;

          case 'right':
            delta.y += (referenceEl.offsetHeight - tipElHeight) / 2;
            delta.x += referenceEl.offsetWidth + 10;
            break;

          case 'bottom':
            delta.y += referenceEl.offsetHeight + 10;
            delta.x += (referenceEl.offsetWidth - tipElWidth) / 2;
            break;

          default:
            delta.y -= tipElHeight + 10;
            delta.x += (this.$el.offsetWidth - tipElWidth) / 2;
            break;
        }

        cssText += 'position: absolute; top: ' + (delta.y + offsetTop) + 'px; left: ' + (delta.x + offsetLeft) + 'px;';
        this.$_tipVM.$el.style.cssText = cssText;
      },


      /**
       * Do the magic, show me your tip
       */
      show: function show() {
        var tipVM = this.$_getOrNewTip();

        if (tipVM.$el.parentNode !== this.wrapperEl) {
          this.wrapperEl.appendChild(tipVM.$el);
        }

        this.layout();
        this.$emit('show', this.name);
      },


      /**
       * Hide tip
       */
      hide: function hide() {
        if (this.$_tipVM && this.$_tipVM.$el.parentNode !== null) {
          this.$_tipVM.$el.parentNode.removeChild(this.$_tipVM.$el);
          this.$emit('hide', this.name);
        }
      }
    }
  };
});