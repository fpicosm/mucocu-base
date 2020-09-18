<template>
  <q-card
    class="fixture-card bg-transparent"
    flat
    square
  >
    <q-card-section class="no-padding">
      <q-item
        clickable
        @click="showDetails = !showDetails"
      >
        <q-item-section avatar>
          <team-logo :item="local" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-center">
            {{ local.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <fixture-score v-bind="{ fixture }" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-center">
            {{ visitor.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <team-logo :item="visitor" />
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-slide-transition>
      <div v-show="showDetails">
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
import {
  QCard,
  QCardSection,
  QSlideTransition,
  QItem,
  QItemSection,
  QItemLabel
} from 'quasar'
import FixtureScore from '../fixture/Score'
import TeamLogo from '../team/Logo'
import FixtureDetail from './FixtureDetail'

export default {
  name: 'FixtureCard',

  components: {
    QCard,
    QCardSection,
    QSlideTransition,
    QItem,
    QItemSection,
    QItemLabel,
    FixtureScore,
    TeamLogo
  },

  props: {
    fixture: Object,
    season: Object,
    component: {
      type: Object,
      default: () => FixtureDetail
    }
  },

  data: () => ({ showDetails: false }),

  computed: {
    local: vm => vm.$_getTeam(vm.fixture.local_id),
    visitor: vm => vm.$_getTeam(vm.fixture.visitor_id)
  },

  methods: {
    $_getTeam (id) {
      const teams = this.season?.teams || []
      return teams.find(t => t.id === id)
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/quasar.variables.scss";

.fixture-card {
  max-width: 500px;
  margin: 0 auto;

  .q-item {
    padding: 8px 16px;

    @media (max-width: $breakpoint-sm-max) {
      padding: 8px;
    }
  }
}
</style>
