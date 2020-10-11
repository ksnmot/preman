<template>
  <v-app dark>
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-show="$store.state.login_user"
        @click.stop="toggleSideMenu"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ this.$store.state.page_title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <!-- <v-btn @click="logout">ログアウト</v-btn> -->
        <v-icon @click="logout">mdi-cog</v-icon>
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
  // data: () => ({
  //   //
  // }),
  data() {
    return {}
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user)
        this.fetchManga()
        if (this.$router.currentRoute.name === 'index') {
          this.$router.push({ name: 'mangas' }, () => {})
        }
      } else {
        this.deleteLoginUser()
        this.$router.push('/')
      }
    })
  },
  updated() {
    this.calcUnreadTotal()
  },
  methods: {
    ...mapActions([
      'toggleSideMenu',
      'setLoginUser',
      'logout',
      'deleteLoginUser',
      'fetchManga',
      'calcUnreadTotal',
    ]),
  },
}
</script>
