export default {
  path: '/demo',
  name: 'demo',
  redirect: '/demo/art',
  meta: {
    title: '艺术展厅',
  },
  children: [
    {
      path: '/demo/art',
      name: 'art',
      component: () => import('@/views/demo/art/index.vue'),
      meta: {
        title: '艺术展厅',
      },
    },
    {
      path: '/demo/virtual-humans',
      name: 'virtual-humans',
      component: () => import('@/views/demo/virtual-humans/index.vue'),
      meta: {
        title: '虚拟人',
      },
    },
    {
      path: '/demo/cd1',
      name: 'cd1',
      component: () => import('@/views/demo/cd1/index.vue'),
      meta: {
        title: 'cd1',
      },
    },
    {
      path: '/demo/dashboard',
      name: 'dashboard',
      component: () => import('@/views/demo/dashboard/index.vue'),
      meta: {
        title: '大屏展示',
      },
    },
  ],
}
