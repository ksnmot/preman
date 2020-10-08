<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>連絡先一覧</h1>
      </v-flex>
      <v-flex xs12 mt-5 mr-5 text-right>
        <router-link :to="{ name: 'addresses-create' }">
          <v-btn color="info">連絡先追加</v-btn>
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
              <v-icon>mdi-pencil</v-icon>
            </nuxt-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)"
              >mdi-delete</v-icon
            >
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
        { text: '名前', value: 'name' },
        { text: '電話番号', value: 'tel' },
        { text: 'メールアドレス', value: 'email' },
        { text: '住所', value: 'address' },
        { text: '操作', value: 'action', sortable: false },
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
