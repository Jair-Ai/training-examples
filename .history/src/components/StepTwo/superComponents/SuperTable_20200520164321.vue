<template>
  <b-container fluid>
    <b-row
      md="12"
      cols="1"
      v-if="incorrects.length > 0 || duplicates.length > 0"
    >
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
              v-if="duplicates.length > 0"
              @click="change('duplicates')"
              variant="outline-warning"
              :pressed="show == 'duplicates'"
            >
              Registros Duplicados
              {{ duplicates.length }}
            </b-button>

            <b-button
              v-if="incorrects.length > 0"
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
          v-if="rows >= 1 && showFilter"
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
              <b-button @click="filters = ''">Limpar</b-button>
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
        id="table-transition-example"
        :head-row-variant="rowColor"
        :fields="fields"
        striped
        small
        primary-key="Nome"
        :tbody-transition-props="transProps"
        :items="toTableCP"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filters"
        :filterIncludedFields="filterOn"
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
        <b-table-column custom-key="Ações">
          <button class="button is-small is-light" @click="edit(props.row)">
            <b-icon icon="edit" size="is-small"></b-icon>
          </button>
        </b-table-column>
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
} from "../../../main";
import { get } from "lodash";
// TODO: ADD DELETE ON SIDE OF LAST COL, AS COL
export default {
  name: "SuperTable",
  data() {
    return {
      toTableCP: [],
      transProps: {
        // Transition name
        name: "flip-list"
      },
      currentPage: 1,
      showFilter: false,
      filters: null,
      filtersOn: [],
      corrects: {},
      incorrects: {},
      duplicates: {},
      row: {},
      show: "",
      showCorrects: true,
      validNames: ["nome", "nomes", "cliente", "clientes"],
      validEmails: ["e-mail", "email"],
      testConcat: [],
      map: {},
      sample: {},
      rowColor: "warning"
    };
  },
  props: {
    perPage: { default: 20, required: true },
    fields: { type: Array, required: true },
    loadedInput: {}
  },
  computed: {
    firstRow() {
      return get(this, "sample.0");
    },
    rows() {
      if (this.filters <= 0) {
        return this.toTableCP.length;
      } else {
        return 1;
      }
    }
  },
  watch: {
    loadedInput: function() {
      this.separateIncorrectsFromCorrects(this.loadedInput);
    },
    show: function() {
      if (this.show == "corrects") {
        this.rowColor = "success";
      } else if (this.show == "incorrects") {
        this.rowColor = "danger";
      } else {
        this.rowColor = "warning";
      }
    }
  },
  mounted() {
    // Set the initial number of items

    this.rows = this.toTableCP.length;
    if (this.incorrects.length > 0) {
      this.show = "incorrects";
    } else if (this.duplicates.length > 0) {
      this.show = "duplicates";
    } else {
      this.show = "corrects";
    }
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
        //this.fields.Nome.variant = "danger";
        this.toTableCP = this.incorrects;

        this.show = "incorrects";
      } else {
        this.toTableCP = this.duplicates;
        this.show = "duplicates";
      }
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
      } else if (this.duplicates.length > 0) {
        console.log(this.incorrects);
        this.toTableCP = this.duplicates;
        this.show = "duplicates";
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

<style scooped>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>
