/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@config'
declare module '@layout'
declare interface Window {
  __POWERED_BY_QIANKUN__ : string
}
