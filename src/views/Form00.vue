<template>
  <b-container>
    <b-row>
      <b-col>
        <FormLeft></FormLeft>
      </b-col>
      <b-col>
        teste col 2
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormLeft from "@/components/FormLeft.vue";
export default {
  name: "Forms",
  components: {
    FormLeft,
  },
};
</script>

<style></style>
