import Loqly from '@loqly/web'
import { ref, reactive, getCurrentInstance } from 'vue'

const state = reactive({
  locale: 'en',
  translations: {},
})

export const translate = (key) => {
  const translation = ref(state.translations?.[key]?.[state.locale] ?? key)
  return translation.value
}

export const useLoqly = () => {
  const instance = getCurrentInstance()

  const updateLanguage = (locale) => {
    state.locale = locale
    instance.proxy.$forceUpdate()
  }

  return {
    updateLanguage,
  }
}

export default {
  install: (
    app,
    { translations = {}, defaultLocale = 'en', func = '$t' } = {}
  ) => {
    state.translations = translations
    if (defaultLocale) state.locale = defaultLocale

    app.config.globalProperties[func] = translate
  },
}
