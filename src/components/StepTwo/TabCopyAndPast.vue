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
        @input="print"
      ></textarea>
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
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Digite aqui para buscar"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
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
        :items="toTableCP"
        :fields="fields"
        small
        primary-key="a"
        :tbody-transition-props="transProps"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        @filtered="onFiltered"
      >
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
      toTableCP: [],
      perPage: 20,
      currentPage: 1,
      tableone: false,
      filter: null,
      filtersOn: [],
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
        }
      ]
    };
  },
  props: {
    transProps: {}
  },
  computed: {
    rows() {
      if (this.filter <= 0) {
        return this.toTableCP.length;
      } else {
        return 1;
      }
    }
  },
  mounted() {
    // Set the initial number of items
    this.rows = this.toTableCP.length;
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
      this.rows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style></style>
