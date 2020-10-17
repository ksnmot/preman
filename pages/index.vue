<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <!-- ロゴを表示-->

      <v-flex> <img src="@/static/icon-192x192.png" width="200" /> </v-flex>
      <!-- タイトルとかwelcomeMessageを表示-->

      <v-flex xs12>
        <h1>Preman</h1>
        <br />
        <p>
          Premanはマンガを沢山読む人のための<br />
          超軽量なマンガ巻数管理アプリです
        </p>
        <p>
          今何読んでたっけ？<br />
          前回どこまで読んだっけ？<br />
          そんなアナタにおすすめです。
        </p>
      </v-flex>
      <!-- ログインボタンを設置 -->
      <v-flex xs12 mt-5>
        <v-btn color="white" light @click="login"
          >Googleアカウントで使ってみる</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['login']),
  },
}
</script>
