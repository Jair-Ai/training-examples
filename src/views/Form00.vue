<template>
  <b-container fluid="sm">
    <b-row>
      <StepProgressBar></StepProgressBar>
    </b-row>
    <br />
    <br />
    <br />
    <hr />
    <b-row>
      <b-col>
        <FormLeft></FormLeft>
      </b-col>
      <b-col>teste col 2</b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormLeft from "@/components/FormLeft.vue";
import StepProgressBar from "@/components/StepProgressBar.vue";
export default {
  name: "Forms",
  components: {
    FormLeft,
    StepProgressBar
  }
};
</script>

<style></style>
