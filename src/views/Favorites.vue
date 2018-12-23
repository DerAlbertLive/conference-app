<template>
  <div class="favorites">
    <h2>Favoriten</h2>
    <SessionGroup v-bind:group="sessionGroup" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SessionGroup from '@/views/sessions/SessionGroup.vue'; // @ is an alias to /src
import * as types from '../types';

@Component({
  components: {
    SessionGroup,
  },
})
export default class Favorites extends Vue {
  private sessionGroup!: types.IDisplaySpeakerGroup;
}
</script>
