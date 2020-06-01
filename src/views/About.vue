<template>
  <div class="about">
    <StepProgressBar2
      :StepsData="StepsData"
      :activeStep="activeStep"
    ></StepProgressBar2>
  </div>
</template>
<script>
import StepProgressBar2 from "@/components/StepProgressBar2.vue";
export default {
  components: { StepProgressBar2 },
  data() {
    return {
      componentActive: 0,
      StepsData: [
        { icon: "pencil", active: false, name: "Pesquisa" },
        { icon: "people", active: false, name: "Clientes" },
        { icon: "calendar", active: true, name: "Envio" },
        { icon: "box-arrow-in-right", active: false, name: "Confira" }
      ],
      activeStep: 1,
      congrats: false
    };
  }
};
</script>
