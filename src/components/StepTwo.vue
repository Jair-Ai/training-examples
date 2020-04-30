<template>
  <b-container float-center>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="info"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      Você ja cadastrou sua pesquisa, agora precisa cadastrar clientes, afinal
      de que adiantaria uma pesquisa sem clientes! {{ dismissCountDown }}
    </b-alert>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Copie e Cole"><p>I'm the second tab</p></b-tab>
        <b-tab title="Import Csv" active>
          <div class="separate">
            <b-alert show variant="warning"
              >A ordem tem que ser Nome - Email - Telefone</b-alert
            >
            <b-form-file
              v-if="quero"
              class="separate"
              @change="onFileSelected"
              accept=".csv"
              ref="csv"
            ></b-form-file>

            <testeCsv
              v-model="csv"
              url="/hello"
              :map-fields="['Nome', 'E-mail', 'Telefone']"
            >
              <template slot="hasHeaders" slot-scope="{ headers, toggle }">
                <label>
                  <input
                    type="checkbox"
                    id="hasHeaders"
                    :value="headers"
                    @change="toggle"
                  />
                  Headers?
                </label>
              </template>

              <template slot="error">
                File type is invalid
              </template>

              <template slot="thead">
                <tr>
                  <th>My Fields</th>
                  <th>Column</th>
                </tr>
              </template>

              <template slot="next" slot-scope="{ load }">
                <button @click.prevent="load">load!</button>
              </template>

              <template slot="submit" slot-scope="{ submit }">
                <b-button variant="primary" @click.prevent="submit"
                  >send!</b-button
                >
              </template>
            </testeCsv>

            <b-table striped hover :items="items" :fields="fields"></b-table>
          </div>
        </b-tab>
        <b-tab title="Outra Forma" disabled><p>I'm a disabled tab!</p></b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<script>
import { EventBus } from "../main";
import testeCsv from "./testeCsv";

export default {
  name: "StepTwo",
  components: {
    testeCsv
  },
  data() {
    return {
      dismissSecs: 7,
      dismissCountDown: 0,
      items: [],
      quero: false,
      fields: [
        {
          key: "Nome",
          sortable: true
        },
        {
          key: "E-mail",
          sortable: false
        },
        {
          key: "Telefone",
          label: "telefone",
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: "danger"
        }
      ]
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    onFileSelected() {
      console.log(this.$refs.csv.selectedFile);
      const file = this.$refs.csv.selectedFile;
      var reader = FileReader();
      this.table = reader.readAsText(file);
      EventBus.$emit("FileSend", this.table);
    }
  },
  mounted() {
    this.dismissCountDown = this.dismissSecs;
  }
};
</script>

<style>
.separate {
  padding: 30px;

}
</style>
