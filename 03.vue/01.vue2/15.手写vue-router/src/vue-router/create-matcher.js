import createRouteMap from "./create-route-map"

export default function createMatcher (routes) {
  let { pathMap } = createRouteMap(routes)
  console.log(pathMap, '处理后的')
  function match (path) {
    return pathMap[path]
  }

  function addRoutes (routes) {
    createRouteMap(routes, pathMap)
  }
  return {
    match,
    addRoutes
  }
}