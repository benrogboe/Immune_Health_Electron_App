<template>
  <div>
    <ih-subheader previousRoute="/studies">
      <template slot="text">
        File Upload
      </template>
      <template slot="buttons">
        <ih-button>
          <router-link to="/" exact>
            Main Menu
          </router-link>
        </ih-button>
      </template>
    </ih-subheader>
    <div>
    </div>
  </div>
</template>

<script>
import IhSubheader from '@/components/shared/IhSubheader.vue'
import IhButton from '@/components/shared/IhButton.vue'

export default {
  name: 'FileUpload',
  components: {
    IhSubheader,
    IhButton
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/css/_variables.scss';

</style>
