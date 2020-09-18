<template>
  <q-page v-if="season">
    <div class="row justify-center q-mb-sm q-mt-md">
      <div class="text-center full-width -mb-3 text-xs font-medium text-primary">
        Jornada
      </div>
      <q-pagination
        v-model="number"
        input
        :max="rounds.length"
      />
    </div>

    <mobile-tabs
      v-if="$q.screen.lt.md"
      v-model="selectedTab"
      :tabs="[
      {
        name: 'calendar',
        label: 'Partidos'
      },
      {
        name: 'ranking',
        label: 'Clasificacion'
      }]"
    >
      <template #calendar>
        <q-list>
          <fixture-card
            v-for="fixture in fixtures"
            v-bind="{ fixture, season }"
            :key="fixture.id"
          />
        </q-list>
      </template>
    </mobile-tabs>

    <div
      v-else
      class="row justify-around"
    >
      <q-list class="col-xs-12 col-md-6">
        <fixture-card
          v-for="fixture in fixtures"
          v-bind="{ fixture, season }"
          :key="fixture.id"
        />
      </q-list>
      <section class="col-xs-12 col-md-6">
        clasificación
      </section>
    </div>
    <!--
      <div
      class="row justify-around"
    >

      </div> -->
  </q-page>
</template>

<script>
import axios from 'axios'
import {
  QPage,
  QPagination,
  QList
} from 'quasar'
import FixtureCard from '@/components/test/FixtureCard'
import { sortBy } from 'lodash'
import MobileTabs from '@/components/Tabs'

export default {
  name: 'Home',
  components: {
    QPage,
    QPagination,
    MobileTabs,
    QList,
    FixtureCard
  },
  data: () => ({
    season: null,
    number: 1,
    selectedTab: 'calendar'
  }),
  computed: {
    rounds: vm => vm.season?.rounds || [],
    round: vm => vm.rounds.find(r => r.number === vm.number),
    fixtures: vm => sortBy(
      (vm.season?.fixtures || []).filter(f => f.round_id === vm.round?.id),
      'datetime'
    )
  },
  async mounted () {
    const { data } = await axios.get('http://127.0.0.1:1234/seasons/16326')
    this.season = data
  }
}
</script>
