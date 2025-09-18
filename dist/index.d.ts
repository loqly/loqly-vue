import { App } from 'vue'
import LoqlyWeb from '@loqly/web'

export interface LoqlyOptions {
  apiKey: string
  defaultLocale?: string
}

export interface LoqlyState {
  locale: string
  translations: Record<string, string>
}

export interface LoqlyInstance {
  loqly: LoqlyWeb
  state: LoqlyState
  init: () => Promise<void>
}

export declare function createLoqly(options: LoqlyOptions): LoqlyInstance
export declare function useLoqly(): LoqlyInstance

declare const plugin: {
  install(app: App, options: LoqlyOptions): void
}

export default plugin
