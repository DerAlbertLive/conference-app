<template>
  <div class="sessionInfo">
    <div class="info">
      <h3 data-cy="title">{{ item.title }}</h3>
      <p data-cy="names">{{ item.speakerNames }}</p>
    </div>
    <div class="fav">Fav</div>
    <div class="track" :style="{ 'background-color': item.track.color}" >
      {{ item.track.shortTitle }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySession } from '@/types';

@Component
export default class SessionInfo extends Vue {
  @Prop({ default: { title: 'Dummy Title' } })
  private item!: IDisplaySession;
}
</script>

<style lang="scss">
.sessionInfo {
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
