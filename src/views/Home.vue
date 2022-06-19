<template>
  <div>
    <ih-subheader>
      <span slot="text">
        Penn Immune Health Application
      </span>
      <template slot="buttons">
        <ih-button>
          <a href="http://docs.pennsieve.io" target="_blank">
            Documentation
          </a>
        </ih-button>
        <ih-button>
          <a href="http://app.pennsieve.io" target="_blank">
            Visit Pennsieve
          </a>
        </ih-button>
      </template>
    </ih-subheader>
    <div class="page-content">
      <div>
        <router-link to="/studies" exact>
          <img
            src="@/assets/images/browse-data.png"
            class="logo"
          />
            Browse Studies
        </router-link>
        <router-link to="/file-upload" exact>
          <img
            src="@/assets/images/upload-files.png"
            class="logo"
          />
            Upload Data
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import IhSubheader from '@/components/shared/IhSubheader.vue'
import IhButton from '@/components/shared/IhButton.vue'

export default {
  name: 'IhHome',
  components: {
    IhSubheader,
    IhButton
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/_variables.scss';

</style>