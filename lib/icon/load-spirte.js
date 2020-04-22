// inspried by https://github.com/kisenka/svg-sprite-loader/blob/master/runtime/browser-sprite.js
// Much simplified, do make sure run this after document ready
import icons from './default-svg-list';

var svgSprite = function svgSprite(contents) {
  return '\n<svg\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:xlink="http://www.w3.org/1999/xlink"\n  id="__MAND_MOBILE_SVG_SPRITE_NODE__"\n  style="position:absolute;width:0;height:0"\n>\n  <defs>\n    ' + contents + '\n  </defs>\n</svg>\n';
};

var renderSvgSprite = function renderSvgSprite() {
  var symbols = Object.keys(icons).map(function (iconName) {
    var svgContent = icons[iconName].split('svg')[1];
    return '<symbol id=' + iconName + svgContent + 'symbol>';
  }).join('');
  return svgSprite(symbols);
};

var loadSprite = function loadSprite() {
  /* istanbul ignore if */
  if (!document) {
    return;
  }
  var existing = document.getElementById('__MAND_MOBILE_SVG_SPRITE_NODE__');
  var mountNode = document.body;

  if (!existing) {
    mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite());
  }
};

export default loadSprite;