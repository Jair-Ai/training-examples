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
      <b-col sm="6">
        <FormLeft></FormLeft>
      </b-col>
      <b-col sm="6">
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

<style lang="scss" scoped>
.container {
  breakpoint: 2000px;
}
.pa {
  margin-top: -0.5rem;
  text-align: center;
  font-weight: 600;
}
</style>
