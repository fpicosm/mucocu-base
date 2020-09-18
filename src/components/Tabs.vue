<template>
  <div class="base-tabs">
    <q-tabs
      v-bind="{ value, dense }"
      :class="['fixed bottom-0 left-0 full-width z-10', $q.dark.isActive ? 'bg-dark' : 'bg-white']"
      v-on="$listeners"
    >
      <q-tab
        v-for="tab in tabs"
        v-bind="tab"
        :key="tab.name"
      />
    </q-tabs>

    <q-tab-panels
      v-bind="{ value, animated }"
      class="bg-transparent"
      v-on="$listeners"
    >
      <q-tab-panel
        v-for="tab in tabs"
        class="q-mb-xl no-padding"
        :name="tab.name"
        :key="tab.name"
      >
        <slot :name="tab.name" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import {
  QTabs,
  QTab,
  QTabPanels,
  QTabPanel
} from 'quasar'

export default {
  name: 'Tabs',

  components: {
    QTabs,
    QTab,
    QTabPanels,
    QTabPanel
  },

  props: {
    tabs: {
      type: Array,
      required: true
    },
    value: String,
    animated: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.q-tab {
  /deep/ &__indicator {
    top: 0;
  }
}
</style>
