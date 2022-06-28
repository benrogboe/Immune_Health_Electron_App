<template>
  <div>
    <ih-header />
    <router-view />
    <search-all-data
      :visible.sync="searchModalVisible"
    />
  </div>
</template>

<script>
import IhHeader from '@/components/shared/IhHeader.vue'
import SearchAllData from '@/components/SearchAllData/SearchAllData.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    IhHeader,
    SearchAllData
  },
  computed: {
    ...mapGetters(['selectedStudy', 'searchModalVisible'])
  },
  methods: {
    ...mapActions(['fetchSelectedStudyPatientsMetadata']),
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
