<template>
  <div class="about">
    <h2>Sprecher</h2>
    <SpeakerGroup
      v-for="group in groups"
      v-bind:key="group.title"
      v-bind:group="group"
      class="speakerGroup"
    ></SpeakerGroup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IDisplaySpeakerGroup } from '@/types';
import { namespace, Action } from 'vuex-class';
import SpeakerGroup from '../components/SpeakerGroup.vue';
import { SessionService } from '../services/SessionService';

const mod = namespace('speakers');
const modG = namespace('global');

@Component({
  components: { SpeakerGroup },
})
export default class Speakers extends Vue {
  @Action initializeApplication!: () => void;
  @mod.Action loadGroups!: () => void;
  @mod.Getter groups!: IDisplaySpeakerGroup[];

  async mounted() {
    await this.initializeApplication();
    await this.loadGroups();
  }
}
</script>
<style lang="scss"></style>
