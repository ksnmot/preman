<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>マンガ一覧</h1>
      </v-flex>
      <v-flex xs12 mt-5 mr-5 text-right>
        <router-link :to="{ name: 'addresses-create' }">
          <v-btn color="info">新規マンガ登録</v-btn>
        </router-link>
      </v-flex>
      <v-flex xs12 mt-3 justify-center>
        <v-data-table :headers="headers" :items="addresses">
          <template v-slot:[`item.action`]="{ item }">
            <nuxt-link
              :to="{
                name: 'addresses-address_id-edit',
                params: { address_id: item.id },
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
        { text: 'Title', value: 'name' },
        { text: 'Read', value: 'tel' },
        { text: 'Latest', value: 'email' },
        { text: 'Unread', value: 'address' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      addresses: [],
    }
  },
  created() {
    this.addresses = this.$store.state.addresses
  },
  methods: {
    deleteConfirm(id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteAddress({ id })
      }
    },
    ...mapActions(['deleteAddress']),
  },
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
