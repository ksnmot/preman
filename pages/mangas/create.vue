<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <!-- <v-flex xs12 class="text-center">
        <h1>新規マンガ登録</h1>
      </v-flex> -->
      <v-flex xs12 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="manga.title" label="マンガタイトル">
              </v-text-field>
              <v-text-field
                v-model="manga.read"
                label="読んだ巻数"
              ></v-text-field>
              <v-text-field
                v-model="manga.latest"
                label="最新巻数"
              ></v-text-field>
              <!-- <v-text-field
                v-model="manga.unread"
                label="未読巻数"
              ></v-text-field> -->
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 mt-5 justify-center>
        <v-btn block rounded outlined color="white" @click="submit"
          >Add Manga -新規登録-</v-btn
        >
      </v-flex>
      <v-flex xs12 mt-5 justify-center>
        <v-btn
          block
          rounded
          outlined
          color="white"
          @click="$router.push({ name: 'mangas' })"
          >Back -戻る-</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      pagetitle: 'マンガ追加登録',
      manga: {},
    }
  },
  created() {
    this.setPageTitle(this.pagetitle)
  },
  methods: {
    submit() {
      this.manga.unread = this.manga.latest - this.manga.read
      this.addManga(this.manga)
      this.manga = {}
      this.$router.push({ name: 'success-created' })
    },
    ...mapActions(['addManga', 'updateManga', 'setPageTitle']),
  },
}
</script>
