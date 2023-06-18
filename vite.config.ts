import { defineConfig, loadEnv, type PluginOption } from 'vite'
import viteBaseConfig from './vite.config.base'

// NOTE mergeConfig 对于 defineConfig(() => ({})) 合并无效
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const plugins: PluginOption[] = []
  // if (mode === 'development') {
  // }
  return {
    base: env.VITE_PUBLIC_URL,
    ...viteBaseConfig,
    plugins: [...(viteBaseConfig.plugins ?? []), ...plugins]
  }
})
