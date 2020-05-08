<template>
  <b-container fluid>
    <b-row>
      <textarea
        class="form-control"
        id="textarea"
        v-model="text"
        placeholder="É simples, é só copiar do excell e colar aqui!"
        rows="3"
        max-rows="6"
        @input="print"
      ></textarea>
    </b-row>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-input
          v-model="filters"
          type="search"
          id="filterInput"
          placeholder="Type to Search"
        ></b-form-input>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-pagination
          v-if="rows >= perPage"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        v-if="tableone"
        striped
        hover
        :items="toTableCP"
        small
        primary-key="a"
        :tbody-transition-props="transProps"
        :per-page="perPage"
        :current-page="currentPage"
      ></b-table>
      <b-button v-if="tableone" type="submit" variant="primary"
        >Salvar e avançar</b-button
      >
    </b-row>
  </b-container>
</template>

<script>
import { emailValidator } from "../main";
export default {
  name: "TabCopyAndPast",
  data() {
    return {
      text: "",
      toTableC: [],
      perPage: 20,
      currentPage: 1,
      items: [],
      tableone: false,
      filters: null,
      filtersOn: [],
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
    };
  },
  props: {
    transProps: {}
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    print() {
      var jsonteste = [];
      console.log(this.text);
      var clipRows = this.text.split("\n");
      for (let i = 0; i < clipRows.length; i++) {
        clipRows[i] = clipRows[i].split("\t");
      }
      console.log(clipRows[0].length);
      console.log(clipRows);
      this.fields = clipRows[0];
      for (let i = 1; i < clipRows.length; i++) {
        var item = {};

        for (let j = 0; j < clipRows[0].length; j++) {
          item[clipRows[0][j]] = clipRows[i][j];
        }
        console.log(item);
        jsonteste.push(item);
      }

      console.log("Agora vem o Json");
      this.toTableCP = jsonteste;
      console.log(JSON.stringify(jsonteste));
      this.tableone = true;
      emailValidator(this.toTable);
    }
  }
};
</script>

<style></style>
