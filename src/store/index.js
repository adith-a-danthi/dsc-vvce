import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: localStorage.loggedIn || false
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user.loggedIn;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
      localStorage.loggedIn = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
