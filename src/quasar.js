import Vue from 'vue'

import './styles/quasar.scss'
import 'quasar/dist/quasar.ie.polyfills'
import iconSet from 'quasar/icon-set/mdi-v4.js'
import lang from 'quasar/lang/es.js'
import '@quasar/extras/mdi-v4/mdi-v4.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  ClosePopup
} from 'quasar'

Vue.use(Quasar, {
  config: {
    dark: false
  },
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel
  },
  directives: {
    ClosePopup
  },
  plugins: {
  },
  lang: lang,
  iconSet: iconSet
})
