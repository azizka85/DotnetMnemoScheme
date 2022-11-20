import { LanguageInfo } from "./language-info"

export interface Settings {
  pageRoot: string
  defaultLanguage: string
  languages: {[key: string]: LanguageInfo}
  bundleVersion: string
}
