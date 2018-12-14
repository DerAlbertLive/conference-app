<template>
  <div class="sessionInfo">
    <img :src="item.speakerImage" :alt="altText" />
    <div class="info">
      <h3>{{ item.title }}</h3>
      <p>{{ item.speakerName }}</p>
    </div>
    <div>Fav</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ISessionInfo } from '@/types';

@Component
export default class SessionInfo extends Vue {
  @Prop({ default: { title: 'Dummy Title' } })
  private item!: ISessionInfo;

  get altText() {
    return `Picture of ${this.item.speakerName}`;
  }
}
</script>

<style lang="scss">
.sessionInfo {
  display: grid;
  grid-template-columns: 2.5rem auto 2.5rem;
  grid-template-rows: minmax(2.5rem, 3rem);
  margin-bottom: 0.5rem;

  img {
    grid-column-start: 1 span 2;
    grid-row-start: 1;
    height: 2.3rem;
  }

  div {
    &.info {
      grid-column-start: 2;
      grid-row-start: 1;
    }
  }

  h3 {
    font-size: 1rem;
  }
}
</style>
