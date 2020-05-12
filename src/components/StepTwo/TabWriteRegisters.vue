<template>
  <b-container>
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
        <template
          v-if="!showCorrects && incorrects.length > 0"
          v-slot:cell(telefone)="row"
        >
          <b-form-input
            @change.prevent="print($event, row)"
            type="number"
            v-model="row.item.Telefone"
          />
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { fields } from "../../main";

export default {
  name: "WriteRegisters",
  data() {
    return {
        toTableCP: [
            {Nome: '', Email: '', Telefone: ''}
        ],
        blankRow: {}
        }
    },
    
    methods: {
        insertRow() {
            this.toTableCP.push(this.blankrow)
        },
        deleteRow() {
            this.toTableCp.pop()
        }
    }
  }
};

</script>

<style></style>
