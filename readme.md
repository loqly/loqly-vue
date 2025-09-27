# loqly-vue

**loqly-vue** is a JavaScript package that makes it easy to integrate [loqly](https://loqly.dev) for internationalization and copy management in your Vue.js projects.

For detailed documentation and guides, visit the [loqly documentation](https://loqly.dev/documentation).

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Translating in Components](#translating-in-components)
- [Interpolation](#interpolation)
- [Updating the Langugae](#updating-the-language)

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
import LoqlyVue, { getTranslations } from '@loqly/vue'

const app = createApp(App)

const translations = await getTranslations('your-loqly-api-key')
app.use(LoqlyVue, {
  translations: translations,
  defaultLocale: 'en', // Optional, default is 'en'
  func: '$t', // Optional, name of global translate function, default is '$t'
})

app.mount('#app')
```

If you pass a fallback object to the plugin, your translations should be structured like this:

```json
{
  "auth.btn.login": {
    "en": "Login",
    "de": "Anmelden"
  },
  "error_404": {
    "en": "Page not found.",
    "de": "Seite konnte nicht gefunden werden."
  }
}
```

## Translating in Components

After registering the plugin, a global translation function (default: $t) will be available in all templates:

```html
<button>{{ $t('auth.btn.login') }}</button>
```

If you configured for example func: 't', you would instead write:

```html
<button>{{ t('auth.btn.login') }}</button>
```

If you prefer, you can call the translate function directly instead of using the global $t:

```js
import { translate } from '@loqly/vue'

const btnText = translate('auth.btn.login')
```

## Interpolation

You can easily insert dynamic content into your translations using our string interpolation functionality:

```vue
<h2>
  {{
    t(
      'User {user} has {count} new notifications',
      { user: 'Alice', count: 3 }
    )
  }}
</h2>
```

This will render as:

```html
<h2>User Alice has 3 new notifications</h2>
```

## Updating the language

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
