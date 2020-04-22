(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './env'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./env'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.env);
    global.render = mod.exports;
  }
})(this, function (exports, _env) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.render = undefined;


  /* istanbul ignore file */
  var render = exports.render = function (global) {
    // for ssr
    if (!_env.inBrowser) {
      return function (content, left, top) {
        content.style.marginLeft = left ? -left + 'px' : '';
        content.style.marginTop = top ? -top + 'px' : '';
      };
    }
    var docStyle = document.documentElement.style;

    var engine = void 0;

    if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
      engine = 'presto';
    } else if ('MozAppearance' in docStyle) {
      engine = 'gecko';
    } else if ('WebkitAppearance' in docStyle) {
      engine = 'webkit';
    } else if (typeof navigator.cpuClass === 'string') {
      engine = 'trident';
    }

    var vendorPrefix = {
      trident: 'ms',
      gecko: 'Moz',
      webkit: 'Webkit',
      presto: 'O'
    }[engine];

    var helperElem = document.createElement('div');
    var perspectiveProperty = vendorPrefix + 'Perspective';
    var transformProperty = vendorPrefix + 'Transform';

    if (helperElem.style[perspectiveProperty] !== undefined) {
      return function (content, left, top) {
        var zoom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var useNativeDriver = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (useNativeDriver) {
          content.style[transformProperty] = 'translate3d(' + -left + 'px,' + -top + 'px,0) scale(' + zoom + ')';
        } else {
          content.style[transformProperty] = 'translate(' + -left + 'px,' + -top + 'px) scale(' + zoom + ')';
        }
      };
    } else if (helperElem.style[transformProperty] !== undefined) {
      return function (content, left, top) {
        var zoom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        content.style[transformProperty] = 'translate(' + -left + 'px,' + -top + 'px) scale(' + zoom + ')';
      };
    } else {
      return function (content, left, top, zoom) {
        content.style.marginLeft = left ? -left + 'px' : '';
        content.style.marginTop = top ? -top + 'px' : '';
        content.style.zoom = zoom || '';
      };
    }
  }(_env.root);
});