<template>
  <q-select
    ref="select"
    v-bind="props"
    :map-options="emitValue"
    :options="filteredOptions"
    :use-input="options.length > 10"
    v-on="{
      ...$listeners,
      filter
    }"
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
      <slot name="prepend" />
    </template>

    <template #after>
      <slot name="after" />
    </template>

    <template #append>
      <slot name="append" />
    </template>

    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section
          v-if="optionAvatar"
          avatar
        >
          <option-avatar
            size="32px"
            :src="$_getProp(scope.opt, optionAvatar)"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ $_getProp(scope.opt, optionLabel) }}
          </q-item-label>

          <q-item-label
            v-if="optionSublabel"
            caption
            :lines="1"
          >
            {{ $_getProp(scope.opt, optionSublabel) }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            v-if="scope.selected"
            color="primary"
            name="mdi-check"
          />
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:selected-item="scope">
      <q-chip
        v-if="useChips && multiple"
        v-bind="$_getProp(scope.opt, chipProps)"
        class="q-ma-none q-mr-xs"
        removable
        @remove="scope.removeAtIndex(scope.index)"
        :tabindex="scope.tabindex"
      >
        <q-avatar
          v-if="$_getProp(scope.opt, optionAvatar)"
          size="20px"
          color="grey-1"
        >
          <option-avatar
            size="1.25em"
            :color="$q.dark.isActive ? 'black' : 'white'"
            :src="$_getProp(scope.opt, optionAvatar)"
          />
        </q-avatar>

        <q-item-label v-text="$_getProp(scope.opt, optionLabel)" />
      </q-chip>

      <template v-else>
        <div class="row items-center q-mt-xs q-mr-xs">
          <option-avatar
            class="q-mr-xs"
            size="20px"
            :src="$_getProp(scope.opt, optionAvatar)"
          />

          <q-item-label>
            {{ $_getProp(scope.opt, optionLabel) }}
          </q-item-label>
        </div>
      </template>
    </template>
  </q-select>
</template>

<script>
import { get, kebabCase, isFunction } from 'lodash'
import {
  QAvatar,
  QChip,
  QIcon,
  QItem,
  QItemLabel,
  QItemSection,
  QSelect
} from 'quasar'
import OptionAvatar from './SelectAvatar'

/**
 * @description https://quasar.dev/vue-components/select
 */
export default {
  name: 'Select',

  extends: QSelect,

  components: {
    QAvatar,
    QChip,
    QIcon,
    QItem,
    QItemLabel,
    QItemSection,
    QSelect,
    OptionAvatar
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
    emitValue: {
      type: Boolean,
      default: true
    },
    lazyRules: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default () {
        return Array.isArray(this.value)
      }
    },
    optionLabel: {
      type: [String, Function],
      default: 'name'
    },
    optionValue: {
      type: [String, Function],
      default: 'id'
    },
    useChips: {
      type: Boolean,
      default: true
    },
    optionAvatar: [String, Function],
    optionSublabel: [String, Function],
    icon: String,
    chipProps: {
      type: [Object, Function],
      default: () => { }
    }
  },

  data: () => ({
    focused: false,
    filteredOptions: []
  }),

  computed: {
    props () {
      const { icon, optionAvatar, optionSublabel, chipProps, ...props } = this.$props
      return props
    }
  },

  watch: {
    value () {
      const { select } = this.$refs
      select.resetValidation()
      select.updateInputValue('')
      if (!this.multiple) {
        this.$nextTick(() => {
          select.hidePopup()
        })
      }
    }
  },

  mounted () {
    this.$watch(
      () => this.$refs.select.focused,
      val => { this.focused = val },
      { immediate: true }
    )
  },

  methods: {
    $_getProp (item, prop) {
      if (!prop) return

      if (typeof item !== 'object') {
        item = this.options.find(option => get(option, this.optionValue) === item)
      }

      if (typeof prop === 'string') return get(item, prop)
      return isFunction(prop) ? prop(item) : prop
    },

    filter (val, update) {
      update(() => {
        let { options } = this

        if (val) {
          const needle = kebabCase(val)

          options = options.filter(option => {
            const optLabel = this.$_getProp(option, this.optionLabel)
            return kebabCase(optLabel).includes(needle)
          })
        }

        this.filteredOptions = options
      })
    }
  }
}
</script>

<style lang="scss">
.q-select {
  &__dialog {
    .q-field {
      padding-bottom: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
.q-select {
  .q-chip {
    margin-top: 2px;
    font-size: 12px;
  }

  /deep/ input {
    margin-top: 2px;
  }

  /deep/ .q-field__native {
    margin-top: 2px;
    padding-bottom: 5px;
  }
}
</style>
