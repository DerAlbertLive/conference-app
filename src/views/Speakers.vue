<template>
  <div class="about">
    <h2>Sprecher</h2>
    <SpeakerGroup v-for="group in groups" v-bind:key="group.title"  v-bind:group="group" class="speakerGroup">

    </SpeakerGroup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ISpeakerGroup } from '@/types';
import SpeakerGroup from '../components/SpeakerGroup.vue';

@Component({
  components: { SpeakerGroup }
})
export default class Speakers extends Vue {
  private groups: ISpeakerGroup[] = [
    { 
      title: "Group A",
      speakers: [
        {
          id: 0,
          name: 'Albert Weinert',
          speakerImage:
            'https://dotnetcologne.azurewebsites.net/api/app/0/speakerpicture/26',
        },
        {
          id: 1,
          name: 'Sunny 2405',
          speakerImage:
            'https://dotnetcologne.azurewebsites.net/api/app/0/speakerpicture/28',
        },
      ],
    },
    {
      title: "Group B",
      speakers: [
        {
          id: 2,
          name: 'least fix point',
          speakerImage:
            'https://dotnetcologne.azurewebsites.net/api/app/0/speakerpicture/29',
        },
        {
          id: 3,
          name: 'yev hensh',
          speakerImage:
            'https://dotnetcologne.azurewebsites.net/api/app/0/speakerpicture/27',
        },
      ],
    },
  ];
}
</script>
<style lang="scss">

</style>

