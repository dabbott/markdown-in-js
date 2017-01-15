'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

var re = exports.re = {
  nptable: / *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/g,
  table: / *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/g
};

var parseTable = exports.parseTable = function parseTable(header, align, cells) {
  var item = {
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

  return item;
};

var parseNpTable = exports.parseNpTable = function parseNpTable(header, align, cells) {
  var item = {
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

  return item;
};