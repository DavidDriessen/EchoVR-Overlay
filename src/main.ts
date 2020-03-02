import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
Vue.prototype.conf = window.options;

// noinspection JSUnusedGlobalSymbols
new Vue({
  render: h => h(App)
}).$mount("#app");
