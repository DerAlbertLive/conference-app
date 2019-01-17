<template>
  <div @click="gotoSpeaker(item.id)">
    <div class="speaker-picture">
    <img v-bind:src="item.imageUrl" v-bind:alt="altText" />
    </div>
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
    padding-left: var(--padding);
    .speaker-picture {
      border-radius: 50%;
      overflow: hidden;
      width: 45px;
      height: 45px;      
    }
    img {
      display: block;
      width: 100%;
      object-fit: cover;
      margin: auto;
    }

    h4 {
      padding-left: var(--padding);
      padding-right: var(--padding);
    }
    div {
      background-color: red;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
