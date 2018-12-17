<template>
  <section>
    <h3>{{ group.title }}</h3>
    <SpeakerInfo v-for="speaker in group.speakers" :key="speaker.id" :item="speaker"/>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ISpeakerGroup } from '@/types';
import SpeakerInfo from './SpeakerInfo.vue';

@Component({
  components: { SpeakerInfo },
})
export default class SpeakerGroup extends Vue {
  @Prop() private group!: ISpeakerGroup;
}
</script>

<style lang="sass"></style>
