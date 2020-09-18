<template>
  <q-card
    :class="['player-card', `role-${roleId}`, { loading, highlight }]"
    flat
  >
    <q-item
      :clickable="!loading"
      v-on="$listeners"
    >
      <q-item-section v-if="loading">
        <header class="flex justify-around q-mt-sm q-mb-xs">
          <div class="column">
            <q-skeleton
              type="rect"
              width="40px"
              height="30px"
            />
          </div>

          <q-skeleton
            type="QAvatar"
            size="120px"
          />
        </header>

        <main class="-mb-px">
          <q-skeleton type="text" />
        </main>

        <footer
          v-if="footer.length"
          class="q-px-sm q-mt-xs flex"
        >
          <div
            v-for="(item, index) in footer"
            class="item q-px-md"
            :key="index"
          >
            <q-skeleton
              type="text"
              height="22px"
            />
          </div>
        </footer>
      </q-item-section>

      <q-item-section
        v-else
        class="no-wrap"
      >
        <header class="flex no-wrap justify-around q-my-sm">
          <div class="column items-center">
            <base-number
              class="font-medium mx-auto"
              :value="price"
            />

            <div
              v-if="roleId"
              class="role font-medium q-mb-xs"
              v-text="$t(`player.role.short.${roleId}`)"
            />

            <template v-if="player.nationality">
              <q-separator />
              <country-flag
                :item="player.nationality"
                size="25px"
              />
              <q-separator />
            </template>

            <team-logo
              class="q-mt-xs"
              :item="team"
              position="50% 0"
              size="28px"
            />
          </div>

          <player-img
            :item="player"
            size="120px"
          />
        </header>

        <main
          class="text-center leading-tight truncate"
          v-text="player.name"
        />

        <footer
          v-if="footer.length"
          class="q-px-sm q-mt-xs flex"
        >
          <q-separator class="q-mb-xs mt-px" />

          <article
            v-for="(item, index) in footer"
            class="item flex items-center no-wrap q-my-xs"
            :key="index"
          >
            <q-icon
              class="full-width"
              :name="item.icon"
              size="11px"
            />

            <div class="full-width">
              <q-spinner
                v-if="item.loading"
                size="15px"
              />

              <q-item-label v-else>
                <base-number :value="item.value" />
              </q-item-label>
            </div>

          </article>
        </footer>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<i18n>
{
  "es": {
    "player": {
      "role": {
        "short": {
          "1": "PT",
          "2": "DF",
          "3": "MD",
          "4": "DL"
        }
      }
    }
  }
}
</i18n>

<script>
import {
  QCard,
  QSkeleton,
  QSeparator
} from 'quasar'
import BaseNumber from '@/components/Number'
import PlayerImg from '@/components/player/Img'
import TeamLogo from '@/components/team/Logo'

export default {
  name: 'PlayerCard',

  components: {
    QCard,
    QSkeleton,
    QSeparator,
    BaseNumber,
    PlayerImg,
    TeamLogo
  },

  props: {
    player: {
      type: Object,
      required: true
    },

    loading: Boolean,

    footer: {
      type: Array,
      default: () => []
    },

    highlight: Boolean
  },

  computed: {
    price: vm => vm.player.pivot?.price,
    roleId: vm => vm.player.pivot?.role_id,
    team: vm => vm.player.pivot?.team
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/quasar.variables.scss";

.player-card {
  background-color: transparent;
  width: 210px;
  margin: 10px 0;
  $radius: 15px;
  border-radius: 0 $radius $radius $radius;
  overflow: hidden;

  &:not(.loading):before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background-image: url("../../assets/pattern.jpg");
    background-size: cover;
    opacity: 0.03;
    filter: blur(1px);
    z-index: -2;
  }

  &.loading {
    background: rgba(black, 0.1) !important;
    cursor: wait;
  }

  &.highlight {
    background: rgba($teal-3, 0.3) !important;
  }

  &.role {
    &-1 {
      background: rgba($gk, 0.2);
    }
    &-2 {
      background: rgba($df, 0.2);
    }
    &-3 {
      background: rgba($md, 0.2);
    }
    &-4 {
      background: rgba($fw, 0.2);
    }
  }

  header {
    .base-number {
      transform: scaleY(1.4);
      font-size: 18px;
    }

    .role {
      transform: scaleY(1.3);
      font-size: 12px;
    }

    .q-separator {
      max-width: 15px;
      margin: 0 auto;
    }
  }

  main {
    transform: scaleY(1.3);
    font-size: 18px;
  }

  footer {
    .item {
      width: 50%;

      .q-icon {
        padding-right: 5px;
        &::before {
          justify-content: flex-end;
        }
      }

      .q-spinner {
        margin: -1px 0 -2px;
      }

      .base-number {
        font-size: 9px;
      }
    }
  }
}
</style>
