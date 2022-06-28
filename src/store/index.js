import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import { pathOr, propOr, isEmpty } from 'ramda'

Vue.use(Vuex);

// HARDCODED FOR NOW: UPDATE apiKey VALUE WITH A VALID LOGGED IN USER API TOKEN TO GET STUDIES POPULATED
const API_KEY = 'eyJraWQiOiJwcjhTaWE2dm9FZTcxNyttOWRiYXRlc3lJZkx6K3lIdDE4RGR5aGVodHZNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NDQ3NWU5NS1kNGYyLTQxNDItOTJlYS03OWQzN2NiODliMTQiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0xX2ExYTVmMjEyLTk5ODQtNDgyMC05ZjU3LWQyZWU5OTVjNGUyYyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2IxTnl4WWNyMCIsImNsaWVudF9pZCI6IjY3MG1vN3NpODFwY2Mzc2Z1YjdvMTkxNGQ4Iiwib3JpZ2luX2p0aSI6ImM3MmY3ZmZiLTVhMDMtNGQyZC05NzZkLTUxMjJkODI5YzUxZSIsImV2ZW50X2lkIjoiMzIzOWQ3ZTMtMGU1YS00N2FiLThlYWMtNmM2OTY5MTRkMTQ0IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1NjQ0MDEwNCwiZXhwIjoxNjU2NDQzNzA0LCJpYXQiOjE2NTY0NDAxMDQsImp0aSI6ImM2ZTM1MTc3LWE5ZGYtNGYzMS04MmQ5LTFkMTM0OTAyNjI0NCIsInVzZXJuYW1lIjoiODQ0NzVlOTUtZDRmMi00MTQyLTkyZWEtNzlkMzdjYjg5YjE0In0.GiIwOjE-i97NIHHPty7-z-kpQExSyzK4_dQEcGpRpwYtrX4b0pqBKfTJri4wSqZalTJIYMHWldkqlGe6371b024rsNJLmFnhbsbXa9RD5hsha9-uwk5G3KLYyz4U2UPtd8G_6-3Jm1kNs5jBvChaHS2auDkbN6OkU5mwffOqhYGA-lepjDW8mQnthC4m1QJg74jVgoWs8U1s3AjoYP7Kf6C72dOLRQyg4wUNewBSSSFNM2aS3h4kst8WcCOtl-8fkDWhL0W2OTnW6wlk_YDzl_pen6pVQVd05hyTOEl9Dl-srNVVTUE9VvmxOrTfBQcWGy5rjbPeRsIwIxHrkK4MIQ'

const store = new Vuex.Store({
  state: {
    profile: null,
    allStudies: [],
    selectedStudy: {},
    selectedStudyPatientsMetadata: []
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
      return state.selectedStudy
    },
    selectedStudyName (state) {
      const studyValues = propOr([], 'values', state.selectedStudy)
      if (isEmpty(studyValues)) {
        return ''
      }
      return propOr('', 'value', studyValues[0])
    },
  },
  mutations: {
    SET_ALL_STUDIES(state, data) {
      state.allStudies = data
    },
    SET_SELECTED_STUDY(state, data) {
      state.selectedStudy = data
    },
    SET_SELECTED_STUDY_PATIENTS_METADATA(state, data) {
      state.selectedStudyPatientsMetadata = data
    },
  },
  actions: {
    async login({ dispatch, state }) {
      // Set a dummy profile for now
      this.state.profile = {
        firstName: 'Test',
        lastName: 'Profile',
        token: ''
      }
      await dispatch('fetchStudies')
      await dispatch('setSelectedStudy', state.allStudies[0])
    },
    async setSelectedStudy({ commit }, data) {
      await commit('SET_SELECTED_STUDY', data)
    },
    async fetchStudies({ commit }) {
      const studiesUrl = `https://api.pennsieve.io/models/datasets/N:dataset:e2de8e35-7780-40ec-86ef-058adf164bbc/concepts/33a61ee7-fce9-4f0c-823c-78368ed8dc42/instances?api_key=${API_KEY}`
      
      let responseData = []
      await axios.get(studiesUrl).then(response => {
        responseData = response.data
      })
      await commit('SET_ALL_STUDIES',responseData)
    },
    async fetchSelectedStudyPatientsMetadata({ commit, state }) {
      const selectedStudyId = propOr('', 'id', state.selectedStudy)
      const patientsStudyMetadataUrl = `https://api.pennsieve.io/models/datasets/N:dataset:e2de8e35-7780-40ec-86ef-058adf164bbc/concepts/33a61ee7-fce9-4f0c-823c-78368ed8dc42/instances/${selectedStudyId}/relations/patient?includeIncomingLinkedProperties=true`
      const header = {
        headers: { Authorization: `Bearer ${API_KEY}`}
      }
      let responseData = []
      await axios.get(patientsStudyMetadataUrl, header).then(response => {
        responseData = response.data
      })
      await commit('SET_SELECTED_STUDY_PATIENTS_METADATA', responseData)
    }
  },
});

export default store;