<template>
  <div id="app">
    <header>
      <h1>{{ conftitle }}</h1>
    </header>
    <main>
      <router-view/>
    </main>
    <footer id="nav">
      <router-link to="/"><img alt="Favoriten" src="@/assets/star.svg?data" /></router-link>
      <router-link to="/sessions"><img alt="Sessions" src="@/assets/comments.svg?data" /></router-link>
      <router-link to="/speakers"><img alt="Sprecher" src="@/assets/users.svg?data" /></router-link>
      <router-link to="/information"><img alt="Information" src="@/assets/info.svg?data" /></router-link>
      <router-link to="/about"><img alt="Über" src="@/assets/question-circle.svg?data"/></router-link>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
@Component
export default class App extends Vue {
  @Action private initializeApplication!: () => void;
  @Getter private conftitle!: string;
}
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
  grid-template-rows: 2em auto 2.8rem;
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
      padding-top: 0.4em;
    }
    background-color: #2c3e50;
    grid-row-start: 3;
  }

  h2 {
    background-color: #66add6;
    padding: 0.4em;
    font-weight: normal;
    font-size: 1.3rem;
  }

  h3 {
    background-color: #ddd;
    padding: 0.4em;
    font-size: 1.1rem;
    margin-bottom: 0.4em;
  }
  #nav {
    background-color: #eee;
    color: white;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    text-align: center;
    img {    
      height: 2em;    
    }
    .router-link-exact-active {
      background-color: #e2e2e2;
    }
  }
}
</style>
