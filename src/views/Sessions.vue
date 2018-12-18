<template>
  <div class="sessions">
    <h2>Sessions</h2>
    <SessionGroup v-for="group in groups" :group="group" :key="group.title" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace, Action, Getter } from 'vuex-class';

import SessionGroup from '@/components/SessionsGroup.vue'; // @ is an alias to /src
import * as types from '../types';

const mod = namespace('sessions');

@Component({
  components: {
    SessionGroup,
  },
})
export default class Sessions extends Vue {
  @Action initializeApplication!: () => void;
  @mod.Action loadGroups!: () => void;
  @mod.Getter groups!: () => types.IDisplaySessionGroup[];

  async mounted() {
    await this.initializeApplication();
    await this.loadGroups();
  }
}
</script>
