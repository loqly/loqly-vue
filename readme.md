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

In your main.js, import **LoqlyVue** and use it in your app.

```js
import LoqlyVue from '@loqly/vue'

app.use(LoqlyVue, {
  apiKey: 'your-loqly-api-key',
  defaultLocale: 'en', // Optional, default is 'en'
  func: '$t', // Optional, default is '$t'
})
```

If you pass a translation object to the options, loqly will NOT fetch translations. Ensure that your translations are structured as follows:

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

### Updating the language

To update the current language, import loqly and use it inside your set up like so:

```js
import { useLoqly } from '@loqly/vue'

const loqly = useLoqly()
const updateLanguage = () => {
  loqly.updateLanguage('de')
}
```

### Manually translating elements

If loqly is setup in your main.js, you can use the translate function instead of the global $t or t:

```js
import { translate } from '@loqly/vue'

const btnText = translate('auth.btn.login')
```

```html
<button>{{ $t('auth.btn.login') }}</button>
```

### Using loqly in custom functionality

You can implement loqly into your existing system and just fetch your translations. No need to init loqly then.

```js
import { getTranslations } from '@loqly/vue'

const translations = await getTranslations('your-loqly-api-key')
```
