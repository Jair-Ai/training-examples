<template>
  <b-container float-center>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="info"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      >{{ AlertStepTwo }} {{ dismissCountDown }}</b-alert
    >

    <p>{{ textClient }}</p>
    <b-row md="12" cols="1">
      <b-alert :show="!congrats" fade variant="warning">
        A ordem é Nome - Email - Telefone
        <b-icon
          icon="exclamation-circle-fill"
          variant="warning"
          style="width: 25px; height: 25px;"
        ></b-icon>
      </b-alert>
      <b-alert :show="congrats" fade variant="success">
        Muito bem, todos os registros carregados estão certos, clique em salvar
        e avançar
        <b-icon
          animation="cylon"
          icon="exclamation-circle-fill"
          variant="success"
          style="width: 25px; height: 25px;"
        ></b-icon>
      </b-alert>
    </b-row>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Import em formato CSV">
          <TabImportCsv02
            :transProps="transProps"
            :perPage="perPage"
            :fields="fields"
          ></TabImportCsv02>
        </b-tab>
        <b-tab title="Copie e Cole">
          <TabCopyandPaste04
            :perPage="perPage"
            :fields="fields"
          ></TabCopyandPaste04>
        </b-tab>
        <b-tab title="Inserir Registros" active>
          <TabWriteRegisters
            :perPage="perPage"
            :fields="fields"
          ></TabWriteRegisters>
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
import TabWriteRegisters from "./tabs/TabWriteRegisters";
import TabImportCsv02 from "./tabs/TabImportCsv02";
import TabCopyandPaste04 from "./tabs/TabCopyAndPaste04";
import { perPage, fields } from "../../main";

// TODO: Create confirmation for this Steps checking each tab searching for corrects inputs
// TODO: THIS function should be computed or event from event bus taking information from 3 tables.
export default {
  name: "StepTwo",
  components: {
    TabWriteRegisters,
    TabImportCsv02,
    TabCopyandPaste04
  },
  data() {
    return {
      AlertStepTwo:
        "Você ja cadastrou sua pesquisa, agora precisa cadastrar clientes, afinal de que adiantaria uma pesquisa sem clientes!",
      dismissSecs: 10,
      dismissCountDown: 0,
      textClient:
        "Voce pode optar por copiar e colar, Importar um arquivo de clientes, ou mesmo digitar os dados dos clientes",
      textClient2: "A ordem é Nome, email e telefone",
      transProps: {
        // Transition name
        name: "flip-list"
      },
      everythingOK: true,
      perPage: perPage,
      fields: fields
    };
  },
  props: {
    congrats: {
      type: Boolean,
      default: false
    }
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
* *::before *::after {
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
