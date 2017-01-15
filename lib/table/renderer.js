'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Create cell element with alignment
//
// The `align` attribute isn't valid, even though some markdown renderers use it.
// We can't use a style object prior to markdown parsing, and we can't use a
// style string in React. Instead, place a stub for alignment and swap after
// markdown parsing.
var renderCell = function renderCell(type, align, value) {
  if (align) {
    return '<spur-element-' + type + ' spur-align-' + align + '>' + value + '</spur-element-' + type + '>';
  } else {
    return '<spur-element-' + type + '>' + value + '</spur-element-' + type + '>';
  }
};

// Render gfm table markdown to HTML
//
// Use placeholder elements so that we can replace with _m_.element. We can't
// use _m_ directly here, since it isn't a valid HTML tag and will get encoded
// during markdown parsing

exports.default = function (_ref) {
  var header = _ref.header,
      align = _ref.align,
      cells = _ref.cells;

  var str = '';

  str += '<spur-element-table>';
  str += '<spur-element-thead>';
  str += '<spur-element-tr>';
  str += header.map(function (value, i) {
    return renderCell('th', align[i], value);
  }).join('');
  str += '</spur-element-tr>';
  str += '</spur-element-thead>';
  str += '<spur-element-tbody>';

  for (var i = 0; i < cells.length; i++) {
    str += '<spur-element-tr>';
    str += cells[i].map(function (value, j) {
      return renderCell('td', align[j], value);
    }).join('');
    str += '</spur-element-tr>';
  }

  str += '</spur-element-tbody>';
  str += '</spur-element-table>';

  // Keep table in a separate block from subsequent markdown
  str += '\n\n';

  return str;
};