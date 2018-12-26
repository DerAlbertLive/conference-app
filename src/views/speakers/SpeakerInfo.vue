<template>
  <div class="speakerInfo" @click="gotoSpeaker(item.id)">
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

  gotoSpeaker(id: number) {
    this.$router.push({ name: 'speaker', params: { id: id.toString() } });
  }

  get altText() {
    return `Picture of ${this.item.name}`;
  }
}
</script>

<style lang="scss">
.speakerInfo {
  cursor: pointer;
  display: grid;
  grid-template-columns: 2.5rem auto;

  img {
    grid-column-start: 1;
    grid-row-start: 1;
    height: 2.3rem;
  }

  a {
    font-size: 1.3em;
    text-decoration: none;
    color: black;
  }
}
</style>
