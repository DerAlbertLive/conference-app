<template>
  <div id="app">
    <header><h1>dotnet Cologne 2019</h1></header>
    <main><router-view /></main>
    <footer id="nav">
      <router-link to="/">Favoriten</router-link> |
      <router-link to="/sessions">Sessions</router-link> |
      <router-link to="/speakers">Sprecher</router-link> |
      <router-link to="/information">Information</router-link> |
      <router-link to="/about">Über</router-link>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
body,
html {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: grid;
  grid-template-rows: 2em auto 2rem;
  grid-template-columns: 100%;
  height: 100%;

  header {
    background-color: #2c3e50;
    text-align: center;
    color: white;
    h1 {
      font-size: 1.5rem;
    }
  }

  main {
    grid-row-start: 2;
    overflow: auto;
  }

  footer {
    a {
      color: white;
    }
    background-color: #2c3e50;
    grid-row-start: 3;
  }
}
</style>
