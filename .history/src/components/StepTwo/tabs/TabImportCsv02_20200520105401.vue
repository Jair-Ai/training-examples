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
    <b-row v-show="runTable">
      <SuperTable
        :perPage="perPage"
        :fields="fields"
        :loadedInput="items"
      ></SuperTable>
    </b-row>
  </b-container>
</template>

<script>
import { perPage, fields } from "../../../main";
import { EventBus } from "../../../main";
import SuperTable from "../superComponents/SuperTable";
export default {
  name: "TabImportCsv03",
  components: {
    SuperTable
  },
  data() {
    return {
      items: [],
      quero: false,
      csv: "",
      text: "",
      everythingOK: true,
      perPage: perPage,
      fields: fields
    };
  },
  mounted() {
    EventBus.$on("inputCsv", valor => {
      this.items = valor;
      console.log(this.items);
    });
    // Set the initial number of items
    this.rows = this.items.length;
  }
};
</script>

<style></style>
