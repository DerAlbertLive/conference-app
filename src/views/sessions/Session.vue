<template> 
<div>
  <h2 data-cy='title'>{{ session.title }}</h2>
  <p data-cy='abstract'>{{ session.abstract }}</p>
  <div data-cy='speakers'>
    <SpeakerInfo v-for="speaker in session.speakers" :key="speaker.id" :item="speaker" />
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySpeaker } from '@/types';
import { namespace, Action } from 'vuex-class';
import SessionInfo from '../../components/SessionInfo.vue';
import SpeakerInfo from '../speakers/SpeakerInfo.vue';

const mod = namespace('sessions');

@Component({
  components: { SessionInfo, SpeakerInfo },
})
export default class Session extends Vue {
  @Action private initializeApplication!: () => void;
  @mod.Action private loadSession!: (id: string) => void;
  @mod.Getter private session!: IDisplaySpeaker;

  private async mounted() {
    await this.initializeApplication();
    await this.loadSession(this.$route.params.id);
  }
}
</script>
<style lang="scss"></style>
