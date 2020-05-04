<template>
  <b-container fluid="xl">
    <b-row>
      <StepProgressBar></StepProgressBar>
    </b-row>
    <br />
    <br />
    <br />
    <hr />
    <b-row>
      <StepOne v-if="componentActive === 1"></StepOne>
      <StepTwo v-if="componentActive === 2"></StepTwo>
      <StepThree v-if="componentActive === 3"></StepThree>
    </b-row>
  </b-container>
</template>

<script>
import StepProgressBar from "@/components/StepProgressBar.vue";
import StepOne from "@/components/StepOne.vue";
import StepTwo from "@/components/StepTwo.vue";
import StepThree from "@/components/StepThree.vue";
import { EventBus } from "../main";
export default {
  name: "Formshandler",
  data() {
    return {
      componentActive: 1
    };
  },
  components: {
    StepProgressBar,
    StepOne,
    StepTwo,
    StepThree
  },
  mounted() {
    EventBus.$on("CurrentStep", step => {
      this.componentActive = step;
    });
  }
};
</script>

<style></style>
