<template>
  <q-dialog
    v-bind="props"
    ref="dialog"
    v-on="$listeners"
  >
    <q-card>
      <q-card-section
        v-if="showHeader"
        class="flex items-center no-wrap"
      >
        <q-item-label
          v-if="title"
          class="text-lg font-medium"
          :lines="1"
          v-text="title"
        />

        <q-space />

        <q-btn
          v-if="closeable"
          dense
          round
          flat
          icon="mdi-close"
          @click="$refs.dialog.hide()"
        />
      </q-card-section>

      <q-card-section :class="{ 'q-pt-none': showHeader }">
        <slot />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  QDialog,
  QCard,
  QCardSection,
  QItemLabel,
  QSpace,
  QBtn
} from 'quasar'

export default {
  name: 'Dialog',

  extends: QDialog,

  components: {
    QDialog,
    QCard,
    QCardSection,
    QItemLabel,
    QSpace,
    QBtn
  },

  props: {
    title: String,
    closeable: {
      type: Boolean,
      default: true
    },
    square: {
      type: Boolean,
      default: true
    },
    fullWidth: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    showHeader: vm => vm.closeable || !!vm.title,
    props () {
      const { title, closeable, ...props } = this.$props
      return props
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  max-width: 600px !important;
}
</style>
