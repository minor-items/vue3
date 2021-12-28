const routerFiles: any = require.context('./../modules', true, /\.router.ts$/)
let routes: any = []
routerFiles.keys().forEach((key: string) => {
  const routerArr = routerFiles(key).default
  routes = routes.concat(routerArr)
})

export default routes
