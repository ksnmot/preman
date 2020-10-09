<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Preman</h1>
        <p>Premanはマンガを沢山読む人のためのマンガ巻数管理アプリです</p>
        <p>Googleアカウントでログインしてください。</p>
      </v-flex>

      <v-flex xs12 mt-5>
        <v-btn color="info" @click="login">Googleアカウントでログイン</v-btn>
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
