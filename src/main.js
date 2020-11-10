import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import IdleVue from "idle-vue";
import store from "@/store/store";

import style from "./css/style.scss";
import "./quasar";

Vue.config.productionTip = false;

const eventsHub = new Vue({
  router,
  style,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 300000, // in milisecond 300000
  startAtIdle: false,
});
