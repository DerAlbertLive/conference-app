<template>
  <div id="app">
    <header>
      <h1>{{ conftitle }}</h1>
    </header>
    <main><router-view /></main>
    <footer id="nav">
        <router-link to="/">
            <svg>
                <use xlink:href="#star--sprite"></use>
            </svg>
        </router-link>
        <router-link to="/sessions">
            <svg>
                <use xlink:href="#comments--sprite"></use>
            </svg>
        </router-link>
        <router-link to="/speakers">
            <svg>
                <use xlink:href="#users--sprite"></use>
            </svg>
        </router-link>
        <router-link to="/information">
            <svg>
                <use xlink:href="#info--sprite"></use>
            </svg>
        </router-link>
        <router-link to="/about">
            <svg>
                <use xlink:href="#question-circle--sprite"></use>
            </svg>
        </router-link>
    </footer>
  </div>
</template>

<script lang="ts">
import '@/assets/star.svg?sprite';
import '@/assets/comments.svg?sprite';
import '@/assets/users.svg?sprite';
import '@/assets/info.svg?sprite';
import '@/assets/question-circle.svg?sprite';
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
    -webkit-overflow-scrolling: touch;
  }

  footer {
    a {
      color: white;
    }
    background-color: #2c3e50;
    grid-row-start: 3;
  }

  h2 {
    background-color: #66add6;
    padding: 0.4rem;
    font-weight: normal;
    font-size: 1.3rem;
  }

  h3 {
    background-color: #ddd;
    padding: 0.4rem;
    font-size: 1.1rem;
  }
  #nav {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    background-color: #eee;
    color: white;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    text-align: center;
    svg {
      height: 2em;
      width: 2em;
      fill : #2c3e50;
    }
  }

  .sticky-element {
    position: sticky;
    top: 0;
  }
}
</style>
