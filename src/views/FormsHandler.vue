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
    </b-row>
  </b-container>
</template>

<script>
import StepProgressBar from "@/components/StepProgressBar.vue";
import StepOne from "@/components/StepOne.vue";
import StepTwo from "@/components/StepTwo.vue";

export default {
  name: "Formshandler",
  data() {
    return {
      componentActive: 2
    };
  },
  components: {
    StepProgressBar,
    StepOne,
    StepTwo
  }
};
</script>

<style></style>
