<template>
  <q-item :class="`bg-${color}`">
    <q-item-section class="text-center">
      <q-item-label class="text-black">
        <span
          class="font-medium q-mr-xs"
          v-text="$t('limit')"
        />
        <span v-text="label" />
      </q-item-label>

      <q-item-label
        caption
        class="text-black"
        v-text="$tc('remaining', remaining.day > 1, remaining)"
      />
    </q-item-section>
  </q-item>
</template>

<i18n>
{
  "es": {
    "limit": "Fecha límite:",
    "remaining": "Quedan {day}d {hour}:{minute}:{second}|Quedan {hour}:{minute}:{second}"
  }
}
</i18n>

<script>
import moment from 'moment'
import { SECOND, MINUTE, HOUR, DAY } from '../constants/time'
import {
  QItem,
  QItemSection,
  QItemLabel
} from 'quasar'

let interval = null

export default {
  name: 'Countdown',

  components: {
    QItem,
    QItemSection,
    QItemLabel
  },

  props: {
    limit: [Date, String, Object],
    onExpired: Function
  },

  data: () => ({ current: moment() }),

  computed: {
    label () {
      const options = {
        weekday: 'long', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', second: '2-digit'
      }
      return moment(this.limit).toDate().toLocaleString(this.$i18n.locale, options)
    },
    remaining () {
      let remaining = moment(this.limit).diff(this.current)

      const getUnit = unit => {
        const value = Math.floor(remaining / unit)
        remaining -= value * unit
        return value
      }

      const day = getUnit(DAY)
      const hour = getUnit(HOUR)
      const minute = getUnit(MINUTE)
      const second = getUnit(SECOND)

      return { day, hour, minute, second }
    },
    color () {
      const { day, hour } = this.remaining

      if (day > 1) return 'green-3'
      if (hour > 2) return 'yellow-3'
      return 'red-3'
    }
  },

  mounted () {
    interval = setInterval(() => {
      this.current = moment()
      if (this.remaining < SECOND) {
        this.$emit('expired')
      }
    }, SECOND / 2)
  },

  beforeDestroy () {
    clearInterval(interval)
  }
}
</script>

<style lang="scss" scoped>
.q-item {
  max-width: 300px;
  margin: 0 auto;
}
</style>
