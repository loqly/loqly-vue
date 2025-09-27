import { ref, reactive, getCurrentInstance } from 'vue'
import Loqly from '@loqly/web'

const state = reactive({
  locale: 'en',
  defaultLocale: 'en',
  translations: {},
})

export const translate = (key, payload = null) => {
  const translation = ref(state.translations?.[key]?.[state.locale])
  if (translation.value)
    return Loqly.interpolateTranslation(translation.value, payload)

  const fallbackTranslation = ref(
    state.translations?.[key]?.[state.defaultLocale]
  )
  if (fallbackTranslation.value)
    return Loqly.interpolateTranslation(translation.value, payload)

  return Loqly.interpolateTranslation(key, payload)
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
    state.locale = defaultLocale
    state.locale = defaultLocale

    app.config.globalProperties[func] = translate
  },
}
