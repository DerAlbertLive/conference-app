<template>
  <div class="sessionInfo">
    <div class="info" @click="gotoSession(item.id)">
      <h4 data-cy="title">{{ item.title }}</h4>
      <p data-cy="names" class="names">{{ speakerNames }}</p>
      <p class="location">{{ item.location.name }}</p>
    </div>
    <div
      data-cy="fav"
      class="fav"
      @click="toggle(item)"
    >
      <svg class="" v-bind:class="[ item.favorite ? 'favorite' : '']">
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

<style lang="scss">
section .sessionInfo {
  &:first-of-type {
    margin-top: 0.4rem;
  }
}
.sessionInfo {
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 2.5rem 1rem;
  grid-template-rows: minmax(minimal-content, 3rem);
  padding-left: 0.4em;

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
      padding-top: 0.4rem;
    }
    .favorite {
        fill: #ece313
    } 
  }
  h4 {
    font-size: 1rem;
  }
  .names {
    font-size: 0.9rem;
    font-style: italic;
  }
  .location {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.4em;
  }
  .track {
    color: white;
    font-weight: bold;
    text-align: center;
    padding-top: 0.4em;
  }
}
</style>
