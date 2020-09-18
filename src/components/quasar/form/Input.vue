<template>
  <q-input
    ref="input"
    v-bind="{ ...props, ...$attrs }"
    :type="showPassword ? 'text' : type"
    v-on="$listeners"
    @blur="showPassword = false"
  >
    <template #before>
      <slot name="before">
        <q-icon
          v-if="icon"
          :color="focused ? color : null"
          :name="icon"
        />
      </slot>
    </template>

    <template #prepend>
      <slot name="prepend">
        <q-icon
          v-if="type === 'search'"
          name="mdi-magnify"
        />
      </slot>
    </template>

    <template #after>
      <slot name="after" />
    </template>

    <template #append>
      <slot name="append">
        <q-btn
          v-if="type === 'password' && value"
          dense
          flat
          :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          round
          @click="showPassword = !showPassword"
        />
      </slot>
    </template>
  </q-input>
</template>

<script>
import {
  QBtn,
  QIcon,
  QInput
} from 'quasar'

/**
 * @description https://quasar.dev/vue-components/input
 */
export default {
  name: 'Input',

  extends: QInput,

  components: {
    QBtn,
    QIcon,
    QInput
  },

  props: {
    bottomSlots: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    debounce: {
      type: [String, Number],
      default () {
        return this.type === 'search' ? 500 : 0
      }
    },
    lazyRules: {
      type: Boolean,
      default: true
    },
    icon: String
  },

  data: () => ({
    focused: false,
    showPassword: false
  }),

  computed: {
    props () {
      const { icon, ...props } = this.$props
      return props
    }
  },

  watch: {
    value () {
      this.$refs.input.resetValidation()
    }
  },

  mounted () {
    this.$watch(
      () => this.$refs.input.focused,
      val => { this.focused = val },
      { immediate: true }
    )
  }
}
</script>

<style lang="scss" scoped>
/deep/ input[type="number"] {
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
