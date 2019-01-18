<template>
  <div class="item">
    <div @click="gotoSession(item.id)">
      <h4 data-cy="title">{{ item.title }}</h4>
      <p data-cy="names" class="names">{{ speakerNames }}</p>
      <p class="location">{{ item.location.name }}</p>
    </div>
    <div data-cy="fav" @click="toggle(item)">
      <svg class v-bind:class="[item.favorite ? 'favorite' : '']">
        <use xlink:href="#star--sprite"></use>
      </svg>
    </div>
    <div data-cy="track" :style="{ 'background-color': item.track.color }">
      {{ item.track.shortTitle }}
    </div>
  </div>
</template>

<script lang="ts">
import '@/assets/star.svg?sprite';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySession } from '@/types';
import { Action } from 'vuex-class';
import { Location } from 'vue-router';

@Component
export default class SessionInfo extends Vue {
  @Prop() private item!: IDisplaySession;
  @Action private toggleFavorite!: (session: IDisplaySession) => void;

  private gotoSession(sessionId: number) {
    const id = sessionId.toString();
    this.$router.push({ name: 'session', params: { id } });
  }
  private toggle(session: IDisplaySession) {
    this.toggleFavorite(session);
  }
  get speakerNames() {
    if (!this.item || !this.item.speakers) {
      return;
    }
    const names = this.item.speakers.map((s) => s.name);
    return names.join(', ');
  }
}
</script>

<style lang="scss" scoped>
@import '@/_vars.scss';

.group {
  .item {
    padding-left: $padding;
    div:nth-child(1) {
      flex-grow: 1;
    }
    div:nth-child(2) {
      margin-left: $padding;
      margin-right: $padding;
      svg {
        width: 2em;
        height: 2em;
        padding-top: $padding;
        fill: $favorite-color;
      }
      .favorite {
        fill: $favorite-color-active;
      }
    }
    div:nth-child(3) {
      padding: 0.2em;
      color: $track-color;
      font-weight: bold;
      text-align: center;
      padding-top: $padding;
      margin-bottom: $padding;
    }

    h4 {
      font-size: 1em;
    }
    .names {
      font-size: 0.9em;
      color: $item-level-1-color;
      font-style: italic;
    }
    .location {
      font-size: 0.8em;
      color: $item-level-2-color;
      margin-bottom: $padding;
    }
  }
}
</style>
