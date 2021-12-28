import { createStore } from 'vuex'
import { state, getters } from './variable'
import { mutations, actions } from './method'
const modulesFiles: any = require.context("./modules", true, /\.ts$/)
const modules: any = {}
modulesFiles.keys().forEach((key: string) => {
  const module: any = modulesFiles(key).default
  const moduleKey: any = `${key.replace(/(\.\/|\.ts)/g, '')}`

  modules[module.name || moduleKey] = module
  modules[module.name || moduleKey]['namespaced'] = true
})

const store: any = createStore({
  state,
  getters,
  mutations,
  actions,
  modules
})
export default store
