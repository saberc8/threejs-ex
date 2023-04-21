export default {
  path: '/user',
  name: 'user',
  component: () => import('@/layout/index.vue'),
  redirect: '/user/user',
  meta: {
    title: '用户管理',
    icon: 'icon-home',
  },
  children: [
    {
      path: '/user/user',
      name: 'user',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '用户列表',
        icon: 'icon-user',
      },
    },
  ],
}
