<template>
  <q-img
    v-if="isExternal"
    v-bind="{ src, size }"
  />

  <q-icon
    v-else-if="src"
    v-bind="{ size, color }"
    :name="src"
  />
</template>

<script>
import QImg from '../Img'
import {
  QIcon
} from 'quasar'

export default {
  name: 'OptionAvatar',

  components: {
    QImg,
    QIcon
  },

  props: {
    size: String,
    src: String,
    color: String
  },

  computed: {
    isExternal: vm => vm.src?.startsWith('http')
  }
}
</script>
