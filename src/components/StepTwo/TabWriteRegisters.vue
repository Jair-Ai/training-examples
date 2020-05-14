<template>
  <b-container fluid>
    <b-row>
      Window width: {{ windowWidth }}
      <p>Window width: {{ windowWidth }}</p>
    </b-row>
    <b-row align-v="center">
      <b-col cols="10">
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
  rowNameValidator,
  rowEmailValidator,
  dddList
} from "../../main";

export default {
  name: "WriteRegisters",
  data() {
    return {
      toTableCP: [{ Nome: "", email: "", telefone: "" }],
      blankRow: { Nome: "", email: "", telefone: "" },
      fieldsFromMain: fields,
      validDDD: false,
      windowWidth: 0,
      txt: ""
    };
  },
  computed: {
    mobile() {
      console.log(`Dentro do computed ${this.windowWidth}`);
      console.log(this.windowWidth >= 700);
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
      console.log(this.windowWidth);
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
      console.log(e.length);
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
