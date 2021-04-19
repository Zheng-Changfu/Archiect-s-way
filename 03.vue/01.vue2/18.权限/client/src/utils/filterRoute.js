
export default function filterRoute (sourceMap, authlist) {
  return authlist.filter(authRoute => {
    if (sourceMap[authRoute.path] || sourceMap['/' + authRoute.path]) return true
    if (authRoute.children && authRoute.children.length > 0) {
      authRoute.children = filterRoute(sourceMap, authRoute.children)
    }
  })
}