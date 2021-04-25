'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = value => typeof value === 'object' && value !== null;
const extend = Object.assign;

const get = createGetter(false, false);
const shallowReactiveGetter = createGetter(false, true);
const readonlyGetter = createGetter(true, false);
const shallowReadonlyGetter = createGetter(true, true);
const set = createSetter();
const shallowReactiveSet = createSetter(true);
const readonlySetter = {
    set: () => {
        console.warn('set key fail');
    }
};
const mutableHandles = {
    get,
    set
};
const shallowReactiveHandles = {
    get: shallowReactiveGetter,
    set: shallowReactiveSet
};
const readonlyHandles = extend({
    get: readonlyGetter,
}, readonlySetter);
const shallowReadonlyHandles = extend({
    get: shallowReadonlyGetter,
    set
}, readonlySetter);
// 柯里化
/**
 *
 * @param isReadonly 是否只读，默认不是只读
 * @param shallow 是否浅层代理，默认不是浅层代理
 */
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key) {
        const res = Reflect.get(target, key);
        if (shallow) {
            // 是否为浅层代理
            return res;
        }
        if (isObject(res)) {
            // 如果读取到的值还是一个对象类型的话，要进行深度代理
            // 递归，相比较vue2代理，vue3代理是当我们取值时才会进行深度代理(懒代理)
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
/**
 *
 * @param shallow 是否为浅层代理,默认不是浅层代理
 */
function createSetter(shallow = false) {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value);
        return res;
    };
}

// 深度代理
const reactive = (target) => {
    return createProxy(target, false, mutableHandles);
};
// 浅层代理
const shallowReactive = (target) => {
    return createProxy(target, false, shallowReactiveHandles);
};
// 深度代理/只读
const readonly = (target) => {
    return createProxy(target, true, readonlyHandles);
};
// 浅层代理/浅层只读
const shallowReadonly = (target) => {
    return createProxy(target, true, shallowReadonlyHandles);
};
/**
 *
 * @param target 要被代理的目标对象
 * @param isReadonly 是否只读
 * @param basehandle get/set
 */
const reativeMap = new WeakMap();
const readonlyMap = new WeakMap();
function createProxy(target, isReadonly, basehandle) {
    // 如果目标不是对象，就不能被代理
    if (!isObject(target))
        return target;
    // 缓存代理的结果,不要被多次代理
    // 根据是否只读决定不同的存储空间
    const proxyMap = isReadonly ? readonlyMap : reativeMap;
    if (proxyMap.get(target)) {
        // 返回上一次存储的代理结果即可
        return proxyMap.get(target);
    }
    const proxy = new Proxy(target, basehandle);
    // 存储到容器中
    proxyMap.set(target, proxy);
    return proxy;
}

exports.reactive = reactive;
exports.readonly = readonly;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
//# sourceMappingURL=reactivity.cjs.js.map
