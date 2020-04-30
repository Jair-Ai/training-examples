<template>
  <div class="root">
    <div class="container">
      <ul class="progressbar">
        <li
          :class="[step >= i ? 'active' : 'none']"
          v-for="i in lenght"
          :key="i"
        >
          Step {{ i }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step_Progress_Bar",
  props: {
    lenght:{
      type: Number,
      default: 3
    },
    step: {
      type: Number,
      default: 2
    }
  }
};
</script>

<style>
.container {
  width: 100%;
  position: absolute;
  z-index: 1;
}

.progressbar li {
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 20%;
  position: relative;
  text-align: center;
  lign-content: center;
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
  border-color: #3aac5d;
  background: #3aac5d;
  color: white;
}

.progressbar li.active + li:after {
  background: #3aac5d;
}
.progressbar li.active + li:before {
  border-color: #3aac5d;
  background: #3aac5d;
  color: white;
}
</style>
