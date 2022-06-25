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
import { mapGetters } from 'vuex'

export default {
  name: 'StudiesBrowser',
  components: {
    IhSubheader,
    IhButton,
    BfNavigationSecondary
  },
  computed: {
    ...mapGetters(['allStudies', 'selectedStudy', 'selectedStudyName']),
  },
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