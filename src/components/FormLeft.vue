<template>
  <b-container fluid="xl">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" float-right>
      <b-form-group
        id="input-group-1"
        label="Nome da campanha"
        label-for="input-1"
        description="Campo obrigatório"
      >
        <b-form-input
          id="input-1"
          v-model="form.campaign"
          @keyup="generico($event, 'campaign')"
          type="text"
          required
          placeholder="Pesquisa de satisfação"
          teste
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Nome da empresa ou produto"
        label-for="input-2"
        description="Campo obrigatório"
      >
        <b-form-input
          id="input-2"
          v-model="form.company"
          @keyup="generico($event, 'company')"
          type="text"
          required
          placeholder="Minha empresa"
          teste
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Recomendar para"
        label-for="input-3"
        description="Escolha para quem o cliente pode recomendar"
      >
        <b-form-input
          id="input-3"
          v-model="form.ask"
          @keyup="generico($event, 'ask')"
          required
          placeholder="Amigo"
          teste
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Pergunta ou comentário"
        label-for="input-4"
        description="Os clientes responderão a esta pergunta com um comentário"
      >
        <b-form-select
          id="input-4"
          v-model="form.choice"
          @change="generico($event, 'choice')"
          :options="comment"
          required
          placeholder="Amigo"
          teste
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-5"
        label="Logo da campanha"
        label-for="input-5"
        description="Se a campanha não tiver logo, será utilizada a logo da empresa."
      >
        <b-form-file
          id="input-5"
          v-model="form.file"
          :state="Boolean(form.file)"
          @change="onFileSelected($event, 'file')"
          placeholder="Escolha ou arraste uma imagem"
          required
          teste
          v-if="avancada"
        ></b-form-file>
      </b-form-group>
      <div class="test">
        <div style="float: left;">
          <b-button type="reset" variant="danger">Limpar</b-button>
        </div>
        <div class="float-right">
          <b-button type="submit" variant="primary">Salvar e avançar</b-button>
        </div>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import { EventBus } from "../main";

export default {
  name: "form-left",
  data() {
    return {
      show: true,
      avancada: true,
      form: {
        campaign: "",
        company: "",
        ask: "",
        file: null,
        choice: null
      },
      comment: [
        { text: "Escolha um", value: null },
        "Qual o principal motivo para a sua nota?",
        "O que motivou sua nota?",
        "O que poderíamos fazer para melhorar?",
        "Por que?"
      ]
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },

    generico(event, atribute) {
      console.log(event);
      if (atribute == "choice") EventBus.$emit("DataSend", [atribute, event]);
      else EventBus.$emit("DataSend", [atribute, event.target.value]);
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
      console.log(this.url);
      EventBus.$emit("FileSend", this.url);
    },

    onReset(evt) {
      evt.preventDefaut();
      //Reset form values
      (this.form.campaign = ""),
        (this.form.company = ""),
        (this.form.ask = ""),
        (this.form.file = ""),
        (this.form.choice = ""),
        (this.show = false),
        // Trick to reset/clear native browser form validation state
        (this.show = false),
        this.$nextTick(() => {
          this.show = true;
        });
    }
  }
};
</script>

<style>
#submitBT {
  text-align: right;
  margin-right: 0;
}

.test {
  display: inline;
  overflow: auto;
  white-space: nowrap;
  margin: 0px auto;
}
</style>
