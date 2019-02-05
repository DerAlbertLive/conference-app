<template>
  <div @click="gotoSpeaker(item.id)">
    <div class="speaker-picture">
      <img crossorigin="anonymous" :src="item.imageUrl" :alt="altText" />
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
@import '@/_vars.scss';

.group {
  .item {
    padding-left: $padding;
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
      padding-left: $padding;
      padding-right: $padding;
    }
    div {
      background-color: $image-placeholder;
      margin-bottom: $padding;
    }
  }
}
</style>
