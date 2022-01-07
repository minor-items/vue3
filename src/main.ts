import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './registerServiceWorker'
import API from './api'
import route from './router'
<%_ if (isVuex) { _%>
  import store from "./store"
<%_ } _%>

const { routes, beforeEach, afterEach } = route
let router = null
let instance: any = null
let history: any = null
const { __POWERED_BY_QIANKUN__ } = window

function render(props: any = {}) {
  const { container, name } = props
  history = createWebHistory(__POWERED_BY_QIANKUN__ ? `${process.env.BASE_URL}${name}` : process.env.BASE_URL)
  router = createRouter({
    history,
    routes
  })

  router.beforeEach((to: any, from: any, next: any) => {
    beforeEach(to, from, next)
  })

  router.afterEach(() => {
    afterEach()
  })

  instance = createApp(App)
  instance.use(API)
  instance.use(router)
  <%_ if (isVuex) { _%>
    instance.use(store)
  <%_ } _%>
  instance.mount(container ? container.querySelector('#<%= packageName %>') : '#<%= packageName %>')
}

if (!__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  const { log } = console
  log('%c ', 'color: green', 'vue3.0 app bootstraped')
}

function storeTest(props: any) {
  const { log } = console

  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value: any, prev: any) => log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    )
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    })
}

export async function mount(props: any) {
  storeTest(props)
  render(props)
  instance.config.globalProperties.$appProps= props
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount() {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
  router = null
  history.destroy()
}
