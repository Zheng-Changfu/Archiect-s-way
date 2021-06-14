const isObject = val => typeof val === 'object' && val !== null;
const extend = Object.assign;
const stringify = JSON.stringify;
const isArray = Array.isArray;
const IntegerKey = key => parseInt(key) + '' === key;
const isFunc = val => typeof val === 'function';
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);
const hasChanged = (oldValue, value) => oldValue !== value;

export { IntegerKey, extend, hasChanged, hasOwn, isArray, isFunc, isObject, stringify };
//# sourceMappingURL=shared.esm-bundler.js.map
