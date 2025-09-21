# loqly-vue

**loqly-vue** is a JavaScript package that makes it easy to integrate [loqly](https://loqly.dev) for internationalization and copy management in your Vue.js projects.

For detailed documentation and guides, visit the [loqly documentation](https://loqly.dev/documentation).

## Installation

Install via npm

```bash
npm install @loqly/vue
```

Include via script tag

```html
<script src="https://unpkg.com/@loqly/vue/dist/index.umd.js"></script>
```

## Setup

In your main.js, import LoqlyVue and register it as a plugin:

```js
import { createApp } from 'vue'
import App from './App.vue'
import LoqlyVue from '@loqly/vue'

const app = createApp(App)

app.use(LoqlyVue, {
  apiKey: 'your-loqly-api-key',
  defaultLocale: 'en', // Optional, default is 'en'
  func: '$t', // Optional, name of global translate function, default is '$t'
})

app.mount('#app')
```

If you pass a translations object to the plugin, loqly will not fetch translations remotely. Your translations should be structured like this:

```js
const translations = {
  'auth.btn.login': {
    en: 'Login',
    de: 'Anmelden',
  },
  error_404: {
    en: 'Page not found.',
    de: 'Seite konnte nicht gefunden werden.',
  },
}
```

## Usage

### Translating text

After registering the plugin, a global translation function (default: $t) will be available in all templates:

```html
<button>{{ $t('auth.btn.login') }}</button>
```

If you configured for example func: 't', you would instead write:

```html
<button>{{ t('auth.btn.login') }}</button>
```

### Updating the language

To change the current language dynamically, use the useLoqly composable inside your components:

```vue
<script setup>
import { useLoqly } from '@loqly/vue'

const { updateLanguage } = useLoqly()
</script>

<template>
  <button @click="updateLanguage('de')">Switch to German</button>
  <button @click="updateLanguage('en')">Switch to English</button>
</template>
```

### Translating programmatically

If you prefer, you can call the translate function directly instead of using the global $t:

```js
import { translate } from '@loqly/vue'

const btnText = translate('auth.btn.login')
```

### Using loqly in custom functionality

You can also fetch translations directly, without initializing the plugin:

```js
import { getTranslations } from '@loqly/vue'

const translations = await getTranslations('your-loqly-api-key')
```
