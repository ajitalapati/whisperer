/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_GATEWAY_ID_1: string
  readonly VITE_API_GATEWAY_ID_2: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 