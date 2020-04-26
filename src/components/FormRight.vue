<template>
  <div class="divmaster">
    <p>{company}</p>
    <hr />
    <p>Para: João</p>
    <hr />
    <img class="center" :src="imageLink" alt="Logo da Empresa" />
    {{ subjects }}
    <p class="pa">Olá, João</p>

    <p class="pa">{{ chosenPhrase }}</p>
    <div style="text-align: center">
      <ul>
        <li class="listNPS" v-for="number in score" :key="number">{{ number }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormRight",
  data() {
    return {
      score: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  props: {
    imageLink: {
      type: String,
      required: true,
      default:
        "https://onlyask.me/wp-content/uploads/2019/09/only_ask_logo_horizontal@2x-300x60.png"
    },
    chosenPhrase: {
      type: String,
      required: true,
      default: "Qual a chance de voce nos recomendar para alguem?"
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  margin: 0;
  padding: 0;
  text-align: center;
  list-style: none;
}
ul li {
  padding: 2px 5px;
  display: inline-block;
  background: #11e9c550;
}
.pa {
  text-align: center;
}

.center {
  display: block;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.divmaster {
  border: dotted #11e9c550;
}
</style>
