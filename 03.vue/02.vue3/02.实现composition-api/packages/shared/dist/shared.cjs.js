'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = val => typeof val === 'object' && val !== null;
const extend = Object.assign;
const stringify = JSON.stringify;
const isArray = Array.isArray;
const IntegerKey = key => parseInt(key) + '' === key;
const isFunc = val => typeof val === 'function';
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);
const hasChanged = (oldValue, value) => oldValue !== value;

exports.IntegerKey = IntegerKey;
exports.extend = extend;
exports.hasChanged = hasChanged;
exports.hasOwn = hasOwn;
exports.isArray = isArray;
exports.isFunc = isFunc;
exports.isObject = isObject;
exports.stringify = stringify;
//# sourceMappingURL=shared.cjs.js.map
