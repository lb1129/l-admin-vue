import { createI18n } from 'vue-i18n'
import zhCn from './messages/zh-cn'
import en from './messages/en'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': zhCn,
    en
  }
})

export default i18n
