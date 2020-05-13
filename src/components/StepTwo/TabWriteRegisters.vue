<template>
  <b-container fluid>
    <b-row align-v="center">
      <b-col cols="10">
        <b-table
          class="mb-3"
          id="my-table"
          striped
          hover
          :items="toTableCP"
          :fields="fieldsFromMain"
          small
          primary-key="a"
        >
          <template v-slot:cell(Nome)="row">
            <b-form-input type="text" v-model="row.item.Nome" />
          </template>
          <template v-slot:cell(email)="row">
            <b-form-input
              @change="editedRow($event, row)"
              type="email"
              v-model="row.item.email"
            />
          </template>
          <template v-slot:cell(telefone)="row">
            <b-form-input
              @change="editedRow($event, row)"
              type="number"
              v-model="row.item.telefone"
            />
          </template>
        </b-table>
      </b-col>
      <b-col>
        <b-button @click="insertRow" variant="outline-success" class="mb-0">
          <b-icon icon="plus" font-scale="2" aria-hidden="true"> </b-icon>ADD
        </b-button>
      </b-col>
      <b-col>
        <b-button @click="deleteRow" variant="outline-danger" class="mb-0">
          <b-icon icon="dash" font-scale="2"> </b-icon>
          DEL
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { fields } from "../../main";

export default {
  name: "WriteRegisters",
  data() {
    return {
      toTableCP: [{ Nome: "", email: "", telefone: "" }],
      blankRow: { Nome: "", email: "", telefone: "" },
      fieldsFromMain: fields,
      loadedInput: {}
    };
  },

  methods: {
    insertRow() {
      this.toTableCP.push({ Nome: "", email: "", telefone: "" });
      console.log(this.toTableCP);
    },
    deleteRow() {
      if (this.toTableCP.length > 1) {
        this.toTableCP.pop();
      }
    },
    editedRow(e, item) {
      console.log(`Este é o e = ${e} `);
      console.log(item);
      let aKey = item.field.key;
      let aIndex = item.index;
      console.log(this.loadedInput[0][aKey]);

      this.loadedInput[aIndex][aKey] = e;
      this.separateIncorrectsFromCorrects(this.loadedInput);
    }
  }
};
</script>

<style></style>
