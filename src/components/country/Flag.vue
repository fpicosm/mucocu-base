<template>
  <q-img
    v-if="item"
    :class="['country-flag', { 'cursor-pointer': name }]"
    v-bind="$props"
    v-on="$listeners"
  >
    <q-tooltip>
      <q-item-label>
        {{ name }}
      </q-item-label>
    </q-tooltip>
  </q-img>
</template>

<script>
import { QTooltip, QItemLabel } from 'quasar'
import QImg from '../quasar/Img'
import i18n from '../../i18n'

export default {
  name: 'CountryFlag',

  extends: QImg,

  components: {
    QImg,
    QTooltip,
    QItemLabel
  },

  computed: {
    name: vm => vm.item && i18n.t(`country.${vm.item.id}`)
  }
}
</script>
