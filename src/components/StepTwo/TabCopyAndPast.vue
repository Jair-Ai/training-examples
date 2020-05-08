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
      <b-col sm="8" md="5" class="my-2">
        <b-form-group
          inline
          label="Filtro"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-2 mr-sm-2 mb-sm-0"
          label-for="filterInput"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Digite aqui para buscar"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="4" md="7" class="my-1">
        <b-pagination
          v-if="rows >= perPage"
          v-model="currentPage"
          :total-rows="totalRows"
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
        v-if="tableone"
        striped
        hover
        :items="toTableCP"
        small
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        @filtered="onFiltered"
      >
        <template v-slot:head(Nome)="data">
          <span class="text-info">{{ data.label.toUpperCase() }}</span>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { emailValidator } from "../../main";
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
      filter: null,
      filtersOn: [],
      totalRows: 1,
      fields: [
        {
          key: "Nome",
          label: "Nome",
          sortable: true
        },
        {
          key: "E-mail",
          label: "E-mail",
          sortable: true
        },
        {
          key: "Telefone",
          label: "Telefone",
          sortable: true
          // Variant applies to the whole column, including the header and footer
          //variant: "danger"
        }
      ]
    };
  },
  props: {
    transProps: {}
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
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
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style></style>
