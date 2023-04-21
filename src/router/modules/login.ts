export default {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登陆页',
    hideMenu: true,
  },
}
