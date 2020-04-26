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
      <b-col>
        <FormRight></FormRight>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import StepProgressBar from "@/components/StepProgressBar.vue";
import FormLeft from "@/components/FormLeft.vue";
import FormRight from "@/components/FormRight.vue";

export default {
  name: "Forms",
  components: {
    FormLeft,
    FormRight,
    StepProgressBar
  }
};
</script>

<style scoped>
p {
  text-align: center;
}
</style>
