import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { VueCsvImport } from "vue-csv-import";
import { Datetime } from "vue-datetime";
import { Settings } from "luxon";

Settings.defaultLocale = "pt-Br";
Vue.use(Datetime);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-datetime/dist/vue-datetime.css";

Vue.config.productionTip = false;
export const EventBus = new Vue();

new Vue({
  components: { VueCsvImport, Datetime },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
