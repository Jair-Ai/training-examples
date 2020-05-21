<template>
  <b-container fluid>
    <b-row align-v="center">
      <b-col cols="12">
        <b-table
          :stacked="!mobile"
          id="my-table"
          striped
          hover
          :items="toTableCP"
          :fields="fieldsFromMain"
          small
          primary-key="a"
        >
          <template v-slot:cell(Nome)="row">
            <b-form-input
              type="text"
              v-model="row.item.Nome"
              :state="validateName(row.item.Nome)"
            />
            <b-form-invalid-feedback :state="validateName(row.item.Nome)">
              Coloque um nome valido.
            </b-form-invalid-feedback>
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
          <template
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
        
        <template
          v-slot:cell(Acoes)="row"
        >
          <b-button
            variant="outline-danger"
            @click="addRow(row)"
            v-model="row.item"
          >
            <b-icon-plus small></b-icon-plus>
          </b-button>
        </template>
              
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  fields,
  rowNameValidator,
  rowEmailValidator,
  dddList
} from "../../../main";

export default {
  name: "WriteRegisters",
  data() {
    return {
      toTableCP: [{ Nome: "", email: "", telefone: "" }],
      blankRow: { Nome: "", email: "", telefone: "" },
      fieldsFromMain: fields,
      validDDD: false,
      windowWidth: window.innerWidth,
      txt: ""
    };
  },
  props: {
    perPage: { default: 20, required: true }
  },
  computed: {
    mobile() {
      return this.windowWidth >= 700;
    }
  },
  watch: {
    windowHeight(newWidth, oldWidth) {
      this.txt = `it changed to ${newWidth} from ${oldWidth}`;
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  onResize() {
    this.windowWidth = window.innerWidth;
  },
  methods: {
    validateEmail(e) {
      return rowEmailValidator.isValidSync(e);
    },
    validateTelefone(e) {
      if (dddList.toString().includes(e.slice(0, 2)) && e.length === 11) {
        return true;
      } else {
        return false;
      }
    },
    validateName(e) {
      if (rowNameValidator.isValidSync(e) && e.length > 3) {
        return true;
      } else {
        return false;
      }
    },
    insertRow() {
      this.toTableCP.push({ Nome: "", email: "", telefone: "" });
      this.mobile = !this.mobile;
    },
    editedRow(e, item) {
      let aKey = item.field.key;
      let aIndex = item.index;
      this.toTableCP[aIndex][aKey] = e;
    },
    deleteRow(event) {
      if (this.toTableCP.length > 1) {
        console.log(event);
        this.toTableCP.splice(event.index, 1);
      }
    },
    addRow(event) {
        this.toTableCP.splice(event.index, 0, this.blankRow);
      }
    },
};
</script>

<style></style>
