
export function createElement (vm, tag, data = {}, ...children) {
  return createVDom(vm, tag, data, data.key, children, undefined)
}
export function createText (vm, text) {
  return createVDom(vm, undefined, undefined, undefined, undefined, text)
}
function createVDom (vm, tag, data, key, children, text) {
  return {
    vm,
    tag,
    data,
    key,
    children,
    text
  }
}