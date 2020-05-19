<template>
  <div class="root">
    <div class="container">
      <ul class="progressbar">
        <li
          :class="[step >= i ? 'active' : 'none']"
          v-for="(item, i) in lenght"
          :key="i"
          @click="stepClicked(i)"
        >{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../main";
export default {
  name: "Step_Progress_Bar",
  props: {
    lenght: {
      type: Array,
      default() {
        return [];
      },
      validator(val) {
        return val && val.length > 0;
      }
    },
    step: {
      type: Number,
      default: -1
    }
  },
  methods: {
    stepClicked(step) {
      EventBus.$emit("CurrentStep", step);
    }
  },
  mounted() {
    EventBus.$on("StepDone", stepDone => {
      this.step = stepDone;
    });
  }
};
</script>

<style lang="scss">
.container {
  width: 100%;
  position: absolute;
  z-index: 1;
  text-align: center;
}

.progressbar {
  text-align: center;
}

.progressbar li {
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 20%;
  position: relative;
  text-align: center;
  align-content: center;
  cursor: pointer;
}

.progressbar li:before {
  content: "1";
  width: 30px;
  height: 30px;
}

.progressbar li:before {
  content: "1";
  width: 30px;
  height: 30px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 27px;
  background: white;
  color: #bebebe;
  text-align: center;
  font-weight: bold;
}

.progressbar {
  counter-reset: step;
  margin: 0;
  padding: 0;
  text-align: center;
  list-style: none;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}
.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 27px;
  background: white;
  color: #bebebe;
  text-align: center;
  font-weight: bold;
}

.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  background: #979797;
  top: 15px;
  left: -50%;
  z-index: -1;
}

.progressbar li:first-child:after {
  content: none;
}

.progressbar li.active:before {
  content: "\f00c";
  content: "\2713;";
  content: "\10003";
  content: "\10004";
  content: "\2713";
  border-color: #3aac5d;
  background: #3aac5d;
  color: white;
}

.progressbar li.active + li:after {
  background: #3aac5d;
}

@media (max-width: 643px) {
  .progressbar {
    display: flex;
  }
}
</style>
