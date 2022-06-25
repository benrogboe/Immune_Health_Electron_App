<template>
  <div>
    <ih-header />
    <router-view />
  </div>
</template>

<script>
import IhHeader from '@/components/shared/IhHeader.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    IhHeader,
  },
  computed: {
    ...mapGetters(['selectedStudy'])
  },
  methods: {
    ...mapActions(['fetchSelectedStudyPatientsMetadata'])
  },
  watch: {
    selectedStudy() {
      this.fetchSelectedStudyPatientsMetadata()
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/_variables.scss';

</style>
