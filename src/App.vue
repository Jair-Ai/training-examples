<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Passo4</router-link>|
      <router-link to="/about">Passo5</router-link>|
      <router-link to="/forms">Forms</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#nav {
  padding: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  #app a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
