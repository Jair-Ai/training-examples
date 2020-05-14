<template>
  <b-container fluid="xl">
    <b-row>
      <StepProgressBar :lenght="stepsTo"></StepProgressBar>
    </b-row>
    <br />
    <br />
    <br />
    <hr />
    <b-row>
      <StepOne v-if="componentActive === 0"></StepOne>
      <StepTwo v-if="componentActive === 1"></StepTwo>
      <StepThree v-if="componentActive === 2"></StepThree>
    </b-row>
  </b-container>
</template>

<script>
import StepProgressBar from "@/components/StepProgressBar.vue";
import StepOne from "@/components//StepOne/StepOne.vue";
import StepTwo from "@/components/StepTwo/StepTwo.vue";
import StepThree from "@/components/StepThree/StepThree.vue";
import { EventBus } from "../main";

export default {
  name: "Formshandler",
  data() {
    return {
      componentActive: 0,
      stepsTo: ["Pesquisa", "Clientes", "Data de Envio", "Confira"]
    };
  },
  components: {
    StepProgressBar,
    StepOne,
    StepTwo,
    StepThree
  },
  mounted() {
    EventBus.$on("StepDone", valor => {
      this.componentActive = valor + 1;
    });

    EventBus.$on("CurrentStep", valor => {
      this.componentActive = valor;
    });
  }
};
</script>

<style></style>
