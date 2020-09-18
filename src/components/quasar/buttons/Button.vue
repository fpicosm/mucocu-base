<template>
  <q-btn
    v-bind="$props"
    v-on="$listeners"
  >
    <slot />
  </q-btn>
</template>

<script>
import { QBtn } from 'quasar'

/**
 * @description https://quasar.dev/vue-components/button
 */
export default {
  name: 'Button',

  extends: QBtn,

  components: {
    QBtn
  },

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    unelevated: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.q-btn {
  &--rectangle:not(.q-btn--rounded) {
    border-radius: 0;
  }
}
</style>
