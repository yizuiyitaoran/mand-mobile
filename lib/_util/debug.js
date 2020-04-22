import { isProd } from './env';

export var warn = function warn(msg) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';

  !isProd && console[fn]('[Mand-Mobile]: ' + msg);
};