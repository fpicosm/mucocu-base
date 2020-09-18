<template>
  <section>
    VL: {{ visibleOptions }}
    <select-test :visible-options.sync="visibleOptions" />
  </section>
</template>

<script>
import SelectTest from '@/components/test/SelectTest'

export default {
  name: 'TestPage',

  components: {
    SelectTest
  },

  data: () => ({ visibleOptions: [] })
}
</script>
