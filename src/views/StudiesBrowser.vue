<template>
  <div>
    <ih-subheader previousRoute="/">
      <template slot="text">
        {{selectedStudy}}
      </template>
      <template slot="buttons">
        <ih-button>
          <router-link to="/file-upload" exact>
            Upload Files
          </router-link>
        </ih-button>
      </template>
    </ih-subheader>
    <div class="page-content">
    </div>
  </div>
</template>

<script>
import IhSubheader from '@/components/shared/IhSubheader.vue'
import IhButton from '@/components/shared/IhButton.vue'

export default {
  name: 'StudiesBrowser',
  components: {
    IhSubheader,
    IhButton
  },
  data() {
    return {
      selectedStudy: "Test Study"
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/_variables.scss';

</style>