;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../popup/title-bar', '../popup/mixins', '../popup/mixins/title-bar', '../icon', '../tabs', '../tab-pane', '../radio-list', '../scroll-view', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../popup/title-bar'), require('../popup/mixins'), require('../popup/mixins/title-bar'), require('../icon'), require('../tabs'), require('../tab-pane'), require('../radio-list'), require('../scroll-view'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.titleBar, global.mixins, global.titleBar, global.icon, global.tabs, global.tabPane, global.radioList, global.scrollView, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _popup, _titleBar, _mixins, _titleBar3, _icon, _tabs, _tabPane, _radioList, _scrollView, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  var _mixins2 = _interopRequireDefault(_mixins);

  var _titleBar4 = _interopRequireDefault(_titleBar3);

  var _icon2 = _interopRequireDefault(_icon);

  var _tabs2 = _interopRequireDefault(_tabs);

  var _tabPane2 = _interopRequireDefault(_tabPane);

  var _radioList2 = _interopRequireDefault(_radioList);

  var _scrollView2 = _interopRequireDefault(_scrollView);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _components;

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
    name: 'md-tab-picker',

    mixins: [_mixins2.default, _titleBar4.default],

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _titleBar2.default.name, _titleBar2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _defineProperty(_components, _tabs2.default.name, _tabs2.default), _defineProperty(_components, _tabPane2.default.name, _tabPane2.default), _defineProperty(_components, _radioList2.default.name, _radioList2.default), _defineProperty(_components, _scrollView2.default.name, _scrollView2.default), _components),

    props: {
      data: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      defaultValue: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      placeholder: {
        type: String,
        default: '请选择'
      }

    },

    data: function data() {
      return {
        selected: [],
        oldSelected: [],
        currentTab: '',
        oldCurrentTab: '',
        tabsTmpKey: Date.now()
      };
    },


    computed: {
      panes: function panes() {
        var panes = [];
        var target = this.data;
        var cursor = 0;
        while (target && target.name) {
          var pane = {
            name: target.name,
            label: target.label || this.placeholder,
            value: this.selected[cursor],
            selected: null,
            options: target.options
          };
          var find = false;
          for (var i = 0, len = target.options.length; i < len; i++) {
            if (target.options[i].value === this.selected[cursor]) {
              pane.label = target.options[i].label;
              pane.selected = target.options[i];
              target = target.options[i].children;
              find = true;
              cursor++;
              break;
            }
          }
          if (!find) {
            target = null;
          }
          panes.push(pane);
          this.currentTab = pane.name;
        }

        return panes;
      },
      hasSlot: function hasSlot() {
        return !!this.$scopedSlots.default;
      }
    },

    created: function created() {
      if (this.defaultValue) {
        this.selected = this.defaultValue;
      }

      if (this.data) {
        this.currentTab = this.data.name;
      }
    },


    methods: {
      $_onPopupInput: function $_onPopupInput(val) {
        this.$emit('input', val);
      },
      $_onPopupShow: function $_onPopupShow() {
        var _this = this;

        this.$refs.tabs.reflowTabBar();
        this.$emit('show');
        setTimeout(function () {
          _this.oldSelected = (0, _util.extend)([], _this.selected);
          _this.oldCurrentTab = _this.currentTab;
        }, 100);
      },
      $_onPopupHide: function $_onPopupHide() {
        this.$emit('hide');
      },
      $_onCancel: function $_onCancel() {
        var _this2 = this;

        this.hideTabPicker();
        setTimeout(function () {
          _this2.selected = (0, _util.extend)([], _this2.oldSelected);
          _this2.currentTab = _this2.oldCurrentTab;
          _this2.tabsTmpKey = Date.now();
        }, 100);
      },
      $_onSelectPaneItem: function $_onSelectPaneItem(value, index) {
        var _this3 = this;

        this.selected.splice(index, this.selected.length - index, value);
        this.$nextTick(function () {
          var nextPane = _this3.panes[index + 1];

          _this3.$emit('select', {
            index: index,
            value: value,
            option: _this3.panes[index]
          });

          if (nextPane) {
            _this3.currentTab = nextPane.name;
            _this3.$refs.scrollView.scrollTo(0, 0);
          } else if (value !== '') {
            setTimeout(function () {
              _this3.$emit('change', {
                values: _this3.getSelectedValues(),
                options: _this3.getSelectedOptions()
              });
              _this3.hideTabPicker();
            }, 300);
          }
        });
      },
      getSelectedValues: function getSelectedValues() {
        return this.selected;
      },
      getSelectedOptions: function getSelectedOptions() {
        if (this.panes && this.panes.length) {
          return this.panes.filter(function (pane) {
            return pane.value;
          }).map(function (pane) {
            return pane.selected;
          });
        } else {
          return [];
        }
      },
      hideTabPicker: function hideTabPicker() {
        this.$emit('input', false);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-tab-picker"},[_c('md-popup',{attrs:{"value":_vm.value,"position":"bottom","mask-closable":_vm.maskClosable},on:{"input":_vm.$_onPopupInput,"show":_vm.$_onPopupShow,"hide":_vm.$_onPopupHide,"maskClick":_vm.$_onCancel}},[_c('md-popup-title-bar',{attrs:{"title":_vm.title,"describe":_vm.describe,"large-radius":_vm.largeRadius,"only-close":""},on:{"cancel":_vm.$_onCancel}},[_c('md-icon',{attrs:{"slot":"cancel","name":"close","size":"lg"},slot:"cancel"})],1),_vm._v(" "),_c('div',{staticClass:"md-tab-picker-content"},[_c('md-tabs',{key:_vm.tabsTmpKey,ref:"tabs",attrs:{"inkLength":100},model:{value:(_vm.currentTab),callback:function ($$v) {_vm.currentTab=$$v},expression:"currentTab"}},[_c('md-scroll-view',{ref:"scrollView",attrs:{"scrolling-x":false,"auto-reflow":""}},_vm._l((_vm.panes),function(pane,index){return _c('md-tab-pane',{key:pane.name,attrs:{"name":pane.name,"label":pane.label}},[_c('md-radio-list',{attrs:{"value":pane.value,"options":pane.options,"is-slot-scope":_vm.hasSlot,"icon":"","icon-inverse":"","icon-position":"right"},on:{"input":function($event){return _vm.$_onSelectPaneItem($event, index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var option = ref.option;
return [_vm._t("default",null,{"option":option})]}}],null,true)})],1)}),1)],1)],1)],1)],1)}
__vue__options__.staticRenderFns = []
