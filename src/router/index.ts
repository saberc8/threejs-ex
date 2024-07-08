import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { HomePath, LoginPath } from '@/config/constants'
import { getToken } from '@/utils/auth'
// 导入所有router
const metaRouters: any = import.meta.glob('./modules/*.ts', {
  eager: true,
  import: 'default',
})
// 处理路由
export const routerArray: RouteRecordRaw[] = Object.keys(metaRouters).map(
  (key) => metaRouters[key] || {},
)

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HomePath,
  },
  ...routerArray,
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: { name: '404' },
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL as string),
  routes,
})

// router.beforeEach((to, _from, next) => {

// })

export default router
