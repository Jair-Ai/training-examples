<template>
  <b-container fluid>
    <b-row md="12" cols="1">
      <b-alert :show="!congrats" fade variant="warning">
        A ordem tem que ser Nome - Email - Telefone
        <b-icon
          animation="fade"
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
            <b-form-select id="select_email" v-model="map.email" :options="firstRow" required></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-telefone"
            label-cols-sm="3"
            label-align-sm="right"
            label="Telefone"
            label-for="select_telefone"
          >
            <b-form-select id="select_telefone" v-model="map.telefone" :options="firstRow"></b-form-select>
          </b-form-group>
        </b-form-group>
      </b-card>
    </b-row>
    <b-row md="12" cols="1" v-if="incorrects.length > 0">
      <div>
        <div class="mt-3" style="margin-bottom: 30px">
          <b-button-group size="xl">
            <b-button @click="change(true)" variant="outline-success" :pressed="showCorrects">
              Registros Corretos
              {{ corrects.length }}
            </b-button>

            <b-button @click="change(false)" variant="outline-danger" :pressed="!showCorrects">
              Registros Incorretos
              {{ incorrects.length }}
            </b-button>
          </b-button-group>
        </div>
      </div>
    </b-row>
    <b-row md="12" cols="2">
      <b-col>
        <b-form-group
          v-if="rows >= 1"
          inline
          label="Filtro"
          label-cols-sm="1"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filters"
              type="search"
              id="filterInput"
              placeholder="Digite aqui para buscar"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filters" @click="filters = ''">Limpar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-pagination
          v-if="rows >= perPage"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        id="my-table"
        striped
        hover
        :items="toTableCP"
        :fields="fields"
        small
        primary-key="a"
        :tbody-transition-props="transProps"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filters"
        :filterIncludedFields="filtersOn"
        @filtered="onFiltered"
      >
        <template v-if="!showCorrects && incorrects.length > 0" v-slot:cell(Nome)="row">
          <b-form-input type="text" v-model="row.item.Nome" />
        </template>
        <template v-if="!showCorrects && incorrects.length > 0" v-slot:cell(email)="row">
          <b-form-input @change="editedRow($event, row)" type="email" v-model="row.item.email" />
        </template>
        <template v-if="!showCorrects && incorrects.length > 0" v-slot:cell(telefone)="row">
          <b-form-input
            @change.prevent="print($event, row)"
            type="number"
            v-model="row.item.Telefone"
          />
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { emailValidator, emailValidatorNot } from "../../main";
import { get } from "lodash";
import * as Yup from "yup";

export default {
  name: "TabCopyAndPast",
  data() {
    return {
      text: "",
      toTableCP: [],
      perPage: 20,
      currentPage: 1,
      tableone: false,
      filters: null,
      filtersOn: [],
      corrects: {},
      incorrects: {},
      loadedInput: {},
      row: {},
      show: false,
      showCorrects: true,
      validNames: ["nome", "nomes", "cliente", "clientes"],
      validEmails: ["e-mail", "email"],
      notCorrect: false,
      map: {},
      sample: {},
      fields: [
        {
          key: "Nome",
          label: "Nome",
          sortable: true
        },
        {
          key: "email",
          label: "email",
          sortable: true
        },
        {
          key: "Telefone",
          label: "Telefone",
          sortable: true
        }
      ]
    };
  },
  props: {
    transProps: {}
  },
  computed: {
    rows() {
      if (this.filters <= 0) {
        return this.toTableCP.length;
      } else {
        return 1;
      }
    },
    firstRow() {
      console.log("Esta rodando first row");
      return get(this, "sample.0");
    },
    emailState() {
      return Yup.string().emailValidator();
    },
    congrats() {
      if (this.incorrects.length == 0 && this.corrects.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    // Set the initial number of items
    this.rows = this.toTableCP.length;
  },

  methods: {
    editedRow(e, item) {
      console.log(`Este é o e = ${e}`);
      console.log(item.item.field);
      console.log(this.loadedInput[0].email);
      this.loadedInput[0].email = e;
      this.separateIncorrectsFromCorrects(this.loadedInput);
    },
    change(validator) {
      if (validator) {
        this.toTableCP = this.corrects;
        this.$root.$emit("bv::refresh::table", "my-table");
        this.showCorrects = true;
      } else {
        this.toTableCP = this.incorrects;
        this.showCorrects = false;
      }
    },
    readPasteText() {
      var clipRows = this.text.split("\n");
      for (let i = 0; i < clipRows.length; i++) {
        clipRows[i] = clipRows[i].split("\t");
      }
      console.log();
      this.headerValidator(clipRows, clipRows[0].length);
    },
    async print() {
      console.log("Entrou no print");
      console.log(this.row);
      this.notCorrect = false;
      var jsonteste = [];
      for (let i = 1; i < this.sample.length; i++) {
        var item = {};

        for (let j = 0; j < 3; j++) {
          item[this.fields[j].label] = this.sample[i][j];
        }
        jsonteste.push(item);
      }
      console.log(jsonteste);
      this.loadedInput = jsonteste;
      //console.log("Agora vem o Json");
      //console.log(JSON.stringify(jsonteste));
      this.separateIncorrectsFromCorrects(this.loadedInput);
    },
    async separateIncorrectsFromCorrects(file) {
      this.tableone = true;
      this.corrects = await emailValidator(file);
      this.incorrects = await emailValidatorNot(file);
      if (this.incorrects.length > 0) {
        this.showCorrects = false;
        this.toTableCP = this.incorrects;
      } else {
        this.toTableCP = this.corrects;
      }
      console.log(this.incorrects);
    },
    headerValidator(row, tam) {
      this.sample = row;
      if (tam === 3) {
        console.log(row[0]);
        console.log(this.validNames.includes(row[0][0].toLowerCase()));
        console.log(this.validEmails.includes(row[0][1].toLowerCase()));
        if (
          this.validNames.includes(row[0][0].toLowerCase()) &&
          this.validEmails.includes(row[0][1].toLowerCase())
        ) {
          console.log("Tem que rodar o print");
          this.print();
        } else {
          this.notCorrect = true;
        }
      } else {
        this.notCorrect = true;
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.rows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style></style>
