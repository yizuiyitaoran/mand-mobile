var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { inBrowser } from './env';

var Dom = function () {
  function Dom() {
    _classCallCheck(this, Dom);
  }

  _createClass(Dom, [{
    key: 'appendChild',
    value: function appendChild() {}
  }, {
    key: 'removeChild',
    value: function removeChild() {}
  }, {
    key: 'querySelector',
    value: function querySelector() {}
  }, {
    key: 'addEventListener',
    value: function addEventListener() {}
  }, {
    key: 'removeEventListener',
    value: function removeEventListener() {}
  }]);

  return Dom;
}();

var dom = new Dom();
var mdDocument = dom;
var mdBody = dom;

mdDocument.body = mdBody;

if (inBrowser) {
  mdDocument = window.document;
  mdBody = document.body;
}

export { mdDocument, mdBody, dom };