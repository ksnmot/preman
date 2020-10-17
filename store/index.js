import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      login_user: null,
      drawer: false,
      mangas: [],
      page_title: null,
    }),
    mutations: {
      // ログイン/ログアウト系Mutations
      setLoginUser(state, user) {
        state.login_user = user
      },
      deleteLoginUser(state) {
        state.login_user = null
      },
      // マンガ登録・読込・更新・削除系Mutations
      addManga(state, { id, manga }) {
        manga.id = id
        state.mangas.push(manga)
      },
      updateManga(state, { id, manga }) {
        const index = state.mangas.findIndex((manga) => manga.id === id)
        state.mangas[index] = manga
      },
      deleteManga(state, { id }) {
        const index = state.mangas.findIndex((manga) => manga.id === id)
        state.mangas.splice(index, 1)
      },
      // その他画面操作系Mutations
      toggleSideMenu(state) {
        state.drawer = !state.drawer
      },
      setPageTitle(state, pagetitle) {
        state.page_title = pagetitle
      },
    },
    actions: {
      // ログイン/ログアウト系Actions
      // google認証画面に遷移してログイン
      login() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(googleAuthProvider)
      },
      // ログインしてるときに、ユーザー情報をストア格納
      setLoginUser({ commit }, user) {
        commit('setLoginUser', user)
      },
      // googleAuthでログアウト
      logout() {
        firebase.auth().signOut()
      },
      // ログアウトしたときに、ユーザー情報をストアから削除
      deleteLoginUser({ commit }) {
        commit('deleteLoginUser')
      },
      // マンガ登録・読込・更新・削除系Actions
      // マンガ登録
      addManga({ getters, commit }, manga) {
        if (getters.uid) {
          firebase
            .firestore()
            .collection(`users/${getters.uid}/mangas`)
            .add(manga)
            .then((doc) => {
              commit('addManga', { id: doc.id, manga })
            })
          // 臨時：取得できなくてもとりあえずstoreに保存
        } else {
          commit('addManga', { id: 'testdocid', manga })
        }
      },
      // マンガ読込
      fetchManga({ getters, commit }) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/mangas`)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) =>
              commit('addManga', { id: doc.id, manga: doc.data() })
            )
          })
      },
      // マンガ更新
      updateManga({ getters, commit }, { id, manga }) {
        if (getters.uid) {
          firebase
            .firestore()
            .collection(`users/${getters.uid}/mangas`)
            .doc(id)
            .update(manga)
            .then(() => {
              commit('updateManga', { id, manga })
            })
        }
      },
      // マンガ削除
      deleteManga({ getters, commit }, { id }) {
        if (getters.uid) {
          firebase
            .firestore()
            .collection(`users/${getters.uid}/mangas`)
            .doc(id)
            .delete()
            .then(() => {
              commit('deleteManga', { id })
            })
        }
      },
      // その他画面操作系Actions
      // トグルの開閉のためにdrawer値を更新
      toggleSideMenu({ commit }) {
        commit('toggleSideMenu')
      },
      // タイトルバー表示文字列変化のためにpagetitle値を更新
      setPageTitle({ commit }, pagetitle) {
        commit('setPageTitle', pagetitle)
      },
    },
    modules: {},
    getters: {
      userName: (state) =>
        state.login_user ? state.login_user.displayName : '',
      photoURL: (state) => (state.login_user ? state.login_user.photoURL : ''),
      uid: (state) => (state.login_user ? state.login_user.uid : null),
      getMangaById: (state) => (id) =>
        state.mangas.find((manga) => manga.id === id),
    },
  })
}
export default createStore
