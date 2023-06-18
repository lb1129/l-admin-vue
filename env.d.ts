/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SYSTEM_NAME: string
  readonly VITE_AK: string
  readonly VITE_NOT_SUPPORT_HISTORY: string
  readonly VITE_PUBLIC_URL: string
  readonly VITE_SERVER_IS_MOCK: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
