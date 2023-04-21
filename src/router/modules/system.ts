export default {
  path: '/system',
  name: 'system',
  component: () => import('@/layout/index.vue'),
  redirect: '/system/error',
  meta: {
    title: '系统',
    icon: 'icon-home',
  },
  children: [
    {
      path: '/system/error',
      name: 'error',
      component: () => import('@/views/system/error/index.vue'),
      meta: {
        title: 'error',
        icon: 'icon-error',
      },
    },
    {
      path: '/system/not-found',
      name: 'not-found',
      component: () => import('@/views/system/not-found/index.vue'),
      meta: {
        title: '404',
        icon: 'icon-error',
      },
    },
  ],
}
