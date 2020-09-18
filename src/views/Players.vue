<template>
  <q-page>
    {{ selected }}
    <player-list
      v-bind="{ players, filter, component, columns, loading, selected }"
      v-model="visibleFooter"
    >
      <template #filter>
        <base-select
          v-model="filter.team"
          label="Equipo"
          :options="teamOptions"
          option-avatar="image_url"
          :chip-props="{ color: 'negative' }"
        />
      </template>
    </player-list>
  </q-page>
</template>

<script>
import axios from 'axios'
import PlayerList from '@/components/player/List'
import PlayerCard from '@/components/test/PlayerCard'
import BaseSelect from '@/components/quasar/form/Select'
import { sumBy, sortBy } from 'lodash'

export default {
  name: 'Players',
  components: {
    PlayerList,
    BaseSelect
  },
  data: () => ({
    component: PlayerCard,
    filter: {
      team: []
    },
    loading: true,
    loadingStats: true,
    real: null,
    mucocu: null,
    visibleFooter: ['goals-scored'],
    selected: []
  }),

  computed: {
    teamOptions: vm => vm.real?.teams || [],
    columns: vm => [
      {
        id: 'team',
        field: 'pivot.team.name',
        sortable: true
      },
      {
        id: 'fixtures',
        icon: 'mdi-soccer-field',
        label: 'Partidos jugados',
        footer: true,
        field: player => player.pivot?.stats?.length
      },
      {
        id: 'goals-scored',
        icon: 'mdi-soccer',
        label: 'Goles marcados',
        footer: true,
        field: player => sumBy(player.pivot?.stats, 'goals_scored')
      }
    ],

    players () {
      const { real, mucocu } = this
      if (!real) return []

      const players = real.players
        .filter(p => mucocu.players.find(({ id }) => id === p.id))
        .map(player => {
          const pivot = {
            ...player.pivot,
            ...mucocu.players.find(p => p.id === player.id)?.pivot,
            team: real.teams.find(t => t.id === player.pivot?.team_id),
            squads: mucocu.squads.filter(s => s.player_id === player.id)
          }
          return { ...player, pivot }
        })
        .filter(p => !!p.pivot.price && !p.pivot.is_excluded)

      return sortBy(
        players.filter(p => p.pivot?.price && !p.pivot?.is_excluded),
        ['pivot.role_id', 'pivot.team.name', 'name']
      )
    }
  },

  async mounted () {
    this.loadPlayers()
    this.loadStats()
  },

  methods: {
    // setPlayers (data = []) {
    //   this.players = sortBy(
    //     data.filter(p => p.pivot?.price && !p.pivot?.is_excluded),
    //     ['pivot.role_id', 'pivot.team.name', 'name']
    //   )
    // },

    // filterPlayers (real, mucocu, teams, squads) {
    //   return real
    //     .filter(p => mucocu.find(({ id }) => id === p.id))
    //     .map(player => {
    //       const pivot = {
    //         ...player.pivot,
    //         ...mucocu.find(p => p.id === player.id)?.pivot,
    //         team: real.teams.find(t => t.id === player.pivot?.team_id),
    //         squads: mucocu.squads.filter(s => s.player_id === player.id)
    //       }

    //       return { ...player, pivot }
    //     })
    // },

    async loadPlayers () {
      const [{ data: real }, { data: mucocu }] = await axios.all([
        axios.get('http://127.0.0.1:1234/seasons/16326'),
        axios.get('http://127.0.0.1:8000/seasons/1')
      ])

      this.real = real
      this.mucocu = mucocu

      this.loading = false
    },

    async loadStats () {
      const [{ data: real }, { data: mucocu }] = await axios.all([
        axios.get('http://127.0.0.1:1234/seasons/16326/players'),
        axios.get('http://127.0.0.1:8000/seasons/1/players')
      ])

      this.real = { ...this.real, players: real }
      this.mucocu = { ...this.mucocu, players: mucocu }

      this.loadingStats = false
    }
  }
}
</script>
