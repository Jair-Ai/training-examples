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
        <p class="pa">
          Como a pesquisa será enviada
          <b-icon-caret-down animation="fade" font-scale="2" variant="success" shift-v="-4"></b-icon-caret-down>
        </p>

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
.pa {
  margin-top: -0.5rem;
  text-align: center;
  font-weight: 600;
}
</style>
