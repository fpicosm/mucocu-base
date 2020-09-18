<template>
  <div>
    VO: {{ visibleOptions }}
    <base-select
      :value.sync="visibleOptions"
      label="prueba"
      :options="[
        { id: 1, name: 'prueba 1' },
        { id: 2, name: 'prueba 2' },
        { id: 3, name: 'prueba 3' },
        { id: 4, name: 'prueba 4' },
        { id: 5, name: 'prueba 5' },
        { id: 6, name: 'prueba 6' }
      ]"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import BaseSelect from '@/components/quasar/form/Select'

export default {
  name: 'SelectTest',

  components: {
    BaseSelect
  },

  model: {
    prop: 'visibleOptions',
    event: 'input'
  },

  props: {
    visibleOptions: [Array, Number]
  },

  methods: {
    update (val) {
      console.log(val)
    }
  }
}
</script>
