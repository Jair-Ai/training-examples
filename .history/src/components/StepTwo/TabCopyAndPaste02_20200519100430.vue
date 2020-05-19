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

    <b-row md="12" cols="1" v-if="incorrects.length > 0">
      <div>
        <div class="mt-3" style="margin-bottom: 30px">
          <b-button-group size="xl">
            <b-button
              @click="change('corrects')"
              variant="outline-success"
              :pressed="show == 'corrects'"
            >
              Registros Corretos
              {{ corrects.length }}
            </b-button>
            <b-button
              @click="change('duplicates')"
              variant="outline-warning"
              :pressed="show == 'duplicates'"
              v-if="duplicates.length > 0"
            >
              Registros Duplicados
              {{ duplicates.length }}
            </b-button>

            <b-button
              @click="change('incorrects')"
              variant="outline-danger"
              :pressed="show == 'incorrects'"
            >
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
              <b-button :disabled="!filters" @click="filters = ''"
                >Limpar</b-button
              >
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
        <template
          v-if="(show == 'incorrects') | (show == 'duplicates')"
          v-slot:cell(Nome)="row"
        >
          <b-form-input
            @change="editedRow($event, row)"
            type="text"
            v-model="row.item.Nome"
          />
        </template>
        <template
          v-if="(show == 'incorrects') | (show == 'duplicates')"
          v-slot:cell(email)="row"
        >
          <b-form-input
            @change="editedRow($event, row)"
            type="email"
            v-model="row.item.email"
          />
        </template>
        <template
          v-if="(show == 'incorrects') | (show == 'duplicates')"
          v-slot:cell(telefone)="row"
        >
          <b-form-input
            @change="editedRow($event, row)"
            type="number"
            v-model="row.item.telefone"
          />
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import {
  emailValidator,
  emailValidatorNot,
  rowEmailValidator,
  takeDupl
} from "../../main";
import { get } from "lodash";
//TODO Corrigir a celula editada
export default {
  name: "TabCopyAndPast",
  data() {
    return {
      text: "",
      toTableCP: [],
      currentPage: 1,
      filters: null,
      filtersOn: [],
      corrects: {},
      incorrects: {},
      duplicates: {},
      loadedInput: {},
      row: {},
      show: "duplicates",
      showCorrects: true,
      validNames: ["nome", "nomes", "cliente", "clientes"],
      validEmails: ["e-mail", "email"],
      notCorrect: false,
      testConcat: [],
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
    rowColor() {
      console.log(this.rowColor);
      if (this.show == "corrects") {
        return "primary";
      } else if (this.show == "incorrects") {
        return "danger";
      } else {
        return "warning";
      }
    },
    firstRow() {
      return get(this, "sample.0");
    },
    congrats() {
      if (this.incorrects.length == 0 && this.corrects.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.fields[0].variant = this.rowColor;
  },
  mounted() {
    // Set the initial number of items
    this.rows = this.toTableCP.length;
  },
  methods: {
    editedRow(e, item) {
      let aKey = item.field.key;
      let aIndex = item.index;
      if (this.show == "incorrects") {
        this.incorrects[aIndex][aKey] = e;
      } else if (this.show == "duplicates") {
        this.duplicates[aIndex][aKey] = e;
      }
      this.testConcat = [
        ...this.corrects,
        ...this.incorrects,
        ...this.duplicates
      ];
      //this.loadedInput[aIndex][aKey] = e;
      let validReg = rowEmailValidator.isValidSync(e);
      if (validReg) {
        this.separateIncorrectsFromCorrects(this.testConcat);
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
      this.separateIncorrectsFromCorrects(objectToTable);
    },
    change(validator) {
      if (validator == "corrects") {
        this.toTableCP = this.corrects;
        this.show = "corrects";
      } else if (validator == "incorrects") {
        this.toTableCP = this.incorrects;
        this.show = "incorrects";
      } else {
        this.toTableCP = this.duplicates;
        this.show = "duplicates";
      }
    },
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
      //console.log("Agora vem o Json");
      //console.log(JSON.stringify(jsonteste));
      this.separateIncorrectsFromCorrects(this.loadedInput);
    },
    async separateIncorrectsFromCorrects(file) {
      this.incorrects = await emailValidatorNot(file);
      this.corrects = await emailValidator(file);
      let dupl = takeDupl(this.corrects, "email");
      this.corrects = dupl[0];
      this.duplicates = dupl[1];
      if (this.incorrects.length > 0) {
        this.show = "incorrects";
        this.toTableCP = this.incorrects;
        this.coloredIncorrects;
      } else {
        this.toTableCP = this.corrects;
        this.show = "corrects";
      }
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.rows = filteredItems.length;
      this.currentPage = 1;
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
