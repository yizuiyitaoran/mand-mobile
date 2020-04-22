/**
 * Read Image In Web Worker or main thread
 * 
 * STATUS
 * 0: success
 * 100: 'browser does not support',
 * 101: 'picture size is beyond the preset',
 * 102: 'picture read failure',
 * 103: 'the number of pictures exceeds the limit'
 */

export default function (global) {
  /**
   * Constructor
   * @param{*} [Array]files 图片文件
   * @param{*} [Boolean]isWebWorker 是否为webwork模式调用
   * @param{*} [Number]size 单张图片大小限制
   * @param{*} [Function]complete 非webwork模式时 回调 res { errorCode: '0', file, dataUrl }
   */
  function ImageReader(options) {
    /* istanbul ignore if */
    if (!options.files) {
      return;
    }

    this.files = options.files;
    this.index = 0;
    this.size = options.size || 0;

    if (!options.isWebWorker && options.complete) {
      this.callback = options.complete;
    }

    this.readImage(options.files[this.index]);
  }

  ImageReader.prototype.readImage = function (file) {
    var _this = this;

    // iterator
    var next = this.files && this.index < this.files.length - 1 ? function () {
      _this.index += 1;
      _this.readImage(_this.files[_this.index]);
    } : null;

    var onReadImageComplete = function onReadImageComplete() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /* istanbul ignore else */
      if (_this.callback) {
        _this.callback(msg);
      } else {
        postMessage(msg);
      }
      next && next();
    };

    if (!this.size || file.size <= this.size) {
      var reader = new FileReader();

      reader.onload = function (readerEvt) {
        var dataUrl = readerEvt.target.result;
        onReadImageComplete({ errorCode: 0, file: file, dataUrl: dataUrl });
      };
      reader.onerror = function () {
        /* istanbul ignore next */
        onReadImageComplete({ errorCode: 102 });
      };

      reader.readAsDataURL(file);
    } else {
      onReadImageComplete({ errorCode: 101 });
    }
  };

  var onmessageCallback = function onmessageCallback(workerEvt) {
    var imageReader = new ImageReader(workerEvt.data);
    return imageReader;
  };

  if (global) {
    return function (data) {
      return onmessageCallback({ data: data });
    };
  } else {
    /* global onmessage */
    /* eslint no-unused-vars: 0 */
    /* eslint no-global-assign: 0 */
    /* istanbul ignore next */
    onmessage = onmessageCallback;
  }
}