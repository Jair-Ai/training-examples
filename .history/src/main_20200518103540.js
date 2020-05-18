import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { VueCsvImport } from "vue-csv-import";
import { Datetime } from "vue-datetime";
import { Settings } from "luxon";
import * as Yup from "yup";
import VueResorce from "vue-resource";

Settings.defaultLocale = "pt-Br";
Vue.use(VueResorce);
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

const perPage = 50;
const dddList = [
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  21,
  22,
  24,
  27,
  28,
  31,
  32,
  33,
  34,
  35,
  37,
  38,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  51,
  53,
  54,
  55,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  71,
  73,
  74,
  75,
  77,
  79,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  91,
  92,
  93,
  94,
  95,
  96,
  97,
  98,
  99
];

const rowEmailValidator = Yup.string()
  .email()
  .required();

const rowNameValidator = Yup.string().required();

//const rowTelefoneValidator = Yup.number();

const checkDuplicates = function(array, key) {
  let lookup = {};
  let result = [];
  array.forEach(element => {
    if (lookup[element[key]]) {
      lookup[element[key]] = true;
      result.push(element);
    }
  });
  return result;
};

const takeDupl = function(arr, column) {
  let duplIds = arr
    .map(e => e[column])
    .map((e, i, final) => final.indexOf(e) !== i && i)
    .filter(obj => arr[obj])
    .map(e => arr[e][column]);

  let duplicatesObj = arr.filter(obj => duplIds.includes(obj[column]));
  let notduplicates = arr.filter(obj => !obj.includes(duplicatesObj[column]));

  return [duplicatesObj, notduplicates];
};

const emailValidator = async function(arraytoValidate) {
  return arraytoValidate.filter(element =>
    rowEmailValidator.isValidSync(element.email)
  );
};

const emailValidatorNot = async function(arraytoValidate) {
  return arraytoValidate.filter(
    element => !rowEmailValidator.isValidSync(element.email)
  );
};

export { emailValidator };
export { emailValidatorNot };
export { rowEmailValidator };
export { rowNameValidator };
export { dddList };
export { perPage };
export { checkDuplicates };
export { takeDupl };
const fields = [
  {
    key: "Nome",
    label: "Nome",
    sortable: true,
    variant: "light"
  },
  {
    key: "email",
    label: "email",
    sortable: true,
    variant: "light"
  },
  {
    key: "telefone",
    label: "telefone",
    sortable: true,
    variant: "light"
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
