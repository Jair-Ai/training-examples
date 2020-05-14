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
              :state="validateEmail(row.item.email)"
            />
            <b-form-invalid-feedback :state="validateEmail(row.item.email)">
              Coloque um e-mail valido.
            </b-form-invalid-feedback>
          </template>
          <template v-slot:cell(telefone)="row">
            <b-form-input
              @change="editedRow($event, row)"
              type="number"
              v-model="row.item.telefone"
              :state="validateTelefone(row.item.telefone)"
            />
            <b-form-invalid-feedback
              :state="validateTelefone(row.item.telefone)"
            >
              Coloque um Celular valido.
            </b-form-invalid-feedback>
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
import {
  fields,
  rowEmailValidator,
  rowNameValidator,
  dddList
} from "../../main";

export default {
  name: "WriteRegisters",
  data() {
    return {
      toTableCP: [{ Nome: "", email: "", telefone: "" }],
      blankRow: { Nome: "", email: "", telefone: "" },
      fieldsFromMain: fields,
      validDDD: false
    };
  },
  methods: {
    validateEmail(e) {
      return rowEmailValidator.isValidSync(e);
    },
    validateTelefone(e) {
      console.log(e.length);
      if (dddList.toString().includes(e.slice(0, 2)) && e.length === 11) {
        return true;
      } else {
        return false;
      }
    },
    validateName(e) {
      return rowNameValidator.isValidSync(e);
    },
    insertRow() {
      this.toTableCP.push({ Nome: "", email: "", telefone: "" });
    },
    deleteRow() {
      if (this.toTableCP.length > 1) {
        this.toTableCP.pop();
      }
    },
    editedRow(e, item) {
      console.log(this.toTableCP);
      console.log(item.field.key);
      console.log(item.index);
      let aKey = item.field.key;
      let aIndex = item.index;

      this.toTableCP[aIndex][aKey] = e;
    }
  }
};
</script>

<style></style>
