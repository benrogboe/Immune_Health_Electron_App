import Vue from "vue";
import Vuex from "vuex";
import { pathOr, propOr } from 'ramda'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    profile: null
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
    }
  },
  mutations: {
  },
  actions: {
    login() {
      this.state.profile = {
        firstName: 'Test',
        lastName: 'Profile',
        token: ''
      }
    }
  },
});

export default store;