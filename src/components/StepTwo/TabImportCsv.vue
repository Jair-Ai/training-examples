<template>
  <b-container fluid>
    <b-row md="12" cols="1">
      <b-alert show variant="warning">A ordem tem que ser Nome - Email - Telefone</b-alert>
    </b-row>
    <b-row>
      <b-form-file v-if="quero" @change="onFileSelected" accept=".csv" ref="csv"></b-form-file>
    </b-row>
    <b-row md="12" cols="1">
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
          <b-button variant="primary" @click.prevent="submit">Enviar!</b-button>
        </template>
      </testeCsv>
    </b-row>
    <b-row md="12" cols="1">
      <b-pagination
        v-if="rows >= perPage"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
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
      ></b-table>
    </b-row>
  </b-container>
</template>

<script>
import { EventBus } from "../../main";
import testeCsv from "./testeCsv";

export default {
  name: "TabImportCsv",
  components: {
    testeCsv
  },
  data() {
    return {
      items: [],
      quero: false,
      csv: "",
      text: "",
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
  mounted() {
    EventBus.$on("inputCsv", valor => {
      this.items = valor;
      console.log(`Tipo do valor ${typeof valor}`);
    });
  },
  computed: {
    rows() {
      return this.items.length;
    }
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
