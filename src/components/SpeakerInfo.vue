<template>
      <div class="speakerInfo">
        <img v-bind:src="item.speakerImage" v-bind:alt="altText">
        <p>{{ item.name }}</p>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ISpeakerInfo } from '@/types';

@Component
export default class SpeakerInfo extends Vue {
  @Prop({ default: { title: 'Dummy Title' } })
  private item!: ISpeakerInfo;

  get altText() {
    return `Picture of ${this.item.name}`;
  }
}
</script>

<style lang="scss">
.speakerInfo {
  display: grid;
  grid-template-columns: 2.5rem auto;
 
  img {
    grid-column-start: 1;
    grid-row-start: 1;
    height: 2.3rem;
  }
}
</style>
