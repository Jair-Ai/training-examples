<template>
  <b-container float-center>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="info"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >{{ AlertStepTwo }} {{ dismissCountDown }}</b-alert>

    <p>{{ textClient }}</p>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Copie e Cole">
          <TabCopyAndPast :fields="fields" :transProps="transProps"></TabCopyAndPast>
        </b-tab>
        <b-tab title="Importe em Formato Csv" active>
          <TabImportCsv></TabImportCsv>
        </b-tab>
      </b-tabs>
    </div>
    <div class="botoes" v-if="everythingOK">
      <div style="float: left;">
        <b-button type="reset" variant="danger">Limpar</b-button>
      </div>
      <div class="float-right">
        <b-button type="submit" variant="primary">Salvar e avançar</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import TabCopyAndPast from "./TabCopyAndPast";
import TabImportCsv from "./TabImportCsv";
export default {
  name: "StepTwo",
  components: {
    TabCopyAndPast,
    TabImportCsv
  },
  data() {
    return {
      AlertStepTwo:
        "Você ja cadastrou sua pesquisa, agora precisa cadastrar clientes, afinal de que adiantaria uma pesquisa sem clientes!",
      dismissSecs: 10,
      dismissCountDown: 0,
      transProps: {
        // Transition name
        name: "flip-list"
      },
      perPage: 20,
      currentPage: 1,
      tableone: false,
      everythingOK: true,
      fields: [
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
      ]
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },
  mounted() {
    this.dismissCountDown = this.dismissSecs;
  }
};
</script>

<style lang="scss" scoped>
.botoes {
  display: inline;
  overflow: auto;
  white-space: nowrap;
  margin: 0px auto;
}

.separate {
  padding: 30px;
}

* *::before,
*::after {
  box-sizing: border-box;
}

p {
  position: relative;
  overflow: hidden;
  font-weight: 700;

  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-align: center;
}

p::first-letter {
  color: Green;
  font-size: xx-large;
}

p:hover::after {
  transform: rotete(0) translate(0, 0);
}
</style>
