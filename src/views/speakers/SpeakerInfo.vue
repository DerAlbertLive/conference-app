<template>
  <div @click="gotoSpeaker(item.id)">
    <img v-bind:src="item.imageUrl" v-bind:alt="altText" />
    <h4 data-cy="name">{{ item.name }}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySpeaker } from '@/types';

@Component
export default class SpeakerInfo extends Vue {
  @Prop({ default: { title: 'Dummy Title' } })
  private item!: IDisplaySpeaker;

  private gotoSpeaker(id: number) {
    this.$router.push({ name: 'speaker', params: { id: id.toString() } });
  }

  get altText() {
    return `Picture of ${this.item.name}`;
  }
}
</script>

<style lang="scss" scoped>
.group {
  .item {
    grid-template-columns: 2.5em auto;
    padding-left: var(--padding);

    img {
      grid-column-start: 1;
      grid-row-start: 1;
      height: 2.3rem;
      border-radius: 50%;
      margin-bottom: var(--padding);
    }
  }
}
</style>
