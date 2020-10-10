<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>マンガ一覧</h1>
      </v-flex>
      <v-flex xs12 mt-1 justify-center>
        <v-card class="smallFont">
          <v-list-item row="4">
            <v-col class="px-2" cols="6">Title</v-col>
            <v-col class="px-2" cols="2">Read</v-col>
            <v-col class="px-2" cols="2">Latest</v-col>
            <v-col class="px-2" cols="2">Unread</v-col>
          </v-list-item>
        </v-card>
        <v-card v-for="manga in mangas" v-bind:key="manga.id">
          <nuxt-link
            :to="{
              name: 'mangas-manga_id-edit',
              params: { manga_id: manga.id },
            }"
          >
            <v-list-item class="smallFont" row="4">
              <v-col cols="6">{{ manga.title }}</v-col>
              <v-col cols="2">{{ manga.read }}</v-col>
              <v-col cols="2">{{ manga.latest }}</v-col>
              <v-col cols="2">{{ manga.unread }}</v-col>
            </v-list-item>
          </nuxt-link>
        </v-card>
        <!-- <v-data-table :headers="headers" :items="mangas">
          <template v-slot:[`item.action`]="{ item }">
            <nuxt-link
              :to="{
                name: 'mangas-manga_id-edit',
                params: { manga_id: item.id },
              }"
            >
              <v-icon>mdi-plus-circle</v-icon>
            </nuxt-link>
            <v-icon @click="deleteConfirm(item.id)">mdi-delete-circle</v-icon>
          </template>
        </v-data-table> -->
      </v-flex>
      <v-flex xs12 mt-5 justify-center>
        <router-link :to="{ name: 'mangas-create' }">
          <v-btn block rounded outlined color="white"
            >Add manga -マンガ追加登録-</v-btn
          >
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      pagetitle: 'マンガ一覧',
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Read', value: 'read' },
        { text: 'Latest', value: 'latest' },
        { text: 'Unread', value: 'unread' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      mangas: [],
    }
  },
  created() {
    this.mangas = this.$store.state.mangas
    this.setPageTitle(this.pagetitle)
  },
  methods: {
    deleteConfirm(id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteManga({ id })
      }
    },
    ...mapActions(['deleteManga', 'setPageTitle']),
  },
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.smallFont {
  font-size: 11px;
}
</style>
