<template>
  <q-form
    v-bind="$props"
    v-on="$listeners"
  >
    <slot />
  </q-form>
</template>

<script>
import { QForm } from 'quasar'

/**
 * @description https://quasar.dev/vue-components/form
 */
export default {
  name: 'Form',

  extends: QForm,

  components: {
    QForm
  },

  props: {
    greedy: {
      type: Boolean,
      default: true
    }
  }
}
</script>
