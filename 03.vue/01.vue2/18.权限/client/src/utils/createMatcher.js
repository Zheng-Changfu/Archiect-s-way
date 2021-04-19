// 扁平化数据成映射表
export default function createMatcher (menulist) {
  const pathMap = {}
  for (let i = 0; i < menulist.length; i++) {
    const menu = menulist[i]
    mapFunction(menu, pathMap)
  }
  return pathMap
}

function mapFunction (menu, pathMap) {
  const path = menu.path
  pathMap[path] = true
  if (menu.children && menu.children.length > 0) {
    menu.children.forEach(cMenu => mapFunction(cMenu, pathMap))
  }
}
