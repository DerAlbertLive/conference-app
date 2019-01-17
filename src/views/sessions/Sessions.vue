<template>
  <div class="groups">
    <div class="session-header">
      <h2>Sessions</h2>
      <div class="svg">
        <svg @click="toggle" data-cy="btn-search">
          <use xlink:href="#search--sprite"></use>
        </svg>
      </div>
    </div>
    <input
      autofocus
      @input="searchSession"
      data-cy="search-input"
      v-if="showSearch"
      type="text"
    />
    <SessionGroup
      class="group"
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
  @mod.Action private toggleSearch!: () => void;
  @mod.Action private search!: (text: string) => void;
  @mod.Getter private groups!: () => types.IDisplaySessionGroup[];
  @mod.Getter private showSearch!: () => boolean;

  private async mounted() {
    await this.initializeApplication();
    await this.loadSessions();
  }
  private toggle() {
    this.toggleSearch();
  }

  private searchSession(e: any) {
    this.search(e.target.value);
  }
}
</script>
<style lang="scss">
@import '@/_vars.scss';

.session-header {
  display: flex;
  flex-direction: row;
  h2 {
    flex-grow: 1;
  }
  .svg {
    background-color: $groups-header-color;
    svg {
      width: 1em;
      height: 1em;
      padding: $padding;
    }
  }
}

.groups {
  input {
    font-size: inherit;
    width: 100%;
    line-height: 1.5em;
  }
}
</style>
