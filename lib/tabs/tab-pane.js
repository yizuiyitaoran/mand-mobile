;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/tab-pane.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/tab-pane.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.tabPane);
    global.tabPane = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-tab-pane',

    inject: {
      rootTabs: {
        from: 'rootTabs',
        default: function _default() {
          return this.$parent;
        }
      }
    },

    props: {
      label: {
        type: String
      },
      name: {
        type: String
      },
      disabled: {
        type: Boolean
      }
    },

    computed: {
      active: function active() {
        return this.rootTabs.currentName === this.name;
      },
      transitionName: function transitionName() {
        return this.rootTabs.prevIndex > this.rootTabs.currentIndex ? 'md-tab-slide-right' : 'md-tab-slide-left';
      }
    },

    watch: {
      label: function label() {
        this.rootTabs.$forceUpdate();
      },
      disabled: function disabled() {
        this.rootTabs.$forceUpdate();
      }
    },

    created: function created() {
      this.rootTabs.$_addPane(this);
    },
    destroyed: function destroyed() {
      this.rootTabs.$_removePane(this);
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transitionName}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.active),expression:"active"}],staticClass:"md-tab-pane",attrs:{"role":"tabpanel","tab":_vm.name}},[_vm._t("default")],2)])}
__vue__options__.staticRenderFns = []
