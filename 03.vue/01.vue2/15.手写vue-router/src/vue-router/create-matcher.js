import craeteRouteMap from './create-route-map'
/**
 * 
 * @param {*} routes user-config-map
 */
export default function createMatcher (routes) {
  let { pathMap } = craeteRouteMap(routes)

  /**
   * 
   * @param {*} routes dynamic add route
   */
  function addRoutes (routes, oldPathMap) {
    craeteRouteMap(routes, oldPathMap)
  }

  /**
   * 
   * @param {*} path matching path ==>  route record
   */
  function match (path) {
    return pathMap[path]
  }
  return {
    addRoutes,
    match
  }
}