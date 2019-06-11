(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._util);
    global.cascade = mod.exports;
  }
})(this, function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (picker) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var fn = arguments[2];

    options = (0, _util.extend)(defaultOptions, options);

    /* istanbul ignore if */
    if (!picker) {
      (0, _util.warn)('cascade: picker is undefined');
      return;
    }

    var values = options.values;

    /* istanbul ignore next */
    for (var i = options.currentLevel + 1; i < options.maxLevel; i++) {
      var columnValues = (!i ? values[i] : values.children) || [];
      picker.setColumnValues(i, columnValues);
      var activeIndex = getDefaultIndex(columnValues, options.defaultIndex[i], options.defaultValue[i]);
      activeIndex >= columnValues.length && (activeIndex = 0);
      values = columnValues[activeIndex] || [];
    }

    fn && fn();
  };

  var defaultOptions = {
    currentLevel: 0,
    maxLevel: 0,
    values: [],
    defaultIndex: [],
    defaultValue: []
  };

  function getDefaultIndex(data, defaultIndex, defaultValue) {
    var activeIndex = 0;
    if (defaultIndex !== undefined) {
      return defaultIndex;
    } else if (defaultValue !== undefined) {
      data.some(function (item, index) {
        if (item.text === defaultValue || item.label === defaultValue || item.value === defaultValue) {
          activeIndex = index;
          return true;
        }
      });
    }
    return activeIndex;
  }

  /**
   * cascade column by set value of following columns
   * @param {*} picker instance of picker-column
   * @param {*} options { currentLevel, maxLevel, values }
   * @param {*} fn
   */
});