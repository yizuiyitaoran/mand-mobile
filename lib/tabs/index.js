;(function(){
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import TabBar from '../tab-bar';

export default {
  name: 'md-tabs',

  components: _defineProperty({}, TabBar.name, TabBar),

  props: {
    value: String,
    hasInk: {
      type: Boolean,
      default: true
    },
    inkLength: {
      type: Number,
      default: 80
    },
    immediate: Boolean
  },

  data: function data() {
    return {
      currentName: this.value,
      prevIndex: 0,
      panes: []
    };
  },


  watch: {
    value: function value(val) {
      if (val !== this.currentName) {
        this.currentName = val;
      }
    }
  },

  computed: {
    menus: function menus() {
      return this.panes.map(function (pane) {
        return {
          name: pane.name,
          label: pane.label,
          disabled: pane.disabled
        };
      });
    },
    currentIndex: function currentIndex() {
      for (var i = 0, len = this.menus.length; i < len; i++) {
        if (this.menus[i].name === this.currentName) {
          return i;
        }
      }
      return 0;
    }
  },

  provide: function provide() {
    return {
      rootTabs: this
    };
  },
  mounted: function mounted() {
    if (!this.currentName && this.menus.length) {
      this.currentName = this.menus[0].name;
    }
  },


  methods: {
    $_handleTabClick: function $_handleTabClick(tab, index, prevIndex) {
      this.currentName = tab.name;
      this.prevIndex = prevIndex;
      this.$emit('input', tab.name);
      this.$emit('change', tab);
    },
    $_addPane: function $_addPane(pane) {
      if (this.panes.indexOf(pane) === -1) {
        this.panes.push(pane);
      }
    },
    $_removePane: function $_removePane(pane) {
      var index = this.panes.indexOf(pane);
      if (index >= 0) {
        this.panes.splice(index, 1);
      }
    },
    reflowTabBar: function reflowTabBar() {
      this.$refs.tabBar.reflow();
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-tabs"},[_c('md-tab-bar',{ref:"tabBar",attrs:{"items":_vm.menus,"value":_vm.currentName,"has-ink":_vm.hasInk,"ink-length":_vm.inkLength,"immediate":_vm.immediate},on:{"change":_vm.$_handleTabClick}}),_vm._v(" "),_c('div',{staticClass:"md-tabs-content"},[_vm._t("default")],2)],1)}
__vue__options__.staticRenderFns = []
