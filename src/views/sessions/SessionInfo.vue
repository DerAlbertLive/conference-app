<template>
  <div class="item">
    <div class="info" @click="gotoSession(item.id)">
      <h4 data-cy="title">{{ item.title }}</h4>
      <p data-cy="names" class="names">{{ speakerNames }}</p>
      <p class="location">{{ item.location.name }}</p>
    </div>
    <div data-cy="fav" class="fav" @click="toggle(item)">
      <svg class v-bind:class="[item.favorite ? 'favorite' : '']">
        <use xlink:href="#star--sprite"></use>
      </svg>
    </div>
    <div class="track" :style="{ 'background-color': item.track.color }">
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
.group {
  .item {
    grid-template-columns: auto 2.5em 1em;
    grid-template-rows: minmax(minimal-content, 3em);
    padding-left: var(--padding);

    div {
      &.info {
        grid-column-start: 1;
        grid-row-start: 1;
      }
      &.fav {
        grid-column-start: 2;
        grid-row-start: 1;
      }
      &.room {
        grid-column-start: 3;
        grid-row-start: 1;
      }
    }

    .fav {
      svg {
        width: 2em;
        height: 2em;
        padding-top: var(--padding);
        fill: var(--favorite-color);
      }
      .favorite {
        fill: var(--favorite-color-active);
      }
    }

    h4 {
      font-size: 1em;
    }
    .names {
      font-size: 0.9em;
      color: var(--item-level-1-color);
      font-style: italic;
    }
    .location {
      font-size: 0.8em;
      color: var(--item-level-2-color);
      margin-bottom: var(--padding);
    }
    .track {
      color: var(--track-color);
      font-weight: bold;
      text-align: center;
      padding-top: var(--padding);
      margin-bottom: var(--padding);
    }
  }
}
</style>
