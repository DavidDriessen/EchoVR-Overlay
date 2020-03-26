import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTachometerAlt,
  faRuler,
  faStopwatch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTachometerAlt);
library.add(faStopwatch);
library.add(faRuler);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
Vue.prototype.conf = window.options;

// noinspection JSUnusedGlobalSymbols
new Vue({
  render: h => h(App)
}).$mount("#app");
