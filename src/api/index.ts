
const serveFiles = require.context('./../api/', true, /\.api.ts$/)

const Interface: any = {}
serveFiles.keys().forEach((key: string) => {
  const urlArr = key.split("/")
  const apiKey=urlArr[urlArr.length-1].split(".")[0]
  Interface[apiKey] = serveFiles(key).default()
})

export {Interface}

export default {
  install: (Vue: any): void => {
    Vue.config.globalProperties.$api = Interface
  }
}
