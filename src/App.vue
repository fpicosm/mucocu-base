<template>
  <q-layout view="hHh LpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer
} from 'quasar'

export default {
  name: 'App',

  components: {
    QLayout,
    QHeader,
    QToolbar,
    QToolbarTitle,
    QPageContainer
  }
}
</script>
