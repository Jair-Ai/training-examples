<template>
  <b-container fluid>
    <b-row md="12" cols="1">
      <textarea
        class="form-control"
        style="margin-bottom: 50px; margin-top: 20px;"
        id="textarea"
        v-model="text"
        placeholder="É simples, é só copiar do excell e colar aqui!"
        rows="3"
        max-rows="6"
        @input="readPasteText"
      ></textarea>
    </b-row>
    <b-row md="12" cols="1" v-if="notCorrect">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="Escolha as colunas correspondentes ao lado"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            id="input-name"
            label-cols-sm="3"
            label-align-sm="right"
            label="Nome"
            label-for="select_name"
            description="Escolha aqui a coluna correspondente ao nome"
          >
            <b-form-select
              id="select_name"
              v-model="map.name"
              :options="firstRow"
              required
              placeholder="familiar"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-email"
            label-cols-sm="3"
            label-align-sm="right"
            label="Email"
            label-for="select_email"
            description="Escolha aqui qual coluna corresponde ao email"
          >
            <b-form-select
              id="select_email"
              v-model="map.email"
              :options="firstRow"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-telefone"
            label-cols-sm="3"
            label-align-sm="right"
            label="Telefone"
            label-for="select_telefone"
          >
            <b-form-select
              id="select_telefone"
              v-model="map.telefone"
              :options="firstRow"
            ></b-form-select>
          </b-form-group>

          <div class="botoes">
            <div style="float: right;">
              <b-button variant="outline-primary" @click="checkMapPosition"
                >Carregar</b-button
              >
            </div>
          </div>
        </b-form-group>
      </b-card>
    </b-row>
    <b-row>
      <SuperTable></SuperTable>
    </b-row>
  </b-container>
</template>

<script>
import { get } from "lodash";
import SuperTable from "./SuperTable";
import { perPage, fields } from "../../main";
//TODO Corrigir a celula editada
export default {
  name: "TabCopyAndPast",
  components: {
    SuperTable
  },
  data() {
    return {
      text: "",
      toTableCP: [],
      loadedInput: {},
      row: {},
      showCorrects: true,
      validNames: ["nome", "nomes", "cliente", "clientes"],
      validEmails: ["e-mail", "email"],
      notCorrect: false,
      map: {},
      sample: {}
    };
  },
  props: {
    transProps: {},
    perPage: { default: 20, required: true },
    fields: { type: Array, required: true }
  },
  computed: {
    firstRow() {
      return get(this, "sample.0");
    }
  },
  methods: {
    readPasteText() {
      var clipRows = this.text.split("\n");
      for (let i = 0; i < clipRows.length; i++) {
        clipRows[i] = clipRows[i].split("\t");
      }
      this.headerValidator(clipRows, clipRows[0].length);
    },
    async print() {
      this.notCorrect = false;
      var jsonteste = [];
      for (let i = 1; i < this.sample.length; i++) {
        var item = {};

        for (let j = 0; j < 3; j++) {
          item[this.fields[j].label] = this.sample[i][j];
        }
        jsonteste.push(item);
      }

      this.loadedInput = jsonteste;
      console.log(this.loadedInput);
      //console.log("Agora vem o Json");
      //console.log(JSON.stringify(jsonteste));
    },
    headerValidator(row, tam) {
      this.sample = row;
      if (tam === 3) {
        if (
          this.validNames.includes(row[0][0].toLowerCase()) &&
          this.validEmails.includes(row[0][1].toLowerCase())
        ) {
          this.print();
        } else {
          this.notCorrect = true;
        }
      } else {
        this.notCorrect = true;
      }
    },
    checkMapPosition() {
      let colNome = this.sample[0].indexOf(this.map.name);
      let colEmail = this.sample[0].indexOf(this.map.email);
      let colTelefone = this.sample[0].indexOf(this.map.telefone);
      var objectToTable = [];
      for (let i = 0; i < this.sample.length; i++) {
        var item = {};
        item[this.fields[0].key] = this.sample[i][colNome];
        item[this.fields[1].key] = this.sample[i][colEmail];
        item[this.fields[2].key] = this.sample[i][colTelefone];
        objectToTable.push(item);
      }
      this.loadedInput = objectToTable;
      console.log(this.loadedInput);
    }
  }
};
</script>

<style scoped>
.botoes {
  display: inline;
  overflow: auto;
  white-space: nowrap;
  margin: 0px auto;
}
</style>
