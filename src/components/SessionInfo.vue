<template>
  <div class="sessionInfo">
    <div class="info" @click="gotoSession(item.id)">
      <h3 data-cy="title">{{ item.title }}</h3>
      <p data-cy="names">{{ speakerNames }}</p>
    </div>
    <div
      v-if="item.favorite"
      data-cy="fav"
      class="fav yes"
      @click="toggle(item)"
    >
      Fav
    </div>
    <div
      v-if="!item.favorite"
      data-cy="fav"
      class="fav no"
      @click="toggle(item)"
    >
      No Fav
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
  @Prop({ default: { title: 'Dummy Title' } })
  private item!: IDisplaySession;
  @Action private toggleFavorite!: (session) => void;

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
    var names = this.item.speakers.map((s) => s.name);
    return names.join(', ');
  }
}
</script>

<style lang="scss">
.sessionInfo {
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 2.5rem 1rem;
  grid-template-rows: minmax(2.5rem, 3rem);
  margin-bottom: 0.5rem;
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

  h3 {
    font-size: 1rem;
  }
}
</style>
