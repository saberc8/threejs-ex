export default {
  path: '/base',
  name: 'base',
  component: () => import('@/layout/index.vue'),
  redirect: '/base/dashboard',
  meta: {
    title: '基础',
    icon: 'icon-home',
  },
  children: [
    {
      path: '/base/dashboard',
      name: 'home',
      component: () => import('@/views/base/dashboard/index.vue'),
      meta: {
        title: '首页',
        icon: 'icon-dashboard',
      },
    },
    {
      path: '/base/about',
      name: 'about',
      component: () => import('@/views/base/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'icon-dashboard',
      },
    },
  ],
}
