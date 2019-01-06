<template>
  <div id="app">
    <header>
      <svg data-cy="link-back" @click="back">
        <use xlink:href="#chevron-left--sprite"></use>
      </svg>
      <h1>{{ conftitle }}</h1>
    </header>
    <main ref="scrolled">
      <keep-alive exclude="\/[a-zA-Z]*\/[0-9]*">
        <router-view/>
      </keep-alive>
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
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

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
      var scrolledElement = this.$refs.scrolled as Element;
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

:root {
  /// colors
  --font-color: #000;
  --header-background: #2c3e50;
  --header-color: #fff;

  --footer-color: #888;
  --footer-color-active: #fff;
  --footer-background: #ccc;
  --footer-background-active: #aaa;

  --groups-header-color: #66add6;
  --group-header-color: #ccc;

  --favorite-color-active: gold;
  --favorite-color: #ccc;

  --item-color: #000;
  --item-level-1-color: #555;
  --item-level-2-color: #999;

  --track-color: #fff;

  --padding: 0.4rem;
}

body,
html {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: var(--font-color);
  display: grid;
  grid-template-rows: 2em auto 2.8em;
  grid-template-columns: 100%;
  height: 100%;

  header {
    background-color: var(--header-background);
    text-align: center;
    color: var(--header-color);

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
      fill: var(--header-color);
    }
  }

  main {
    font-size: 1em;
    grid-row-start: 2;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  footer {
    display: grid;
    grid-row-start: 3;
    grid-template-columns: 20% 20% 20% 20% 20%;
    text-align: center;

    a {
      color: var(--footer-color);
    }

    background-color: var(--footer-background);
    color: var(--footer-color);

    svg {
      padding-top: var(--padding);
      height: 2em;
      width: 2em;
      fill: var(--footer-color);
    }

    .router-link-active {
      background-color: var(--footer-background-active);
      svg {
        fill: var(--footer-color-active);
      }
    }
  }

  .groups {
    h2 {
      background-color: var(--groups-header-color);
      padding: 0.4rem;
      font-weight: normal;
      font-size: 1.3rem;
    }
  }

  .group {
    h3 {
      position: sticky;
      top: 0;
      background-color: var(--group-header-color);
      padding: var(--padding);
      font-size: 1.1rem;
    }

    .item {
      &:first-of-type {
        margin-top: var(--padding);
      }
      cursor: pointer;
      display: grid;
    }
  }
}
</style>
