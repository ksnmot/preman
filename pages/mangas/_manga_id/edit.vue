<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>マンガ情報更新</h1>
      </v-flex>

      <v-flex xs5 mt-5>
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
              <v-text-field
                v-model="manga.unread"
                label="未読巻数"
              ></v-text-field>
              <div class="text-center">
                <!-- 以下実装だと問題なくページ遷移できる-->
                <v-btn @click="$router.push({ name: 'mangas' })"
                  >キャンセル</v-btn
                >
                <!-- 以下実装だと何故かページ遷移できない-->
                <!-- <router-link :to="{ name: 'address_edit' }">
                  <v-btn color="info">
                    キャンセル2
                  </v-btn>
                </router-link> -->

                <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
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
      if (this.$route.params.manga_id) {
        this.updateManga({
          id: this.$route.params.manga_id,
          manga: this.manga,
        })
      } else {
        this.addManga(this.manga)
      }
      this.$router.push({ name: 'mangas' })
      this.manga = {}
    },
    ...mapActions(['addManga', 'updateManga', 'setPageTitle']),
  },
}
</script>
