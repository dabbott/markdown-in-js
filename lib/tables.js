'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

var re = {
  nptable: / *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: / *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
};

var renderCell = function renderCell(type, align, value) {
  if (align) {
    return '<spur-element-' + type + ' spur-align-' + align + '>' + value + '</spur-element-' + type + '>';
  } else {
    return '<spur-element-' + type + '>' + value + '</spur-element-' + type + '>';
  }
};

var renderTable = function renderTable(_ref) {
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

  return str;
};

exports.default = function (src) {
  return src.replace(re.table, function (match, header, align, cells) {

    var item = {
      type: 'table',
      header: header.replace(/^ *| *\| *$/g, '').split(/ *\| */),
      align: align.replace(/^ *|\| *$/g, '').split(/ *\| */),
      cells: cells.replace(/(?: *\| *)?\n$/, '').split('\n')
    };

    for (var i = 0; i < item.align.length; i++) {
      if (/^ *-+: *$/.test(item.align[i])) {
        item.align[i] = 'right';
      } else if (/^ *:-+: *$/.test(item.align[i])) {
        item.align[i] = 'center';
      } else if (/^ *:-+ *$/.test(item.align[i])) {
        item.align[i] = 'left';
      } else {
        item.align[i] = null;
      }
    }

    for (var _i = 0; _i < item.cells.length; _i++) {
      item.cells[_i] = item.cells[_i].replace(/^ *\| *| *\| *$/g, '').split(/ *\| */);
    }

    return renderTable(item);
  }).replace(re.nptable, function (match, header, align, cells) {

    var item = {
      type: 'table',
      header: header.replace(/^ *| *\| *$/g, '').split(/ *\| */),
      align: align.replace(/^ *|\| *$/g, '').split(/ *\| */),
      cells: cells.replace(/\n$/, '').split('\n')
    };

    for (var i = 0; i < item.align.length; i++) {
      if (/^ *-+: *$/.test(item.align[i])) {
        item.align[i] = 'right';
      } else if (/^ *:-+: *$/.test(item.align[i])) {
        item.align[i] = 'center';
      } else if (/^ *:-+ *$/.test(item.align[i])) {
        item.align[i] = 'left';
      } else {
        item.align[i] = null;
      }
    }

    for (var _i2 = 0; _i2 < item.cells.length; _i2++) {
      item.cells[_i2] = item.cells[_i2].split(/ *\| */);
    }

    return renderTable(item);
  });
};