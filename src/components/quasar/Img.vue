<template>
  <q-img
    v-bind="props"
    :src="_src"
    :width="size"
    :height="size"
    :spinner-size="_spinnerSize"
    v-on="$listeners"
  >
    <slot />
  </q-img>
</template>

<script>
import { QImg } from 'quasar'
import { get } from 'lodash'

/**
 * @description https://quasar.dev/vue-components/img
 */
export default {
  name: 'Img',

  extends: QImg,

  components: {
    QImg
  },

  props: {
    size: {
      type: String,
      default: '32px'
    },

    contain: {
      type: Boolean,
      default: true
    },

    item: Object,

    source: {
      type: [String, Function],
      default: 'image_url'
    }
  },

  computed: {
    props () {
      const { item, source, size, ...props } = this.$props
      return props
    },

    _spinnerSize () {
      const { size } = this
      const number = Number.parseFloat(size)
      const units = size.replace(number, '')

      return (number * 0.75) + units
    },

    _src () {
      const { item, source, src } = this
      if (src) return src
      if (!item) return null
      return typeof source === 'string' ? get(item, source) : source(item)
    }
  }
}
</script>
