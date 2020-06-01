<template>
  <b-container float-center>
    <h4 style="text-align: center">
      Aqui voce escolherá quando enviar sua pesquisa.
    </h4>

    <hr />
    <div class="text-center">
      <b-button-group>
        <b-button
          variant="outline-primary"
          :pressed="!dataform"
          @click="dataform = false"
          active
          >Enviar Agora</b-button
        >
        <b-button
          variant="outline-primary"
          @click="dataform = true"
          :pressed="dataform"
          >Escolher Data e Hora</b-button
        >
      </b-button-group>
    </div>
    <br />
    <b-row float-center v-if="dataform">
      <b-col align-self="center">
        <div class="text-center">
          <label for="startDate" slot="before">
            Data De Envio
            <b-icon-caret-down
              animation="fade"
              font-scale="2"
              variant="primary"
              shift-v="-4"
            ></b-icon-caret-down>
          </label>
          <datetime
            v-model="date"
            type="datetime"
            min-date="today"
            input-style="{width: 120%;
                          padding: 12px 60px;
                          margin: 8px 8px;
                          display: inline-block;
                          border: 2px solid #ccc;
                          border-radius: 4px;
                          box-sizing: border-box;
                          cursor: alias
                        }"
            :min-datetime="initDate"
          ></datetime>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Datetime } from "vue-datetime";
export default {
  name: "StepThree",
  components: {
    datetime: Datetime
  },
  data() {
    return {
      color: "outline-info",
      button1: true,
      stateD: true,
      dateP: null,
      date: "",
      dataform: false,
      initDate: null
    };
  },
  created() {
    let date = new Date();
    this.initDate = date.toISOString();
    console.log(this.initDate);
  },

  methods: {
    activeButton() {
      this.button1 = !this.button1;
      console;
    }
  }
};
</script>

<style>
.dd {
  width: 190px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.teste {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
