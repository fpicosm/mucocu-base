<template>
  <section class="player-list">
    <template v-if="sortOptions.length">
      <q-page-sticky
        :class="showModal ? 'z-max' : 'z-10'"
        :offset="[15, 15]"
      >
        <q-fab
          v-model="showModal"
          color="primary"
          icon="mdi-filter-variant"
          unelevated
        />
      </q-page-sticky>

      <q-drawer
        v-model="showModal"
        content-class="q-px-md q-py-xs"
        overlay
        side="right"
      >
        <base-select
          v-model="pagination.sortBy"
          clearable
          :label="$t('sortBy')"
          :options="sortOptions"
          option-label="label"
        >
          <template
            v-if="pagination.sortBy"
            #append
          >
            <q-btn
              dense
              flat
              round
              :icon="pagination.desc
                ? 'mdi-sort-alphabetical-descending'
                : 'mdi-sort-alphabetical-ascending'
              "
              @click.stop="pagination.desc = !pagination.desc"
            />
          </template>
        </base-select>

        <slot name="filter" />

        <base-select
          v-if="visibleFooter"
          :value.sync="visibleFooter"
          :options="footerOptions"
          option-label="label"
          option-avatar="icon"
          v-on="$listeners"
        />
      </q-drawer>
    </template>

    <q-list class="row justify-around">
      <slot
        name="player"
        v-for="player in data"
        v-bind="_playerProps(player)"
      >
        <component
          :is="component"
          v-bind="_playerProps(player)"
          @click="toggleSelect(player)"
        />
      </slot>
    </q-list>

    <q-pagination
      v-model="pagination.page"
      v-show="numberOfPages"
      class="row justify-center q-mt-md"
      input
      :max="numberOfPages"
    />

    <div
      v-show="!numberOfPages"
      class="text-center"
    >
      <q-item-label v-text="$t('noResults')" />
    </div>
  </section>
</template>

<i18n>
{
  "es": {
    "sortBy": "Ordenar por",
    "noResults": "No hay resultados"
  }
}
</i18n>

<script>
import { orderBy, get, kebabCase } from 'lodash'
import BaseSelect from '../quasar/form/Select'
import {
  QPageSticky,
  QFab,
  QDrawer,
  QBtn,
  QList,
  QPagination,
  QItemLabel
} from 'quasar'

export default {
  name: 'PlayerList',

  components: {
    BaseSelect,
    QPageSticky,
    QFab,
    QDrawer,
    QBtn,
    QList,
    QPagination,
    QItemLabel
  },

  model: {
    prop: 'visibleFooter',
    event: 'input'
  },

  props: {
    players: {
      type: Array,
      required: true
    },
    component: Object,
    columns: {
      type: Array,
      default: () => []
    },
    loading: Boolean,
    filter: Object,
    visibleFooter: Array,
    selected: Array,
    playerProps: Function
  },

  data: () => ({
    pagination: {
      page: 1,
      sortBy: null,
      desc: false
    },
    showModal: false
  }),

  computed: {
    pageSize: vm => vm.$q.screen.lt.md ? 12 : 24,
    numberOfPages: vm => Math.ceil(vm.filteredData.length / vm.pageSize),
    sortOptions: vm => vm.columns.filter(c => c.sortable),
    footerOptions: vm => vm.columns.filter(c => c.footer),

    filteredData () {
      const { filter, players } = this
      if (!filter) return players

      return Object.entries(filter).reduce((players, [key, value]) => {
        if (!value && typeof value !== 'boolean') return players

        return players.filter(player => {
          const itemValue = this.getCellValue(player, key, false)

          switch (typeof value) {
            case 'string': return kebabCase(itemValue).includes(kebabCase(value))
            case 'boolean': return itemValue === value
            case 'object': return !value.length || value.includes(itemValue)
          }
        })
      }, players)
    },

    data () {
      const { pagination: { page, sortBy, desc }, pageSize } = this

      if (this.loading) return Array(pageSize).fill({})

      const start = (page - 1) * pageSize
      const end = start + pageSize

      return orderBy(
        this.filteredData,
        player => sortBy && this.getCellValue(player, sortBy),
        desc ? 'desc' : 'asc'
      ).slice(start, end)
    }
  },

  watch: {
    'pagination.sortBy' (val) {
      this.pagination.page = 1
      if (!val) {
        this.pagination.desc = false
      }
    },

    filteredData () {
      this.pagination.page = 1
    }
  },

  methods: {
    getCellValue (player, key, formatValue = true) {
      const { field, format } = this.columns.find(c => c.id === key)
      const value = typeof field === 'string' ? get(player, field) : field(player)

      if (format && formatValue) return format(value)
      return value
    },

    isSelected (player) {
      const { selected } = this
      return selected && selected.some(p => p.id === player.id)
    },

    toggleSelect (player) {
      if (this.isSelected(player)) {
        const index = this.selected.findIndex(p => p.id === player.id)
        this.selected.splice(index, 1)
      } else if (this.selected) {
        this.selected.push(player)
      }
    },

    _playerProps (player) {
      const { playerProps } = this
      if (playerProps) return playerProps(player)
      const { loading } = this

      return {
        player,
        loading,
        disabled: player?.pivot?.is_excluded,
        highlight: this.isSelected(player),
        footer: this.footerOptions
          .filter(c => {
            return !this.visibleFooter || !this.visibleFooter.length || this.visibleFooter.includes(c.id)
          })
          .map(c => ({
            ...c,
            value: this.getCellValue(player, c.id)
          }))
          .filter(c => !c.hidden)
      }
    }
  }
}
</script>
