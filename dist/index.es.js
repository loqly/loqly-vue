import { reactive as p, getCurrentInstance as d, ref as u } from "vue";
const h = async (n, t = null, a = {}) => {
  if (!n) throw new Error("API key is required");
  let e = "";
  t && Object.keys(t).length > 0 && (t.projectIds && (e += `projectIds=${t.projectIds.join(",")}&`), t.namespaces && (e += `namespaces=${t.namespaces.join(",")}&`), t.languages && (e += `languages=${t.languages.join(",")}`));
  let l = a;
  try {
    const s = window.location.href.includes("http://localhost") ? "http://localhost:3000" : "https://api.loqly.dev", o = await fetch(`${s}/v1/strings?${e}`, {
      method: "GET",
      headers: {
        Authorization: `Apikey ${n}`,
        "Content-Type": "application/json"
      }
    }), r = await o.json();
    if (!o.ok || r.error)
      throw new Error(r.error || "Something went wrong, please try again.");
    r.strings && (l = r.strings);
  } catch (s) {
    throw new Error(s);
  } finally {
    return l;
  }
};
function g(n, t) {
  if (!t) return n;
  const a = /\{([^\s{}]+)\}/g;
  return [...n.matchAll(a)].map((e) => e[1]).reduce((e, l) => l in t ? e.replace(new RegExp(`\\{${l}\\}`, "g"), t[l]) : e, n);
}
class c {
  constructor({ apiKey: t, defaultLocale: a = "en" }) {
    this.apiKey = t, this.this._defaultLocale = a, this._locale = a, this._translations = null, this._translatableElements = [];
  }
  // Initialize translations from your API
  async init() {
    this._translations = await h(this.apiKey), this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Only fetch & return translations
  static async getTranslations(t, a = null, e = {}) {
    return await h(t, a, e);
  }
  static interpolateTranslation(t, a = null) {
    return g(t, a);
  }
  // Translation lookup with fallback
  t(t, a = null) {
    var e, l, s, o;
    const r = ((l = (e = this._translations) == null ? void 0 : e[t]) == null ? void 0 : l[this._locale]) || ((o = (s = this._translations) == null ? void 0 : s[t]) == null ? void 0 : o[this._defaultLocale]);
    return g(r || t, a);
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
    this._locale = t;
  }
  get defaultLocale() {
    return this._defaultLocale;
  }
  set defaultLocale(t) {
    this._defaultLocale = t;
  }
}
const i = p({
  locale: "en",
  defaultLocale: "en",
  translations: {}
}), f = (n, t = null) => {
  var l, s, o, r;
  const a = u((s = (l = i.translations) == null ? void 0 : l[n]) == null ? void 0 : s[i.locale]);
  return a.value || u(
    (r = (o = i.translations) == null ? void 0 : o[n]) == null ? void 0 : r[i.defaultLocale]
  ).value ? c.interpolateTranslation(a.value, t) : c.interpolateTranslation(n, t);
}, _ = () => {
  const n = d();
  return {
    updateLanguage: (a) => {
      i.locale = a, n.proxy.$forceUpdate();
    }
  };
}, E = {
  install: (n, { translations: t = {}, defaultLocale: a = "en", func: e = "$t" } = {}) => {
    i.translations = t, i.locale = a, i.locale = a, n.config.globalProperties[e] = f;
  }
}, w = c.getTranslations;
export {
  E as default,
  w as getTranslations,
  f as translate,
  _ as useLoqly
};
