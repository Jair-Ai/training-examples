<template>
  <div class="progress1">
    <ul class="ulstep">
      <li
        v-for="(steps, index) in StepsData"
        :key="index"
        :class="[index <= activeStep ? 'liumActive' : 'lium']"
      >
        <b-icon
          v-if="index <= activeStep"
          :icon="steps.icon"
          :class="classIconActive"
          :variant="variantActive"
          :style="sizeStep"
        />
        <b-icon
          v-else
          :icon="steps.icon"
          :class="classIcon"
          :variant="variant"
          :style="sizeStep"
        />
        <br />
        <b-icon
          icon="check-circle"
          v-if="index <= activeStep"
          :variant="variantActive"
          style="width: 20px; height: 20px; background: #5bc0de; border-radius: 50%;"
        ></b-icon>
        <b-icon
          icon="x"
          v-else
          :variant="variantActive"
          style="width: 20px; height: 20px; background: rgba(184, 70, 701, 0.171); border-radius: 50%;"
        ></b-icon>
        <p style="color: #5bc0de">{{ steps.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "StepProgressBar2",
  data() {
    return {
      classIcon: "border border-info rounded p-2",
      classIconActive: "rounded bg-info p-1",
      fundo: "info",
      variant: "info",
      variantActive: "light"
    };
  },
  props: {
    activeStep: { type: Number, default: 0, required: true },
    StepsData: {
      type: Array,
      required: true,
      default() {
        [
          { icon: "x", name: "NameHere" },
          { icon: "x", name: "NameHere" },
          { icon: "x", name: "NameHere" }
        ];
      }
    },
    sizeStep: {
      type: String,
      default: "width: 80px; height: 80px; margin-bottom: 20px"
    }
  }
};
</script>

<style scoped>
.iActive {
  width: 20px;
  height: 20px;
  background: #5bc0de;
  border-radius: 50%;
}

.iNoActive {
  width: 20px;
  height: 20px;
  background: rgba(39, 31, 31, 0.171);
  border-radius: 50%;
}

.progress1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ulstep {
  text-align: center;
}

.ulstep .lium {
  display: inline-block;
  width: 200px;
}

.ulstep .liumActive {
  display: inline-block;
  width: 200px;
}

.ulstep .lium::after {
  content: "";
  background: rgba(184, 181, 181, 0.171);
  height: 5px;
  width: 200px;
  display: block;
  position: absolute;
  top: 197px;
  z-index: -1;
}

.ulstep .liumActive::after {
  content: "";
  background: #5bc0de;
  height: 5px;
  width: 200px;
  display: block;
  position: absolute;
  top: 197px;
  z-index: -1;
}
</style>
