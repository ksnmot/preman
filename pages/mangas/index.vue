<template>
  <v-container text-xs-center justify-center>
    <v-layout justify-center row wrap style="top: 10; position: fixed">
      <!-- トップメーセージ表示セクション -->
      <v-flex xs10>
        <!-- 未読巻数の計算中はスペーサーを表示(赤いメッセージボックスは表示しない) -->
        <v-card
          v-if="unreadTotal == null"
          style="height: 50px"
          color="#121212"
          class="rounded-pill"
        >
        </v-card>
        <!-- 未読巻数の計算完了後は赤いメッセージボックスを表示 -->
        <v-card v-else style="height: 50px" color="red" class="rounded-pill">
          <!-- 未読巻数が0の場合は未読巻なしメッセージ表示 -->
          <v-layout v-if="unreadTotal == 0" justify-center>
            You don't have missed volumes.
            <br />
            未読巻はありません
          </v-layout>
          <!-- 未読巻数が0でない場合は未読巻数のトータルを表示 -->
          <v-layout v-else justify-center>
            You missed {{ unreadTotal }} volumes!
            <br />
            未読巻が {{ unreadTotal }} 巻あります
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center row wrap>
      <!-- ボディセクション -->
      <!-- 登録マンガが存在しない場合はリストを表示させず、welcomeメッセージ表示-->
      <v-flex v-if="mangas.length < 1" xs10 py-15 justify-center>
        <v-card
          outlined
          elevation="10"
          color="blue-grey darken-4"
          height="100"
          class="smallFont"
        >
          <v-layout justify-center row wrap>
            <v-flex xs4>
              <v-layout my-3 justify-center row wrap>
                <router-link :to="{ name: 'mangas-create' }">
                  <v-btn small rounded light color="white">Let's Start</v-btn>
                </router-link>
              </v-layout>
            </v-flex>
            <v-flex xs10>
              <v-card color="blue-grey darken-4" elevation="0">
                <v-layout justify-center
                  >マンガが登録されていません。<br />
                  読んでいるマンガを登録してみましょう！
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- 登録マンガが存在、つまりmangas[0]が存在する場合はマンガリストを表示 -->
      <v-flex v-else xs12 mt-1 justify-center>
        <v-card class="smallFont" style="background-color: #121212">
          <v-list-item v-if="unreadTotal !== null" row="4">
            <v-col class="px-2" cols="6">Title</v-col>
            <v-col class="px-2" cols="2">Read</v-col>
            <v-col class="px-2" cols="2">Latest</v-col>
            <v-col class="px-2" cols="2">Unread</v-col>
          </v-list-item>
        </v-card>
        <v-card v-for="manga in mangas" v-bind:key="manga.id" outlined tile>
          <nuxt-link
            :to="{
              name: 'mangas-manga_id-edit',
              params: { manga_id: manga.id },
            }"
          >
            <v-list-item row="4">
              <v-col cols="6" class="mediumFont">{{ manga.title }}</v-col>
              <v-col cols="2" class="largeFont">{{ manga.read }}</v-col>
              <v-col cols="2" class="largeFont">{{ manga.latest }}</v-col>
              <v-col cols="2" class="largeFont">{{ manga.unread }}</v-col>
            </v-list-item>
          </nuxt-link>
        </v-card>
      </v-flex>

      <!-- マンガ登録ボタン設置-->
      <v-footer fixed style="background-color: #121212">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" mt-5>
            <router-link :to="{ name: 'mangas-create' }">
              <v-btn block rounded outlined color="white"
                >Add manga -マンガ追加登録-</v-btn
              >
            </router-link>
          </v-col>
        </v-row>
      </v-footer>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      pagetitle: 'マンガリスト',
      mangas: [],
    }
  },
  computed: {
    // 未読巻数を計算。 this.mangaが更新されるたびに自動で回って更新されるハズ
    unreadTotal() {
      let unread = null
      for (let i = 0; i < this.mangas.length; i++) {
        unread += this.mangas[i].unread
      }
      return unread
    },
  },

  created() {
    // ストアからマンガデータをdataにロード
    this.mangas = this.$store.state.mangas
    // タイトル表示のために現在のページ名をストアに格納
    this.setPageTitle(this.pagetitle)
  },

  methods: {
    ...mapActions(['setPageTitle']),
  },
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.smallFont {
  font-size: 11px;
  font-weight: bold;
}
.mediumFont {
  font-size: 14px;
}
.largeFont {
  font-size: 20px;
}
.revo {
  top: 0;
  position: fixed;
}

// .topFixed {
//   position: absolute;
//   background-color: #121212;
//   height: 200px;
//   width: 80%;
// }
</style>
