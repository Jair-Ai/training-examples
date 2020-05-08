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
          <div class="separate">
            <b-alert show variant="warning">A ordem tem que ser Nome - Email - Telefone</b-alert>
            <b-form-file
              v-if="quero"
              class="separate"
              @change="onFileSelected"
              accept=".csv"
              ref="csv"
            ></b-form-file>

            <testeCsv v-model="csv" :map-fields="['Nome', 'E-mail', 'Telefone']" url="teste">
              <template slot="hasHeaders" slot-scope="{ headers, toggle }">
                <label>
                  <input type="checkbox" id="hasHeaders" :value="headers" @change="toggle" />
                  Cabeçalho?
                </label>
              </template>

              <template slot="error">File type is invalid</template>

              <template slot="thead">
                <tr>
                  <th>Colunas Necessárias</th>
                  <th>Colunas Do Arquivo Importado</th>
                </tr>
              </template>

              <template slot="submit" slot-scope="{ submit }">
                <b-button variant="primary" @click.prevent="submit">send!</b-button>
              </template>
            </testeCsv>
            <div>
              <b-pagination
                v-if="rows >= perPage"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>

              <b-table
                striped
                hover
                :items="items"
                :fields="fields"
                small
                primary-key="a"
                :tbody-transition-props="transProps"
                :per-page="perPage"
                :current-page="currentPage"
              ></b-table>
            </div>
          </div>
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
import { EventBus } from "../../main";
import testeCsv from "./testeCsv";
import TabCopyAndPast from "./TabCopyAndPast";
export default {
  name: "StepTwo",
  components: {
    testeCsv,
    TabCopyAndPast
  },
  data() {
    return {
      AlertStepTwo:
        "Você ja cadastrou sua pesquisa, agora precisa cadastrar clientes, afinal de que adiantaria uma pesquisa sem clientes!",
      dismissSecs: 10,
      dismissCountDown: 0,
      items: [],
      quero: false,
      csv: "",
      text: "",
      toTable: "",
      textClient:
        "Voce pode optar por copiar e colar ou Importar um arquivo de clientes.",
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
      ],
      fieldsPaste: [],
      filds2: ""
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    onFileSelected() {
      console.log(this.$refs.csv.selectedFile);
      const file = this.$refs.csv.selectedFile;
      var reader = FileReader();
      this.table = reader.readAsText(file);
      EventBus.$emit("FileSend", this.table);
    }
  },
  mounted() {
    this.dismissCountDown = this.dismissSecs;
    EventBus.$on("inputCsv", valor => {
      this.items = valor;
      console.log(`Tipo do valor ${typeof valor}`);
    });
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
