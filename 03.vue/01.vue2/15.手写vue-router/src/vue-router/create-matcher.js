import createRouteMap from "./create-route-map"

export default function createMatcher (routes) {
  let { pathMap } = createRouteMap(routes)
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