<template>
  <div id="app">
    <header>
      <svg data-cy="link-back" @click="back">
        <use xlink:href="#chevron-left--sprite"></use>
      </svg>
      <h1>{{ conftitle }}</h1>
    </header>
    <main ref="scrolled">
      <keep-alive include="/sessions|/speakers"> <router-view /> </keep-alive>
    </main>
    <footer id="nav">
      <router-link to="/favorites" data-cy="link-favorites">
        <svg>
          <title>Favoriten</title>
          <use xlink:href="#star--sprite"></use>
        </svg>
      </router-link>
      <router-link to="/sessions" data-cy="link-sessions">
        <svg>
          <title>Sessions</title>
          <use xlink:href="#comments--sprite"></use>
        </svg>
      </router-link>
      <router-link to="/speakers" data-cy="link-speakers">
        <svg>
          <title>Sprecher</title>
          <use xlink:href="#users--sprite"></use>
        </svg>
      </router-link>
      <router-link to="/information" data-cy="link-information">
        <svg>
          <title>Information</title>
          <use xlink:href="#info--sprite"></use>
        </svg>
      </router-link>
      <router-link to="/about" data-cy="link-about">
        <svg>
          <title>Über</title>
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
import '@/assets/chevron-left.svg?sprite';
import '@/assets/search.svg?sprite';
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import ServiceWorkerManager from './pwa/ServiceWorkerManager';

// new ServiceWorkerManager().registerServiceWorker();


interface IPositions {
  [name: string]: number;
}
@Component
export default class App extends Vue {
  @Action private initializeApplication!: () => void;
  @Getter private conftitle!: string;

  private scroll: number = 0;
  private scrollPositions: IPositions = {};

  private back() {
    this.$router.back();
  }

  private created() {
    this.$router.afterEach((to, from) => {
      const toName = to.name || '';
      const fromName = from.name || '';
      const scrolledElement = this.$refs.scrolled as Element;
      this.scrollPositions[fromName] = scrolledElement.scrollTop;
      const oldPos = this.scrollPositions[toName] || 0;
      setTimeout(() => {
        scrolledElement.scrollTop = oldPos;
      }, 0);
    });
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
@import 'vars';

body,
html {
  height: 100%;
  font-size: 13pt;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: $font-color;

  header {
    flex: 0 0 auto;
    background-color: $header-background;
    text-align: center;
    color: $header-color;

    h1 {
      padding-top: 0.2em;
      font-size: 1.5em;
    }

    svg {
      cursor: pointer;
      padding-top: 0.25em;
      float: left;
      width: 1.5em;
      height: 1.5em;
      fill: $header-color;
    }
  }

  main {
    flex: 1 1 auto;
    font-size: 1em;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  footer {
    flex: 0 0 auto;

    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-evenly;
    text-align: center;
    a {
      color: $footer-color;
      width: 100%;
    }

    background-color: $footer-background;
    color: $footer-color;

    svg {
      padding-top: $padding;
      height: 2em;
      width: 2em;
      fill: $footer-color;
    }

    .router-link-active {
      background-color: $footer-background-active;
      svg {
        fill: $footer-color-active;
      }
    }
  }

  h2 {
    background-color: $groups-header-color;
    padding: 0.4rem;
    font-weight: normal;
    font-size: 1.3rem;
  }

  .group {
    h3 {
      position: sticky;
      top: 0;
      background-color: $group-header-color;
      padding: $padding;
      font-size: 1.1rem;
    }

    .item {
      &:first-of-type {
        margin-top: $padding;
      }
      cursor: pointer;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
