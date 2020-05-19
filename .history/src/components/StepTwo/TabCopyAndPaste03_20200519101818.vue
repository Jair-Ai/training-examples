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
        @input="readPasteText"
      ></textarea>
    </b-row>
    <SuperTable
      :fields="fields"
      :loadedInput="loadedInput"
      :notCorrect="notCorrect"
    ></SuperTable>
  </b-container>
</template>

<script>
import SuperTable from "./SuperTable";
import { fields } from "../../main";
export default {
  components: {
    SuperTable
  },
  data() {
    return {
      fields: fields,
      loadedInput: []
    };
  },

  methods: {
    readPasteText() {
      var clipRows = this.text.split("\n");
      for (let i = 0; i < clipRows.length; i++) {
        clipRows[i] = clipRows[i].split("\t");
      }
      this.headerValidator(clipRows, clipRows[0].length);
    },
    headerValidator(row, tam) {
      this.sample = row;
      if (tam === 3) {
        if (
          this.validNames.includes(row[0][0].toLowerCase()) &&
          this.validEmails.includes(row[0][1].toLowerCase())
        ) {
          this.print();
        } else {
          this.notCorrect = true;
        }
      } else {
        this.notCorrect = true;
      }
    },
    async print() {
      this.notCorrect = false;
      var jsonteste = [];
      for (let i = 1; i < this.sample.length; i++) {
        var item = {};

        for (let j = 0; j < 3; j++) {
          item[this.fields[j].label] = this.sample[i][j];
        }
        jsonteste.push(item);
      }

      this.loadedInput = jsonteste;
    }
  }
};
</script>

<style></style>
