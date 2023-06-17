import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import mockServer from 'vite-plugin-mock-server'
import bodyParser from 'body-parser'

export default defineConfig({
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
    mockServer({
      middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        bodyParser.text(),
        bodyParser.raw()
      ]
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
})
