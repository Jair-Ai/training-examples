<template>
  <b-container fluid>
    <b-row>
      <b-form-file
        v-if="quero"
        @change="onFileSelected"
        accept=".csv"
        ref="csv"
      ></b-form-file>
    </b-row>
    <b-row md="12" cols="1">
      <testeCsv v-model="csv" :map-fields="fields_to_component" url="teste">
        <template slot="hasHeaders" slot-scope="{ headers, toggle }">
          <label>
            <input
              type="checkbox"
              id="hasHeaders"
              :value="headers"
              @change="toggle"
            />
            O Arquivo contém cabeçalho?
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
          <b-button variant="primary" @click.prevent="submit">Enviar!</b-button>
        </template>
      </testeCsv>
    </b-row>
    <b-row md="12" cols="2">
      <b-col>
        <b-form-group
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
        :head-row-variant="rowColor"
        :items="toTableCP"
        :fields="fields"
        small
        primary-key="a"
        :tbody-transition-props="transProps"
        :per-page="perPage"
        :current-page="currentPage"
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
        <template
          v-if="(show == 'incorrects') | (show == 'duplicates')"
          v-slot:cell(Acoes)="row"
        >
          <b-button
            class="delete"
            variant="outline-danger"
            @click="deleteRow(row)"
            v-model="row.item"
          >
            <b-icon-trash small></b-icon-trash>
          </b-button>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { EventBus } from "../../../main";
import testeCsv from "../superComponents/testeCsv";
import { tableManager } from "./../../../mixins/tableSeparatorMixing";

export default {
  mixins: [tableManager],
  name: "TabImportCsv",
  components: {
    testeCsv
  },
  data() {
    return {
      quero: false,
      csv: "",
      text: "",
      currentPage: 1,
      everythingOK: true,
      filters: null,
      filtersOn: []
    };
  },
  computed: {
    fields_to_component() {
      return [this.fields[0].key, this.fields[1].key, this.fields[2].key];
    }
  },
  mounted() {
    EventBus.$on("inputCsv", valor => {
      this.loadedInput = valor;
      console.log(this.items);
      this.separateIncorrectsFromCorrects(this.loadedInput);
    });
  },
  methods: {
    onFileSelected() {
      console.log(this.$refs.csv.selectedFile);
      const file = this.$refs.csv.selectedFile;
      var reader = FileReader();
      this.table = reader.readAsText(file);
      EventBus.$emit("FileSend", this.table);
    }
  }
};
</script>

<style></style>
