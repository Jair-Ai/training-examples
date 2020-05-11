<template>
  <b-container fluid>
    <b-row md="12" cols="1">
      <b-alert show variant="warning">A ordem tem que ser Nome - Email - Telefone</b-alert>
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
        @input="print"
      ></textarea>
    </b-row>
    <b-row md="12" cols="1">
      <div>
        <div class="mt-3" style="margin-bottom: 30px">
          <b-button-group size="sm" v-if="toTableCP">
            <b-button
              @click="change(true)"
              variant="success"
              :pressed="showCorrects"
            >Registros Corretos</b-button>
            <b-button
              @click="change(false)"
              variant="danger"
              :pressed="!showCorrects"
            >Registros Incorretos</b-button>
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
      ></b-table>
    </b-row>
  </b-container>
</template>

<script>
import { emailValidator, emailValidatorNot } from "../../main";
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
      show: false,
      showCorrects: true,
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
      if (this.filters <= 0) {
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
    showIncorrects() {
      this.toTableCP = this.incorrects;
    },
    async print() {
      var jsonteste = [];
      var clipRows = this.text.split("\n");
      for (let i = 0; i < clipRows.length; i++) {
        clipRows[i] = clipRows[i].split("\t");
      }

      this.fields = clipRows[0];
      for (let i = 1; i < clipRows.length; i++) {
        var item = {};

        for (let j = 0; j < clipRows[0].length; j++) {
          item[clipRows[0][j]] = clipRows[i][j];
        }
        jsonteste.push(item);
      }
      console.log(jsonteste);
      //console.log("Agora vem o Json");
      //console.log(JSON.stringify(jsonteste));
      this.tableone = true;
      this.corrects = await emailValidator(jsonteste);
      this.incorrects = await emailValidatorNot(jsonteste);
      this.toTableCP = this.corrects;
      console.log(this.incorrects);
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
