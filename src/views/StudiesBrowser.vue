<template>
  <div class="container">
    <span class="sidebar-container">
      <bf-navigation-secondary :studies="allStudies" />
    </span>
    <span class="selected-content-container">
      <ih-subheader previousRoute="/">
        <template v-if="selectedStudy" slot="text">
          <div>
            <div class="property-text">
              Study
            </div>
            <div>
              {{selectedStudyName}}
            </div>
          </div>
          <div class="participant-container">

          </div>
          <div class="visits-container">

          </div>
          <div class="samples-container">

          </div>
        </template>
        <template slot="buttons">
          <ih-button>
            <router-link to="/file-upload" exact>
              Upload Files
            </router-link>
          </ih-button>
        </template>
      </ih-subheader>
    </span>
  </div>
</template>

<script>
import IhSubheader from '@/components/shared/IhSubheader.vue'
import IhButton from '@/components/shared/IhButton.vue'
import BfNavigationSecondary from '@/components/bf-navigation/BfNavigationSecondary.vue'
import { mapActions, mapGetters } from 'vuex'
import { isEmpty, propOr } from 'ramda'
import axios from 'axios'

export default {
  name: 'StudiesBrowser',
  components: {
    IhSubheader,
    IhButton,
    BfNavigationSecondary
  },
  data() {
    return {
      allStudies: []
    }
  },
  async mounted() {
    // HARDCODED FOR NOW: UPDATE apiKey VALUE WITH A VALID LOGGED IN USER API TOKEN TO GET STUDIES POPULATED
    const apiKey = 'eyJraWQiOiJwcjhTaWE2dm9FZTcxNyttOWRiYXRlc3lJZkx6K3lIdDE4RGR5aGVodHZNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NzY0NGZkYy1iZjFmLTRkMzUtOWRlMC1hYzlkODUxZmEyZTEiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0xXzZkNDc4M2U3LThhNTctNGY0Yy1iODQ5LWYzZGExMGUzMmRlNSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2IxTnl4WWNyMCIsImNsaWVudF9pZCI6IjY3MG1vN3NpODFwY2Mzc2Z1YjdvMTkxNGQ4Iiwib3JpZ2luX2p0aSI6ImFhYjEwZTA5LTk3ZjEtNDBjMy05MGFiLTU1ZmI1ZWY3NWM5YyIsImV2ZW50X2lkIjoiM2Q4ZDYwMTktZThlOS00MzQ4LWE3MmQtZjlkNWYzNzg2ZWZmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1NTkwNjAzMCwiZXhwIjoxNjU1OTk0MjUwLCJpYXQiOjE2NTU5OTA2NTAsImp0aSI6IjIwOTFiNTA5LTFlYmQtNDk5Ni1hODVlLWNlYzUxODk4MTRkMSIsInVzZXJuYW1lIjoiOTc2NDRmZGMtYmYxZi00ZDM1LTlkZTAtYWM5ZDg1MWZhMmUxIn0.EaYQAWBh6T1GsTkmB4TmK6YvpE5wSDcDmvuUSS0MNHkP3wO7knOCAczIts2elOGRpjT8IzIzyiHzmmQ2ILw5RQtwq_Y-Htq5Wg6LOZ5lmG1-j-zLCpw1QDNaIIDmSNf2NvO5HU2KtHIFUad86r_oeGGZMSu9S87A0SnyKmwjR9LSUN-w8AoBIs5X9dT2vHS9SxyeZK2GAtONKurspE7d1CzgVOa737aCIevLHaJVFWX8-dY8Vhd0LBXCFlEUiJNE8yXIF1A1hRdU2kHp1K1qRw0IV9ohRnSWHRKrUlDr-d5pGmOVgzC7xxrGbN5-NWI81WEAK0yGW7r1bn4q3zNIdw'
    const studiesUrl = `https://api.pennsieve.io/models/datasets/N:dataset:e2de8e35-7780-40ec-86ef-058adf164bbc/concepts/33a61ee7-fce9-4f0c-823c-78368ed8dc42/instances?api_key=${apiKey}`
    
    await axios.get(studiesUrl).then(response => this.allStudies = response.data)

    if (!isEmpty(this.allStudies.length) && isEmpty(this.selectedStudy)) {
      this.setSelectedStudy(this.allStudies[0])
    }
  },
  methods: {
    ...mapActions(['setSelectedStudy']),
  },
  computed: {
    ...mapGetters(['selectedStudy']),
    selectedStudyName() {
      const studyValues = propOr([], 'values', this.selectedStudy)
      if (isEmpty(studyValues)) {
        return ''
      }
      return propOr('', 'value', studyValues[0])
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/_variables.scss';
.sidebar-container {
  width: auto;
  min-width: 10rem;
  max-width: 20rem;
}
.selected-content-container {
  flex-grow: 1;
}
.container {
  display: flex;
}
.property-text {
  color: $app-primary-color;
  font-size: 1rem;
  font-weight: 500;
}
</style>