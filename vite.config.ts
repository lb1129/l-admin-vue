import { defineConfig, loadEnv, type PluginOption } from 'vite'
import viteBaseConfig from './vite.config.base'
import fs from 'node:fs'

// NOTE mergeConfig 对于 defineConfig(() => ({})) 合并无效
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const plugins: PluginOption[] = []
  // 开发环境强制预构建 ant-design-vue 所有组件样式 避免懒加载时造成页面刷新
  const optimizeDepsAntdIncludes: string[] = []
  if (mode === 'development') {
    fs.readdirSync('node_modules/ant-design-vue/es').map((componentName) => {
      if (fs.existsSync(`node_modules/ant-design-vue/es/${componentName}/style/index.js`))
        optimizeDepsAntdIncludes.push(`ant-design-vue/es/${componentName}/style`)
    })
  }
  return {
    base: env.VITE_PUBLIC_URL,
    ...viteBaseConfig,
    plugins: [...(viteBaseConfig.plugins ?? []), ...plugins],
    optimizeDeps: {
      include: optimizeDepsAntdIncludes
    }
  }
})
