<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <!-- <v-flex xs12 class="text-center">
        <h1>マンガ情報更新</h1>
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
              未読巻数
              {{ manga.unread }}
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
          >Update -更新-</v-btn
        >
      </v-flex>
      <v-flex xs12 mt-5 justify-center>
        <v-btn
          block
          rounded
          outlined
          color="white"
          @click="deleteConfirm(manga.id)"
          >Delete -削除-</v-btn
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
      manga: {},
      pagetitle: 'マンガ情報更新',
    }
  },
  created() {
    this.setPageTitle(this.pagetitle)
    if (!this.$route.params.manga_id) return
    const manga = this.$store.getters.getMangaById(this.$route.params.manga_id)
    if (manga) {
      this.manga = manga
    } else {
      this.$router.push({ name: 'mangas' })
    }
  },
  methods: {
    submit() {
      this.manga.unread = this.manga.latest - this.manga.read
      if (this.$route.params.manga_id) {
        this.updateManga({
          id: this.$route.params.manga_id,
          manga: this.manga,
        })
      } else {
        this.addManga(this.manga)
      }
      this.manga = {}
      this.$router.push({ name: 'success-edited' })
    },
    deleteConfirm(id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteManga({ id })
        this.manga = {}
        this.$router.push({ name: 'mangas' })
      }
    },
    ...mapActions(['addManga', 'updateManga', 'setPageTitle', 'deleteManga']),
  },
}
</script>
