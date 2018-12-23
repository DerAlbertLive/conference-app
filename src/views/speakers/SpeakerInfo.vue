<template>
  <div class="speakerInfo">
    <img v-bind:src="item.imageUrl" v-bind:alt="altText" />
    <router-link data-cy='name' :to="{name: 'speaker', params:{id:item.id}}">{{ item.name }}</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySpeaker } from '@/types';

@Component
export default class SpeakerInfo extends Vue {
  @Prop({ default: { title: 'Dummy Title' } })
  private item!: IDisplaySpeaker;

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

  a {
    font-size: 1.3em;
    text-decoration: none;
    color: black;    
  }
}
</style>
