import Vue from 'vue'
import App from './App.vue'
import router from './router'

import style from './css/style.scss'

Vue.config.productionTip = false

new Vue({
  router,
  style,
  render: h => h(App)
}).$mount('#app')
