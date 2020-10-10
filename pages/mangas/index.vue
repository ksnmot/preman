<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>マンガ一覧</h1>
      </v-flex>
      <v-flex xs12 mt-5 mr-5 text-right>
        <router-link :to="{ name: 'mangas-create' }">
          <v-btn color="info">新規マンガ登録</v-btn>
        </router-link>
      </v-flex>
      <v-flex xs12 mt-3 justify-center>
        <v-data-table :headers="headers" :items="mangas">
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
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
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
  },
  methods: {
    deleteConfirm(id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteManga({ id })
      }
    },
    ...mapActions(['deleteManga']),
  },
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
