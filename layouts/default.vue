<template>
  <v-app dark>
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-show="$store.state.login_user"
        @click.stop="toggleSideMenu"
      ></v-app-bar-nav-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <sideNav />
    <v-main>
      <v-container fluid fill-height align-start>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import firebase from 'firebase'
import firebase from 'firebase'
import sideNav from '@/components/sideNav.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    sideNav,
  },
  data: () => ({
    //
  }),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user)
        this.fetchManga()
        if (this.$router.currentRoute.name === '/') {
          this.$router.push({ name: 'mangas' }, () => {})
        }
      } else {
        this.deleteLoginUser()
        this.$router.push('/')
      }
    })
  },
  methods: {
    ...mapActions([
      'toggleSideMenu',
      'setLoginUser',
      'logout',
      'deleteLoginUser',
      'fetchManga',
    ]),
  },
}
</script>
