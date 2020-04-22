import Vue from 'vue';

// Development environment
export var isProd = process.env.NODE_ENV === 'production';

// Browser environment sniffing
export var inBrowser = !Vue.prototype.$isServer || typeof window !== 'undefined';
export var UA = inBrowser && window.navigator.userAgent.toLowerCase();
export var isAndroid = UA && UA.indexOf('android') > 0;
export var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
export var root = typeof window !== 'undefined' ? window : global;