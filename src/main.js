import Vue from 'vue'
import App from './app.vue'
import * as svgicon from 'vue-svgicon'
import router from '@/router'
import store from '@/store'
import '@/assets/index'
import {
  Tooltip
} from 'element-ui'

Vue.config.productionTip = false

Vue.use(svgicon, {
  tagName: 'svg-icon'
})

Vue.use(Tooltip)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
