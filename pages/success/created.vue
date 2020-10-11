<template>
  <v-container fluid>
    <v-row xs12 mt-5 style="height: 500px" justify="center">
      <v-col align-self="center">
        <v-row justify="center">
          <img src="@/assets/img/created_logo.png" width="200" />
        </v-row>
        <v-row justify="center"> <h1>登録完了!!</h1></v-row>
        <v-row justify="center"
          ><p style="text-align: center">
            Let's enjoy your favorite manga<br />
            to the fullest!
          </p></v-row
        >
      </v-col>
    </v-row>
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
    setTimeout(this.returnMainPage, 5000)
  },

  methods: {
    returnMainPage() {
      this.$router.push({ name: 'mangas' })
    },
  },
}
</script>
