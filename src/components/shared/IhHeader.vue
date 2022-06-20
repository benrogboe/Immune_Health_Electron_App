<template>
  <div class="header">
    <div class="logo-wrap">
      <img
        src="@/assets/images/pennsieve-logo-white.svg"
        class="logo"
      >
    </div>
    <span class="title">Penn Immune Health Application</span>
    <span>
      <ih-button v-on:click="login">
        <svg-icon
          class="login-icon"
          icon="icon-person"
          height="18"
          width="18"
          color="#fff"
        />
        <span v-if="!isLoggedIn">
          Login
        </span>
        <span v-else>
          {{username}}
        </span>
      </ih-button>
    </span>
  </div>
</template>

<script>
import IhButton from '@/components/shared/IhButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'IhHeader',
  components: {
    IhButton
  },
  data() {
    return {
      isLogInModalVisible: false,
      userDisplayName: '',
    }
  },
  methods: {
    ...mapActions(['login']),
  },
  computed: {
    ...mapGetters(['username', 'isLoggedIn'])
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/_variables.scss';
.header {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 64px;
  background-color: $purple_2;
  padding-right: 20px;
  position: relative;
  width: 100%;
  min-width: fit-content;
  justify-content: space-between;
}
.logo {
  display: block;
  height: 35px;
  width: 198px;
}
.logo-wrap {
  align-items: center;
  display: flex;
  flex-shrink: 0;
}
.title {
  font-family: 'system-ui';
  font-weight: 100;
  color: white;
  font-size: 18px;
  white-space: nowrap;
  margin-right: 1rem;
}
.login-icon {
  margin-right: 1rem;
}
</style>
