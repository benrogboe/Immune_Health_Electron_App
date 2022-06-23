import Vue from "vue";
import Vuex from "vuex";
import { pathOr, propOr } from 'ramda'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    profile: null,
    selectedStudy: {}
  },
  getters: {
    username (state) {
      const firstName = pathOr('', ['firstName'], state.profile)
      const lastName = pathOr('', ['lastName'], state.profile)
      const abbrvLastName = lastName.length === 1 ? lastName[0] : `${lastName[0]}.`
      return `${firstName} ${abbrvLastName}`
    },
    userToken (state) {
      return propOr('', 'token', state.profile)
    },
    isLoggedIn (state) {
      return state.profile !== null
    },
    selectedStudy (state) {
      return state.selectedStudy
    }
  },
  mutations: {
    SET_SELECTED_STUDY(state, data) {
      state.selectedStudy = data
    },
  },
  actions: {
    login() {
      this.state.profile = {
        firstName: 'Test',
        lastName: 'Profile',
        token: ''
      }
    },
    setSelectedStudy: ({ commit }, data) => {
      commit('SET_SELECTED_STUDY', data)
    }
  },
});

export default store;