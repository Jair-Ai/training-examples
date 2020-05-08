import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { VueCsvImport } from "vue-csv-import";
import { Datetime } from "vue-datetime";
import { Settings } from "luxon";
import * as Yup from "yup";

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

const emailValidator = async function(arraytoValidate) {
  const yupValidator = Yup.string()
    .email()
    .required();

  return arraytoValidate.filter(element =>
    yupValidator.isValidSync(element.email)
  );
};

const emailValidatorNot = function(arraytoValidate) {
  const yupValidator = Yup.string()
    .email()
    .required();

  let validTable = arraytoValidate.filter(element => {
    return !yupValidator.isValidSync(element.email);
  });
  console.log(validTable);
};



export { emailValidator };
export { emailValidatorNot };

const fields = [
  {
    key: "Nome",
    sortable: true
  },
  {
    key: "E-mail",
    sortable: true
  },
  {
    key: "Telefone",
    label: "telefone",
    sortable: true
    // Variant applies to the whole column, including the header and footer
    //variant: "danger"
  }
];

export { fields };

new Vue({
  components: { VueCsvImport, Datetime },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
