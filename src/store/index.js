import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import { pathOr, propOr, isEmpty } from 'ramda'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    profile: null,
    allStudies: [],
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
    allStudies (state) {
      return state.allStudies
    },
    selectedStudy (state) {
      // Return the first study by default if none are selected
      if (!isEmpty(state.allStudies) && isEmpty(state.selectedStudy)) {
        return state.allStudies[0]
      }
      return state.selectedStudy
    },
    selectedStudyName(state) {
      const studyValues = propOr([], 'values', state.selectedStudy)
      if (isEmpty(studyValues)) {
        return ''
      }
      return propOr('', 'value', studyValues[0])
    }
  },
  mutations: {
    SET_ALL_STUDIES(state, data) {
      state.allStudies = data
    },
    SET_SELECTED_STUDY(state, data) {
      state.selectedStudy = data
    },
  },
  actions: {
    async login({ dispatch }) {
      // Set a dummy profile for now
      this.state.profile = {
        firstName: 'Test',
        lastName: 'Profile',
        token: ''
      }
      await dispatch('fetchStudies')
    },
    async setSelectedStudy({ commit }, data) {
      await commit('SET_SELECTED_STUDY', data)
    },
    async fetchStudies({ commit }) {
      // HARDCODED FOR NOW: UPDATE apiKey VALUE WITH A VALID LOGGED IN USER API TOKEN TO GET STUDIES POPULATED
      const apiKey = 'eyJraWQiOiJwcjhTaWE2dm9FZTcxNyttOWRiYXRlc3lJZkx6K3lIdDE4RGR5aGVodHZNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NzY0NGZkYy1iZjFmLTRkMzUtOWRlMC1hYzlkODUxZmEyZTEiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0xXzZkNDc4M2U3LThhNTctNGY0Yy1iODQ5LWYzZGExMGUzMmRlNSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2IxTnl4WWNyMCIsImNsaWVudF9pZCI6IjY3MG1vN3NpODFwY2Mzc2Z1YjdvMTkxNGQ4Iiwib3JpZ2luX2p0aSI6ImFhYjEwZTA5LTk3ZjEtNDBjMy05MGFiLTU1ZmI1ZWY3NWM5YyIsImV2ZW50X2lkIjoiM2Q4ZDYwMTktZThlOS00MzQ4LWE3MmQtZjlkNWYzNzg2ZWZmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1NTkwNjAzMCwiZXhwIjoxNjU1OTk1NTkxLCJpYXQiOjE2NTU5OTE5OTEsImp0aSI6Ijk0OWI4YTI5LTM5NDMtNDFiZC05ZjMzLTI0NmYyYjU3OGUxMSIsInVzZXJuYW1lIjoiOTc2NDRmZGMtYmYxZi00ZDM1LTlkZTAtYWM5ZDg1MWZhMmUxIn0.obAFOLxSKC0xrlejCir69uzacdDT4dfecIWqqRw9P0F1bRMyMRYEQra1H8ZFRilvTET-bn0A65xq5shRIHBxQgqch62pCPhFht3t-aXWaGYtg5Yt8qRzGNN8K54GTyoMnGL8-hoVPli5Han4B7wp6lKdVdAqJfCMfPI2A4ep1yr9JBJu8VXeQqXjGC-2jQsgMUoPfajCJaIMOjq15PAwfIAt-1bCFxDYqc_dKqcYKINcgkAKcmx8O6YE8K21QRaUAX5YekaP2i8aEDRWO136yPN-cWZaudtmUCJkkCFY1ad8713C86OknGaZBatyltdwHnCAGI9LOJs6hR6wMs0EFg'
      const studiesUrl = `https://api.pennsieve.io/models/datasets/N:dataset:e2de8e35-7780-40ec-86ef-058adf164bbc/concepts/33a61ee7-fce9-4f0c-823c-78368ed8dc42/instances?api_key=${apiKey}`
      
      let responseData = []
      await axios.get(studiesUrl).then(response => {
        responseData = response.data
      })
      await commit('SET_ALL_STUDIES',responseData)
    }
  },
});

export default store;