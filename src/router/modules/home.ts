export default {
  path: '/index',
  name: 'index',
  component: () => import('@/views/home/index.vue'),
  meta: {
    title: '首页',
    hideMenu: true,
  },
}
