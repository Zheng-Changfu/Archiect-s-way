/**
 * 
 * @param {*} routes user routes map
 * @param {*} oldPathMap old path routes map
 */
export default function createRouteMap (routes, oldPathMap) {
  console.log(222)
  oldPathMap = oldPathMap ? oldPathMap : {}
  let pathMap = oldPathMap
  routes.forEach(route => {
    createRouteRecord(route)
  })

  function createRouteRecord (route, parent) {
    let path = parent ? `${parent.path}/${route.path}` : route.path
    let record = {
      path,
      component: route.component,
      props: route.props || {},
      parent
    }
    pathMap[path] = record
    if (route.children && route.children.length > 0) {
      route.children.forEach(cRoute => createRouteRecord(cRoute, record))
    }
  }

  return {
    pathMap
  }
}