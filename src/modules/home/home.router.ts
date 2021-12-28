const children: any = [
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', weight: 1, show: true, roles: [] },
    component: (): any =>
      import(/* webpackChunkName: 'home' */ './index/index.vue')
  }
]

export default children