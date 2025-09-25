import { reactive as i, getCurrentInstance as c, ref as h } from "vue";
const r = async (s) => {
  if (!s) throw new Error("API key is required");
  const t = window.location.href.includes("http://localhost") ? "http://localhost:3000" : "https://api.loqly.dev", a = await fetch(`${t}/v1/strings`, {
    method: "GET",
    headers: {
      Authorization: `Apikey ${s}`,
      "Content-Type": "application/json"
    }
  }), e = await a.json();
  if (!a.ok || e.error)
    throw new Error(e.error || "Something went wrong, please try again.");
  return e.strings ? e.strings : {};
};
class u {
  constructor({ apiKey: t, defaultLocale: a = "en" }) {
    this.apiKey = t, this._defaultLocale = a, this._locale = a, this._translations = null, this._translatableElements = [];
  }
  // Initialize translations from your API
  async init() {
    this._translations = await r(this.apiKey), this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Only fetch & return translations
  static async getTranslations(t) {
    return await r(t);
  }
  // Translation lookup with fallback
  t(t) {
    var a, e, l, o;
    return ((e = (a = this._translations) == null ? void 0 : a[t]) == null ? void 0 : e[this._locale]) || ((o = (l = this._translations) == null ? void 0 : l[t]) == null ? void 0 : o[this._defaultLocale]) || t;
  }
  // Cache all elements with data-t attribute
  cacheElements() {
    this._translatableElements = Array.from(
      document.querySelectorAll("[data-t]")
    );
  }
  // Translate a list of elements
  translateElements(t) {
    t.forEach((a) => {
      const e = a.getAttribute("data-t");
      e && (a.textContent = this.t(e));
    });
  }
  // Translate the whole page (re-queries if cache is empty)
  translatePage() {
    this._translatableElements.length || this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Update current language and re-translate
  updateLanguage(t) {
    this._locale = t, this.translatePage();
  }
  // Getters / setters
  get translations() {
    return this._translations;
  }
  set translations(t) {
    this._translations = t;
  }
  get locale() {
    return this._locale;
  }
  set locale(t) {
    this.updateLanguage(t);
  }
  get defaultLocale() {
    return this._defaultLocale;
  }
  set defaultLocale(t) {
    this._defaultLocale = t;
  }
}
const n = i({
  locale: "en",
  translations: {}
}), g = (s) => {
  var a, e;
  return h(((e = (a = n.translations) == null ? void 0 : a[s]) == null ? void 0 : e[n.locale]) ?? s).value;
}, _ = () => {
  const s = c();
  return {
    updateLanguage: (a) => {
      n.locale = a, s.proxy.$forceUpdate();
    }
  };
}, f = {
  install: (s, { translations: t = {}, defaultLocale: a = "en", func: e = "$t" } = {}) => {
    n.translations = t, a && (n.locale = a), s.config.globalProperties[e] = g;
  }
}, m = u.getTranslations;
export {
  f as default,
  m as getTranslations,
  g as translate,
  _ as useLoqly
};
