<template>
  <b-container class="divmaster" fluid="sm">
    <p style="font-weight: 600;">De: {{ company }}</p>
    <hr />
    <p>Para: João</p>
    <hr />
    <p>Assunto: {{ campaign }}</p>
    <hr />
    <img class="center" :src="file" alt="Logo da Empresa" />
    <p class="pa">Olá, João</p>

    <p class="pa">
      Qual a probabilidade de você nos recomendar para um {{ choice }}.
    </p>

    <div>
      <ul class="float">
        <li
          class="listNPS"
          v-for="(color, i) in score_color"
          :key="color"
          :style="{ 'background-color': color }"
        >
          {{ i }}
        </li>
      </ul>
    </div>
    <br />
    <p class="pa2">Vote com um clique</p>
    <br />
    <hr />
    <img
      class="center2"
      src="https://onlyask.me/wp-content/uploads/2019/09/only_ask_logo_horizontal@2x-300x60.png"
      alt="OnlyAsk"
    />
    <p class="pa2" style="text-decoration: underline">Descadastrar e-mail</p>
  </b-container>
</template>

<script>
import { EventBus } from "../../main";

export default {
  name: "FormRight",
  data() {
    return {
      file:
        "https://produzindosom8.webnode.com/_files/200000051-0a9120b8a3/sua%20marca%20aqui.png",
      choice: "amigo",
      company: "Unilever",
      campaign: "Pesquisa de satisfação",
      ask: "",
      score_color: [
        "#ef778d",
        "#f19587",
        "#f2a484",
        "#f2b280",
        "#f3c17d",
        "#f4d07a",
        "#efe77b",
        "#d8e97d",
        "#bde37f",
        "#a5dd81",
        "#91d683"
      ]
    };
  },
  mounted() {
    EventBus.$on("DataSend", valor => {
      this[valor[0]] = valor[1];
      console.log(`Como chega a inforcação ${valor[0]}`);
    });
    EventBus.$on("FileSend", valor => {
      this.file = valor;
    });
  }
};
</script>

<style scoped lang="scss">
$color-simple: #11e9c550;
$color-simpleText: #16a89060;
ul {
  margin: 0;
  padding: 0;
  text-align: center;
  list-style: none;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}
ul li {
  display: inline-block;
  margin-left: 1px;
  margin-top: 1px;
  border-radius: 3px;
  width: 30px;
  height: 24x;
  align-content: center;
  color: white;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: bold;
}

ul li:hover {
  font-size: 1.1rem;
  animation: pulse 2s infinite;
}

ul::before {
  content: "Improvável";
  position: absolute;
  margin-top: 30px;
  font-size: 13px;
  color: grey;
}

ul::after {
  content: "provável";
  position: absolute;
  margin-left: -50px;
  margin-top: 30px;
  font-size: 13px;
  color: grey;
}
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
.pa {
  text-align: center;
}

.pa2 {
  text-align: center;
  font-size: 0.7rem;
  color: grey;
  margin-top: -5px;
}

.center {
  display: block;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  width: 35%;
}

.center2 {
  display: block;
  margin-top: 1.6rem;
  margin-bottom: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}

.divmaster {
  border: 1px solid grey;
}

hr {
  margin-top: -15px;
  margin-bottom: 5px;
}
</style>
