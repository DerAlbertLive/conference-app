<template>
  <section>
    <h3>{{ group.title }}</h3>
    <SpeakerInfo
      v-for="(speaker, index) in group.speakers"
      :key="speaker.id"
      :item="speaker"
      :data-cy="'info-' + index"
    />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySpeakerGroup } from '@/types';
import SpeakerInfo from './SpeakerInfo.vue';

@Component({
  components: { SpeakerInfo },
})
export default class SpeakerGroup extends Vue {
  @Prop() private group!: IDisplaySpeakerGroup;
}
</script>

<style lang="sass"></style>
