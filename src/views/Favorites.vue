<template>
  <div class="groups">
    <h2>Favoriten</h2>
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
import SessionGroup from './sessions/SessionGroup.vue';
import { Action, namespace } from 'vuex-class';
import * as types from '../types';

const mod = namespace('favorites');

@Component({
  components: {
    SessionGroup,
  },
})
export default class Favorites extends Vue {
  @Action private initializeApplication!: () => void;
  @mod.Action private loadSessions!: () => void;
  @mod.Getter private groups!: () => types.IDisplaySessionGroup[];
  private async mounted() {
    await this.initializeApplication();
    await this.loadSessions();
    if (this.groups && this.groups.length === 0) {
      this.redirectToSessions();
    }
  }
  private redirectToSessions() {
    this.$router.push({name:'sessions'});
  }
}
</script>
