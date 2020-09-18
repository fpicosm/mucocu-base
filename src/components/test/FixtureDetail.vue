<template>
  <q-card-section class="no-padding">
    <q-item>
      <q-item-section class="bg-negative">
        LOCAL
      </q-item-section>

      <q-item-section class="bg-pink no-margin">
        VisiTOR
      </q-item-section>
    </q-item>
  </q-card-section>
</template>

<script>
import {
  QCardSection,
  QItem,
  QItemSection
} from 'quasar'

export default {
  name: 'FixtureDetail',

  components: {
    QCardSection,
    QItem,
    QItemSection
  },

  props: {
    id: Number
  }
}
</script>
