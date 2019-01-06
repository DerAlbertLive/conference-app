<template>
  <div class="session">
    <h2 data-cy="title">{{ session.title }}</h2>
    <div class="fav">
      <svg
        @click="toggle(session)"
        data-cy="fav"
        v-bind:class="[session.favorite ? 'favorite' : '']"
      >
        <use xlink:href="#star--sprite"></use>
      </svg>
    </div>

    <p data-cy="abstract">{{ session.abstract }}</p>
    <div data-cy="speakers" class="group">
      <SpeakerInfo
        class="item"
        v-for="speaker in session.speakers"
        :key="speaker.id"
        :item="speaker"
      />
    </div>
  </div>
</template>
<script lang="ts">
import '@/assets/star.svg?sprite';

import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySpeaker, IDisplaySession } from '@/types';
import { namespace, Action } from 'vuex-class';
import SessionInfo from './SessionInfo.vue';
import SpeakerInfo from '../speakers/SpeakerInfo.vue';

const mod = namespace('sessions');

@Component({
  components: { SessionInfo, SpeakerInfo },
})
export default class Session extends Vue {
  @Action private initializeApplication!: () => void;
  @mod.Action private loadSession!: (id: string) => void;
  @mod.Getter private session!: IDisplaySpeaker;
  @Action private toggleFavorite!: (session: IDisplaySession) => void;

  private async mounted() {
    await this.initializeApplication();
    await this.loadSession(this.$route.params.id);
  }

  private toggle(session: IDisplaySession) {
    this.toggleFavorite(session);
  }
}
</script>
<style lang="scss">
.session {
  display: grid;
  grid-template-columns: auto 2em;
  grid-template-rows: min-content auto auto;

  h2 {
    background-color: var(--groups-header-color);
    grid-column-start: 1;
    grid-row-start: 1;
  }

  div.fav {
    cursor: pointer;
    grid-column-start: 2;
    grid-row-start: 1;
    background-color: #66add6;
    svg {
      width: 2em;
      height: 2em;
      fill: #ccc;
    }
    svg.favorite {
      fill: #ece313;
    }
  }

  p {
    grid-column-start: span 2;
    grid-row-start: 2;
    padding: 0.4em;
    line-height: 1.2em;
    margin-bottom: 1rem;
    text-align: justify;
  }

  div {
    grid-column-start: span 2;
    grid-row-start: 3;
  }
}
</style>
