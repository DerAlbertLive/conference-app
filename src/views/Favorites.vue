<template>
  <div class="favorites">
    <h2>Favoriten</h2>
    <SessionGroup v-bind:group="sessionGroup" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SessionGroup from '@/components/SessionsGroup.vue'; // @ is an alias to /src
import * as types from '../types';

@Component({
  components: {
    SessionGroup,
  },
})
export default class Favorites extends Vue {
  private sessionGroup: types.ISessionGroup = {
    sessions: [
      {
        id: 0,
        title: 'Die Hölle beim Live Coding.',
        speakerName: 'Albert Weinert',
        speakerImage:
          'https://dotnetcologne.azurewebsites.net/api/app/0/speakerpicture/26',
      },
      {
        id: 1,
        title: 'Wenn experten nicht da sind.',
        speakerName: 'Timo Beil',
        speakerImage:
          'https://dotnetcologne.azurewebsites.net/api/app/0/speakerpicture/34',
      },
      {
        id: 2,
        title: 'Wenn alle den Fehler sehen, außer dem der Tippt',
        speakerName: 'Timm Taler',
        speakerImage:
          'https://dotnetcologne.azurewebsites.net/api/app/0/speakerpicture/61',
      },
    ],
  };
}
</script>
