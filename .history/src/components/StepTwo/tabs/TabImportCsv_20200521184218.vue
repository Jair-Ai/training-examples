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
        striped
        hover
        :items="items"
        :fields="fields"
        small
        primary-key="a"
        :tbody-transition-props="transProps"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filters"
        :filterIncludedFields="filterOn"
        @filtered="onFiltered"
      ></b-table>
    </b-row>
  </b-container>
</template>

<script>
import { EventBus } from "../../../main";
import testeCsv from "../superComponents/testeCsv";

export default {
  name: "TabImportCsv",
  components: {
    testeCsv
  },
  props: {
    transProps: {},
    perPage: { default: 20, required: true },
    fields: { type: Array, required: true }
  },
  data() {
    return {
      items: [],
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
    rows() {
      if (this.filters <= 0) {
        return this.items.length;
      } else {
        return 1;
      }
    },
    fields_to_component() {
      return [this.fields[0].key, this.fields[1].key, this.fields[2].key];
    }
  },
  mounted() {
    EventBus.$on("inputCsv", valor => {
      this.items = valor;
      console.log(this.items);
    });
    // Set the initial number of items
    //this.rows = this.items.length;
  },
  methods: {
    onFileSelected() {
      console.log(this.$refs.csv.selectedFile);
      const file = this.$refs.csv.selectedFile;
      var reader = FileReader();
      this.table = reader.readAsText(file);
      EventBus.$emit("FileSend", this.table);
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
