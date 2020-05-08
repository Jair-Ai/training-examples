<template>
  <b-container fluid="xl">
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
nao fica
<script>
import FormLeft from "./FormLeft.vue";
import FormRight from "./FormRight.vue";

export default {
  name: "StepOne",
  components: {
    FormLeft,
    FormRight
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
