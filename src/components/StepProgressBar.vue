<template>
  <div class="root">
    <div class="container">
      <ul class="progressbar">
        <li>Step 1</li>
        <li>Step 2</li>
        <li>Step 3</li>
        <li>Step 4</li>
        <li>Step 5</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step_Progress_Bar"
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
  width: 20%;
  position: relative;
  text-align: center;
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
</style>
