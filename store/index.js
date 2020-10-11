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
      unreadTotal: 12,
    }),
    mutations: {
      setLoginUser(state, user) {
        state.login_user = user
      },

      deleteLoginUser(state) {
        state.login_user = null
      },

      toggleSideMenu(state) {
        state.drawer = !state.drawer
      },

      setPageTitle(state, pagetitle) {
        state.page_title = pagetitle
      },

      addManga(state, { id, manga }) {
        manga.id = id
        state.mangas.push(manga)
      },
      calcUnreadTotal(state) {
        for (let i = 0; i < state.mangas.length; i++) {
          state.unreadTotal += state.mangas[i].unread
        }
      },
      updateManga(state, { id, manga }) {
        const index = state.mangas.findIndex((manga) => manga.id === id)

        state.mangas[index] = manga
      },
      deleteManga(state, { id }) {
        const index = state.mangas.findIndex((manga) => manga.id === id)

        state.mangas.splice(index, 1)
      },
    },
    actions: {
      login() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(googleAuthProvider)
      },
      setLoginUser({ commit }, user) {
        commit('setLoginUser', user)
      },

      setPageTitle({ commit }, pagetitle) {
        commit('setPageTitle', pagetitle)
      },

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
      calcUnreadTotal({ commit }) {
        commit('calcUnreadTotal')
      },
      logout() {
        firebase.auth().signOut()
      },

      deleteLoginUser({ commit }) {
        commit('deleteLoginUser')
      },

      toggleSideMenu({ commit }) {
        commit('toggleSideMenu')
      },
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
