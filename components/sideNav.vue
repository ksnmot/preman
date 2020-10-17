<template>
  <!-- ストアのドロワー変数を確認して、存在すれば表示する -->
  <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
    <v-list>
      <v-list-item>
        <!-- ログイン中でphotURLが取得できる場合は写真を表示 -->
        <v-list-item-avatar>
          <img v-if="photoURL" :src="photoURL" />
        </v-list-item-avatar>
        <!-- ユーザー名を表示 -->
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <!-- 各種メニューを繰り返し表示 -->
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // メニューを表示名、アイコン、リンク先をもったオブジェクトとして配列設定
      items: [
        {
          title: 'マンガ一覧',
          icon: 'mdi-clipboard-list',
          link: { name: 'mangas' },
        },
        {
          title: 'マンガ登録',
          icon: 'mdi-book-plus',
          link: { name: 'mangas-create' },
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['userName', 'photoURL']),
  },
}
</script>
