<template>
  <v-container fluid>
    <v-row xs12 mt-5 style="height: 500px" justify="center">
      <v-col align-self="center">
        <!-- いい感じのロゴメッセージ設置 -->
        <v-row justify="center">
          <img src="@/assets/img/edited_logo.png" width="230" />
        </v-row>
        <!-- 完了メッセージ設置 -->
        <v-row justify="center"> <h1>更新完了!!</h1></v-row>
        <!-- 一言メッセージ設置 -->
        <v-row justify="center"
          ><p style="text-align: center">
            Let's enjoy your favorite manga<br />
            to the fullest!
          </p></v-row
        >
      </v-col>
    </v-row>
    <!-- メイン画面遷移ボタン設置 -->
    <v-row xs12 mt-5 style="height: 100px" justify="center">
      <v-col align-self="center">
        <v-btn
          block
          rounded
          color="red"
          @click="$router.push({ name: 'mangas' })"
          >メイン画面に戻る</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // 5秒経過で自動でメインページに戻るようにする
    setTimeout(this.returnMainPage, 5000)
  },

  methods: {
    // メインページに遷移するメソッドを準備
    returnMainPage() {
      this.$router.push({ name: 'mangas' })
    },
  },
}
</script>
