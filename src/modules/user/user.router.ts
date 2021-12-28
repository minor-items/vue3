const children: any = [
  {
    path: '/user',
    name: 'User',
    meta: { title: '用户', weight: 1, show: true, roles: [] },
    component: (): any =>
      import(/* webpackChunkName: 'user' */ './index/index.vue')
  }
]

export default children
