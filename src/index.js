import BaseCountdown from './components/Countdown'
import BaseNumber from './components/Number'
import BaseTabs from './components/Tabs'
import CountryFlag from './components/country/Flag'
import PlayerImg from './components/player/Img'
import PlayerList from './components/player/List'
import TeamLogo from './components/team/Logo'
import QBtn from './components/quasar/buttons/Button'
import QDialog from './components/quasar/Dialog'
import QForm from './components/quasar/form/Form'
import QInput from './components/quasar/form/Input'
import QSelect from './components/quasar/form/Select'
import QImg from './components/quasar/Img'
import './styles/base.scss'
import validations from './utils/validations'
import i18n from './i18n'

export {
  BaseCountdown,
  BaseNumber,
  BaseTabs,
  CountryFlag,
  PlayerImg,
  PlayerList,
  TeamLogo,
  QBtn,
  QDialog,
  QForm,
  QInput,
  QSelect,
  QImg,
  i18n
}

export function install (Vue) {
  Vue.component('base-btn', QBtn)
  Vue.component('base-dialog', QDialog)
  Vue.component('base-form', QForm)
  Vue.component('base-img', QImg)
  Vue.component('base-input', QInput)
  Vue.component('base-select', QSelect)
  Vue.component('base-countdown', BaseCountdown)
  Vue.component('base-number', BaseNumber)
  Vue.component('base-tabs', BaseTabs)
  Vue.component('country-flag', CountryFlag)
  Vue.component('player-img', PlayerImg)
  Vue.component('player-list', PlayerList)
  Vue.component('team-logo', TeamLogo)
  Vue.prototype.$v = validations
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install })
}

export default { install }
