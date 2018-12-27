<template>
  <div class="sessionInfo">
    <div class="info" @click="gotoSession(item.id)">
      <h4 data-cy="title">{{ item.title }}</h4>
      <p data-cy="names" class="names">{{ speakerNames }}</p>
      <p class="location">{{ item.location.name }}</p>
    </div>
    <div
      v-if="item.favorite"
      data-cy="fav"
      class="fav yes"
      @click="toggle(item)"
    >
      <img src="@/assets/star-solid.svg" alt="Favorisiert" />
    </div>
    <div
      v-if="!item.favorite"
      data-cy="fav"
      class="fav no"
      @click="toggle(item)"
    >
      <img src="@/assets/star.svg" alt="Nicht favorisiert" />
    </div>
    <div class="track" :style="{ 'background-color': item.track.color }">
      {{ item.track.shortTitle }}
    </div>
  </div>
</template>

<script lang="ts">
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
.sessionInfo {
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 2.5rem 1rem;
  grid-template-rows: minmax(minimal-content, 3rem);
  margin-bottom: 0.5rem;
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
    img {
      width: 2em;
      padding-top: 0.4rem;
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
  }
  .track {
    color: white;
    font-weight: bold;
    text-align: center;
    padding-top: 0.4em;
  }
}
</style>
