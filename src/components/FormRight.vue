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
  </div>
</template>

<script>
export default {
  name: "FormRight",
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

<style scoped>
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
