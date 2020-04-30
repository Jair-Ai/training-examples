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
        <b-tab title="Copie e Cole" active>
          <div class="separate">
            <b-alert show variant="warning"
              >A ordem tem que ser Nome - Email - Telefone</b-alert
            >
            <b-form-file
              class="separate"
              @change="OnFileSelected($event, 'file')"
              accept=".csv"
 
            ></b-form-file>

            <b-table
              striped
              hover
              :items="items"
              :fields="fields"
            ></b-table>
          </div>
        </b-tab>
        <b-tab title="Importe CSV"><p>I'm the second tab</p></b-tab>
        <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<script>
import { EventBus } from "../main";

export default {
  name: "StepTwo",

  data() {
    return {
      dismissSecs: 7,
      dismissCountDown: 0,
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

    onFileSelected(event) {
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
      console.log(this.url);
      EventBus.$emit("FileSend", this.url);
    }
  },
  mounted() {
    this.dismissCountDown = this.dismissSecs;
  }
};
</script>



<style>
.separate { padding: 30px; widght: 50%;}
</style>
