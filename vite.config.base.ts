import { fileURLToPath, URL } from 'node:url'

import { type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import dynamicImport from 'vite-plugin-dynamic-import'

const config: UserConfig = {
  server: {
    open: true
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      extensions: ['vue', 'tsx'],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
          importStyle: 'less'
        })
      ]
    }),
    dynamicImport({
      filter(id) {
        if (id.includes('/node_modules/@ant-design/icons-vue')) {
          return true
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // 为每个样式内容注入变量文件
        additionalData: `@import "@/assets/style/variable.less";`,
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  }
}

export default config
