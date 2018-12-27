<template>
  <div class="sessions">
    <h2>Sessions</h2>
    <SessionGroup
      v-for="(group, index) in groups"
      :group="group"
      :key="group.title"
      :data-cy="'group-' + index"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace, Action, Getter } from 'vuex-class';

import SessionGroup from './SessionGroup.vue';

import * as types from '@/types';

const mod = namespace('sessions');

@Component({
  components: {
    SessionGroup,
  },
})
export default class Sessions extends Vue {
  @Action private initializeApplication!: () => void;
  @mod.Action private loadSessions!: () => void;
  @mod.Getter private groups!: () => types.IDisplaySessionGroup[];

  private async mounted() {
    await this.initializeApplication();
    await this.loadSessions();
  }
}
</script>
<style lang="scss">

</style>

