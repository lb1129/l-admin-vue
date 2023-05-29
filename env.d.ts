/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SYSTEM_NAME: string
  readonly VITE_AK: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
