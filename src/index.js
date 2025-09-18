// General JS functionality
import Loqly from '@loqly/web'
const getTranslations = Loqly.getTranslations

// Vue Specific functionality
import LoqlyVue, { useLoqly, translate } from './lib/LoqlyVue'
export default LoqlyVue
export { useLoqly, translate, getTranslations }
