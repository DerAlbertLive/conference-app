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
    <section v-if="groups.length===0"  class="group">
    <h3>Bitte wähle ein paar Sessions aus, damit diese hier in Deinen Favoriten angezeigt werden.</h3>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
]);

import SessionGroup from './sessions/SessionGroup.vue';
import { Action, namespace } from 'vuex-class';
import * as types from '../types';
import { Route } from 'vue-router';

const mod = namespace('favorites');

@Component({
  components: {
    SessionGroup,
  },
})
export default class Favorites extends Vue {
  public static userNavigation = false;

  @Action private initializeApplication!: () => void;
  @mod.Action private loadSessions!: () => void;
  @mod.Getter private groups!: () => types.IDisplaySessionGroup[];
  private async mounted() {
    await this.initializeApplication();
    await this.loadSessions();

    if (Favorites.userNavigation) {
      return;
    } else if (this.groups && this.groups.length === 0) {
      this.redirectToSessions();
    }
  }
  private beforeRouteEnter(to: Route, from: Route, next: any) {
    Favorites.userNavigation = from.name != null;
    next();
  }
  private redirectToSessions() {
    this.$router.push({ name: 'sessions' });
  }
}
</script>
