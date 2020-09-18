<template>
  <div
    v-if="!isNaN(value)"
    class="base-number leading-none"
  >
    <div class="base-number__int">
      {{ int }}
    </div>
    <div
      v-if="decimal"
      class="base-number__decimal"
    >
      {{ decimal }}
    </div>
    <slot />
  </div>
</template>

<i18n>
{
  "es": {
    "separator": "."
  },
  "en": {
    "separator": "."
  }
}
</i18n>

<script>
export default {
  name: 'Number',

  props: {
    value: Number,
    decimals: {
      type: Number,
      default: 2
    }
  },

  computed: {
    int: vm => Math.trunc(vm.value),
    decimal () {
      const decimal = Math.abs(this.value - this.int)

      if (!decimal) return
      return `${this.$t('separator')}${decimal.toString().substr(2, this.decimals)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.base-number {
  display: flex;
  align-items: baseline;

  &__int {
    font-size: 1.5em;
  }

  &__decimal {
    font-size: 0.8em;
    margin-left: 0.1em;
    letter-spacing: 0 !important;
  }
}
</style>
