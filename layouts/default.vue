<template>
  <v-app dark>
    <v-app-bar app>
      <!-- ログイン時のみツールバーにメニューアイコンを追加-->
      <v-app-bar-nav-icon
        v-show="$store.state.login_user"
        @click.stop="toggleSideMenu"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- ストアにページタイトルを毎回追加更新してるので、それを読み取ってツールバーに表示 -->
      <v-toolbar-title>{{ this.$store.state.page_title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <!-- ログイン時はツールバーにログアウトアイコン表示 -->
        <v-icon @click="logout">mdi-logout</v-icon>
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
    // ログイン/ログアウト時だけ回る処理
    firebase.auth().onAuthStateChanged((user) => {
      // ユーザーが取得できたとき=ログイン時はユーザ情報とマンガデータをstoreに格納する
      if (user) {
        this.setLoginUser(user)
        this.fetchManga()
        // 今いるのが初期画面であれば、マンガ一覧画面に遷移
        if (this.$router.currentRoute.name === 'index') {
          this.$router.push({ name: 'mangas' }, () => {})
        }
      } else {
        // ユーザーが取得できないとき=ログアウト時はユーザ情報をストアから削除して初期画面に遷移
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
