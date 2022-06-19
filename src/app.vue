<template>
  <div>
    <ih-header />
    <router-view />
  </div>
</template>

<script>
import IhHeader from '@/components/shared/IhHeader.vue'

export default {
  name: 'app',
  components: {
    IhHeader,
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/css/_variables.scss';

</style>
