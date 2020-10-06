import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import style from "./css/style.scss";
import "./quasar";

Vue.config.productionTip = false;

new Vue({
  router,
  style,
  render: (h) => h(App),
}).$mount("#app");
