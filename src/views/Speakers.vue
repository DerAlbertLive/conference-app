<template>
  <div class="about">
    <h2>Sprecher</h2>
    <SpeakerGroup
      v-for="group in groups"
      v-bind:key="group.title"
      v-bind:group="group"
      class="speakerGroup"
    >
    </SpeakerGroup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ISpeakerGroup } from '@/types';
import SpeakerGroup from '../components/SpeakerGroup.vue';

@Component({
  components: { SpeakerGroup },
})
export default class Speakers extends Vue {
  private groups: ISpeakerGroup[] = [];

  public async created() {
    const response = await fetch('/data/conference.json');
    const json = await response.json();
    this.groups = [
      {
        title: 'Group A',
        speakers: json.speakers,
      },
    ];
    // console.log(json.speakers);
  }
}
</script>
<style lang="scss"></style>
