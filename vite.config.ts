import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import {
  createStyleImportPlugin,
  VxeTableResolve,
} from 'vite-plugin-style-import'

import { resolve } from 'path'
/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, dir)
}

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, root)
  const { VITE_PORT, VITE_BASE_URL, VITE_API_URL } = env
  const isBuild = command === 'build'
  console.log(env, isBuild)
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        // dts: 'src/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
        imports: [
          // 插件预设支持导入的api
          'vue',
          'vue-router',
          'pinia',
        ],
      }),
      Components({
        resolvers: [ElementPlusResolver(
          {
            importStyle: 'sass',
            directives: true,
          }
        )],
      }),
      createStyleImportPlugin({
        resolves: [VxeTableResolve()],
      }),
    ],
    base: VITE_BASE_URL,
    root,
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/style/element.scss" as *;`,
        },
      },
    },
    server: {
      https: false,
      host: true,
      port: VITE_PORT as unknown as number,
      proxy: {
        '/api': {
          target: VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("index.html")
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
  }
}
