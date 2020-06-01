<template>
  <b-container fluid="xl">
    <b-row>
      // eslint-disable-next-line prettier/prettier
      <StepProgressBar2 :stepsData="stepsData"></StepProgressBar2>
    </b-row>
    <br />
    <br />
    <br />
    <hr />
    <b-row>
      <StepOne v-if="componentActive === 0"></StepOne>
      <StepTwo v-if="componentActive === 1" :congrats="congrats"></StepTwo>
      <StepThree v-if="componentActive === 2"></StepThree>
    </b-row>
  </b-container>
</template>

<script>
import StepProgressBar2 from "@/components/StepProgressBar2.vue";
import StepOne from "@/components//StepOne/StepOne.vue";
import StepTwo from "@/components/StepTwo/StepTwo.vue";
import StepThree from "@/components/StepThree/StepThree.vue";
import { EventBus } from "../main";

export default {
  name: "Formshandler2",
  data() {
    return {
      componentActive: 0,
      stepsData: [
        { icon: "pencil", active: false, stepName: "Pesquisa" },
        { icon: "people", active: false, stepName: "Clientes" },
        { icon: "calendar", active: true, stepName: "Envio" },
        { icon: "check", active: false, stepName: "Confira" }
      ],
      congrats: false
    };
  },
  components: {
    StepProgressBar2,
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
