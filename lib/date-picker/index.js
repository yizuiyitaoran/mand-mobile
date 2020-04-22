;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../picker', '../picker/mixins', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../picker'), require('../picker/mixins'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.picker, global.mixins, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _picker, _mixins, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _picker2 = _interopRequireDefault(_picker);

  var _mixins2 = _interopRequireDefault(_mixins);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var TYPE_FORMAT = {
    'yyyy': 'Year',
    'MM': 'Month',
    'dd': 'Date',
    'HH': 'Hour',
    'hh': 'Hour',
    'mm': 'Minute'
  };

  var TYPE_FORMAT_INVERSE = (0, _util.toObject)(Object.keys(TYPE_FORMAT).map(function (item) {
    return _defineProperty({}, TYPE_FORMAT[item], item);
  }));

  var TYPE_METHODS = {
    'Year': 'getFullYear',
    'Month': 'getMonth',
    'Date': 'getDate',
    'Hour': 'getHours',
    'Minute': 'getMinutes'
  };

  exports.default = {
    name: 'md-date-picker',

    mixins: [_mixins2.default],

    components: _defineProperty({}, _picker2.default.name, _picker2.default),

    props: {
      type: {
        type: String,
        default: 'date'
      },
      customTypes: {
        type: Array,
        default: function _default() {
          return [];
        },
        validator: function validator(val) {
          var res = true;
          val.forEach(function (type) {
            type = TYPE_FORMAT[type] || type;

            if (!(type in TYPE_METHODS)) {
              return res = false;
            }
          });
          return res;
        }
      },
      minDate: {
        type: Date
      },
      maxDate: {
        type: Date
      },
      defaultDate: {
        type: Date
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      unitText: {
        type: Array,
        default: function _default() {
          return ['年', '月', '日', '时', '分'];
        }
      },
      todayText: {
        type: String,
        default: ''
      },
      textRender: {
        type: [Function, String],
        default: ''
      }

    },

    data: function data() {
      return {
        isPickerShow: false,
        currentDateIns: new Date(),
        columnData: [],
        oldColumnData: null,
        columnDataDefault: [],
        columnDataGenerator: []
      };
    },


    computed: {
      picker: function picker() {
        return this.$refs['picker'];
      },
      currentYear: function currentYear() {
        return this.currentDateIns.getFullYear();
      },
      currentMonth: function currentMonth() {
        return this.currentDateIns.getMonth() + 1;
      },
      currentDate: function currentDate() {
        return this.currentDateIns.getDate();
      },
      currentHours: function currentHours() {
        return this.currentDateIns.getHours();
      },
      currentMinutes: function currentMinutes() {
        return this.currentDateIns.getMinutes();
      }
    },

    watch: {
      value: function value(val) {
        this.isPickerShow = val;
      },
      isPickerShow: function isPickerShow(val) {
        if (!val) {
          this.$emit('input', val);
        }
      },
      defaultDate: function defaultDate() {
        this.$_initPickerColumn();
      },
      minDate: function minDate() {
        this.$_initPickerColumn();
      },
      maxDate: function maxDate() {
        this.$_initPickerColumn();
      }
    },

    mounted: function mounted() {
      this.$_initPicker();
    },


    methods: {
      $_initPicker: function $_initPicker() {
        if (!this.isView && this.value) {
          this.isPickerShow = this.value;
        }

        this.picker.inheritPickerApi(this);
        this.$_initPickerColumn();
      },
      $_initPickerColumn: function $_initPickerColumn() {
        this.$_resetPickerColumn();
        this.$_initColumnDataGenerator();
        this.$_initColumnData(0, this.columnDataDefault);
      },
      $_resetPickerColumn: function $_resetPickerColumn() {
        this.oldColumnData = null;
        this.columnData = [];
        this.columnDataDefault = [];
        this.columnDataGenerator = [];
      },
      $_initColumnData: function $_initColumnData(columnIndex) {
        var defaultDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var isSetColumn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var columnData = this.columnData;
        var columnDataGenerator = this.columnDataGenerator;
        for (var i = columnIndex, len = columnDataGenerator.length; i < len; i++) {
          var columnDataGeneratorParams = [];
          var generator = columnDataGenerator[i];
          for (var j = 0; j < i; j++) {
            var _generator = columnDataGenerator[j];
            if (defaultDate[j] && _generator) {
              columnDataGeneratorParams.push({
                type: _generator.type,
                value: defaultDate[j]
              });
              continue;
            }

            var itemIndex = this.picker.getColumnIndex(j) || 0;

            if (columnData[j]) {
              columnDataGeneratorParams.push(columnData[j][itemIndex]);
            } else {
              columnDataGeneratorParams.push('');
              (0, _util.warn)('DatePicker columnData of index ' + j + ' is void');
            }
          }

          var curColumnData = generator ? generator.apply(this, columnDataGeneratorParams) : '';

          isSetColumn && this.picker.setColumnValues(i, curColumnData);

          this.$set(columnData, i, curColumnData);
        }

        isSetColumn && this.picker.refresh(null, columnIndex);
      },
      $_initColumnDataGenerator: function $_initColumnDataGenerator() {
        this.$_generateYearData.type = 'Year';
        this.$_generateMonthData.type = 'Month';
        this.$_generateDateData.type = 'Date';
        this.$_generateHourData.type = 'Hour';
        this.$_generateMinuteData.type = 'Minute';

        var defaultDate = this.$_getDefaultDate();
        switch (this.type) {
          case 'date':
            this.$_initColumnDataGeneratorForDate(defaultDate);
            break;
          case 'time':
            this.$_initColumnDataGeneratorForTime(defaultDate);
            break;
          case 'datetime':
            this.$_initColumnDataGeneratorForDate(defaultDate);
            this.$_initColumnDataGeneratorForTime(defaultDate);
            break;
          default:
            this.$_initColumnDataGeneratorForCustom(defaultDate);
            break;
        }
      },
      $_initColumnDataGeneratorForDate: function $_initColumnDataGeneratorForDate(defaultDate) {
        this.columnDataGenerator = this.columnDataGenerator.concat([this.$_generateYearData, this.$_generateMonthData, this.$_generateDateData]);

        this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([defaultDate.getFullYear(), defaultDate.getMonth() + 1, defaultDate.getDate()]) : [];
      },
      $_initColumnDataGeneratorForTime: function $_initColumnDataGeneratorForTime(defaultDate) {
        this.columnDataGenerator = this.columnDataGenerator.concat([this.$_generateHourData, this.$_generateMinuteData]);
        this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([defaultDate.getHours(), defaultDate.getMinutes()]) : [];
      },
      $_initColumnDataGeneratorForCustom: function $_initColumnDataGeneratorForCustom(defaultDate) {
        var _this = this;

        this.customTypes.forEach(function (type) {
          type = TYPE_FORMAT[type] || type;
          _this.columnDataGenerator.push(_this['$_generate' + type + 'Data']);

          if (defaultDate) {
            var value = defaultDate[TYPE_METHODS[type]]();

            if (type === 'Month') {
              value += 1;
            }

            _this.columnDataDefault.push(value);
          }
        });
      },
      $_getDefaultDate: function $_getDefaultDate() {
        var defaultDate = this.defaultDate;
        var minDate = this.minDate;
        var maxDate = this.maxDate;

        if (!defaultDate) {
          return defaultDate;
        }

        if (minDate && defaultDate.getTime() < minDate.getTime()) {
          return minDate;
        }

        if (maxDate && defaultDate.getTime() > maxDate.getTime()) {
          return maxDate;
        }

        return defaultDate;
      },
      $_getGeneratorArguments: function $_getGeneratorArguments(args) {
        var defaultArguments = {
          Year: this.currentYear,
          Month: this.currentMonth,
          Date: this.currentDate,
          Hour: this.currentHours,
          Minute: this.currentMinutes
        };
        args.map(function (item) {
          item && (defaultArguments[item.type] = item.value);
        });
        return defaultArguments;
      },
      $_generateYearData: function $_generateYearData() {
        var start = this.minDate ? this.minDate.getFullYear() : this.currentYear - 20;
        var end = this.maxDate ? this.maxDate.getFullYear() : this.currentYear + 20;

        if (start > end) {
          (0, _util.warn)('MinDate Year should be earlier than MaxDate');
          return;
        }
        return this.$_generateData(start, end, 'Year', this.unitText[0], 1);
      },
      $_generateMonthData: function $_generateMonthData() {
        var args = this.$_getGeneratorArguments((0, _util.toArray)(arguments));
        var start = void 0,
            end = void 0;

        if (this.$_isDateTimeEqual(this.minDate, args.Year)) {
          start = this.minDate.getMonth() + 1;
        } else {
          start = 1;
        }

        if (this.$_isDateTimeEqual(this.maxDate, args.Year)) {
          end = this.maxDate.getMonth() + 1;
        } else {
          end = 12;
        }
        return this.$_generateData(start, end, 'Month', this.unitText[1] || '', 1, arguments);
      },
      $_generateDateData: function $_generateDateData() {
        var args = this.$_getGeneratorArguments((0, _util.toArray)(arguments));

        var start = void 0,
            end = void 0;

        if (this.$_isDateTimeEqual(this.minDate, args.Year, args.Month)) {
          start = this.minDate.getDate();
        } else {
          start = 1;
        }

        if (this.$_isDateTimeEqual(this.maxDate, args.Year, args.Month)) {
          end = this.maxDate.getDate();
        } else {
          end = new Date(args.Year, args.Month, 0).getDate();
        }

        var dateData = this.$_generateData(start, end, 'Date', this.unitText[2] || '', 1, arguments);

        if (this.$_isDateTimeEqual(this.currentDateIns, args.Year, args.Month) && this.currentDate >= start && this.currentDate <= end && this.todayText) {
          var currentDateIndex = this.currentDate - start;
          var currentDate = dateData[currentDateIndex].text;
          dateData[currentDateIndex].text = this.todayText.replace('&', currentDate);
        }

        return dateData;
      },
      $_generateHourData: function $_generateHourData() {
        var args = this.$_getGeneratorArguments((0, _util.toArray)(arguments));
        var start = void 0,
            end = void 0;

        if (this.$_isDateTimeEqual(this.minDate, args.Year, args.Month, args.Date)) {
          start = this.minDate.getHours();
        } else {
          start = 0;
        }

        if (this.$_isDateTimeEqual(this.maxDate, args.Year, args.Month, args.Date)) {
          end = this.maxDate.getHours();
        } else {
          end = 23;
        }

        if (end < start) {
          end = 23;
        }

        if (start > end) {
          (0, _util.warn)('MinDate Hour should be earlier than MaxDate');
          return;
        }

        return this.$_generateData(start, end, 'Hour', this.unitText[3] || '', 1, arguments);
      },
      $_generateMinuteData: function $_generateMinuteData() {
        var args = this.$_getGeneratorArguments((0, _util.toArray)(arguments));
        var start = void 0,
            end = void 0;

        if (this.$_isDateTimeEqual(this.minDate, args.Year, args.Month, args.Date, args.Hour)) {
          start = this.minDate.getMinutes();
        } else {
          start = 0;
        }

        if (this.$_isDateTimeEqual(this.maxDate, args.Year, args.Month, args.Date, args.Hour)) {
          end = this.maxDate.getMinutes();
        } else {
          end = 59;
        }

        return this.$_generateData(start, end, 'Minute', this.unitText[4] || '', this.minuteStep, arguments);
      },
      $_generateData: function $_generateData(from, to, type, unit) {
        var step = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var args = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

        var count = from;
        var text = void 0;
        var data = [];
        var defaultArgs = (0, _util.toArray)(args).map(function (item) {
          return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item.value : item;
        });

        while (count <= to) {
          this.textRender && (text = this.textRender.apply(this, [TYPE_FORMAT_INVERSE[type]].concat(_toConsumableArray(defaultArgs), [count])));
          data.push({
            text: text || '' + count + unit,
            value: count,
            typeFormat: TYPE_FORMAT_INVERSE[type] || type,
            type: type
          });
          count += step;
        }

        return data;
      },
      $_isDateTimeEqual: function $_isDateTimeEqual() {
        var methods = Object.keys(TYPE_METHODS).map(function (key) {
          return TYPE_METHODS[key];
        });
        var args = (0, _util.toArray)(arguments);
        var date = args[0];

        var res = true;
        if (!date) {
          return res = false;
        }

        for (var i = 1; i < args.length; i++) {
          var methodName = methods[i - 1];
          var curVal = date[methodName]() + Number(methodName === 'getMonth');
          var targetVal = +args[i];

          if (curVal !== targetVal) {
            res = false;
            break;
          }
        }

        return res;
      },
      $_onPickerShow: function $_onPickerShow() {
        this.oldColumnData = [].concat(_toConsumableArray(this.columnData));
        this.$emit('show');
      },
      $_onPickerHide: function $_onPickerHide() {
        this.$emit('hide');
      },
      $_onPickerChange: function $_onPickerChange(columnIndex, itemIndex, value) {
        this.$emit('change', columnIndex, itemIndex, value);

        if (columnIndex < this.columnData.length - 1) {
          this.$_initColumnData(columnIndex + 1);
        }
      },
      $_onPickerConfirm: function $_onPickerConfirm(columnsValue) {
        this.$emit('confirm', columnsValue);
      },
      $_onPickerCancel: function $_onPickerCancel() {
        this.$emit('cancel');
        if (this.oldColumnData) {
          this.columnData = [].concat(_toConsumableArray(this.oldColumnData));
        }
      },
      getFormatDate: function getFormatDate() {
        var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'yyyy-MM-dd hh:mm';

        var columnValues = this.picker.getColumnValues();

        columnValues.forEach(function (item) {
          if (!item) {
            return;
          }

          var value = item.value;

          if (value < 10) {
            value = '0' + value;
          }

          format = format.replace('HH', 'hh');
          format = format.replace(item.type, value);
          format = format.replace(TYPE_FORMAT_INVERSE[item.type], value);
        });

        return format;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-date-picker",class:[_vm.type]},[_c('md-picker',{ref:"picker",attrs:{"data":_vm.columnData,"cols":_vm.columnData.length,"default-value":_vm.columnDataDefault,"line-height":_vm.lineHeight,"title":_vm.title,"describe":_vm.describe,"ok-text":_vm.okText,"cancel-text":_vm.cancelText,"large-radius":_vm.largeRadius,"is-view":_vm.isView,"mask-closable":_vm.maskClosable,"keep-index":_vm.keepIndex},on:{"initialed":function($event){return _vm.$emit('initialed')},"change":_vm.$_onPickerChange,"confirm":_vm.$_onPickerConfirm,"cancel":_vm.$_onPickerCancel,"show":_vm.$_onPickerShow,"hide":_vm.$_onPickerHide},model:{value:(_vm.isPickerShow),callback:function ($$v) {_vm.isPickerShow=$$v},expression:"isPickerShow"}})],1)}
__vue__options__.staticRenderFns = []
