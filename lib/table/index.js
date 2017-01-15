'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceTableStubs = exports.replaceTablesWithHTML = undefined;

var _parser = require('./parser');

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replaceTablesWithHTML = exports.replaceTablesWithHTML = function replaceTablesWithHTML(src) {
  return src.replace(_parser.re.table, function (match) {
    for (var _len = arguments.length, capture = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      capture[_key - 1] = arguments[_key];
    }

    return (0, _renderer2.default)(_parser.parseTable.apply(undefined, capture));
  }).replace(_parser.re.nptable, function (match) {
    for (var _len2 = arguments.length, capture = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      capture[_key2 - 1] = arguments[_key2];
    }

    return (0, _renderer2.default)(_parser.parseNpTable.apply(undefined, capture));
  });
};

var replaceTableStubs = exports.replaceTableStubs = function replaceTableStubs(src) {
  return src.replace(/spur\-element\-([a-zA-Z])/gm, function (x, element) {
    return '_m_.' + element;
  }).replace(/spur\-align\-(left|right|center)/gm, function (x, align) {
    return 'style={{textAlign: \'' + align + '\'}}';
  });
};