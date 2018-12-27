<template>
  <div class="about">
    <h2>Sprecher</h2>
    <SpeakerGroup
      v-for="(group, index) in groups"
      :key="group.title"
      :group="group"
      :data-cy="'group-' + index"
      class="speakerGroup"
    ></SpeakerGroup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IDisplaySpeakerGroup } from '@/types';
import { namespace, Action } from 'vuex-class';
import SpeakerGroup from './SpeakerGroup.vue';
import { SessionService } from '@/services/SessionService';

const mod = namespace('speakers');

@Component({
  components: { SpeakerGroup },
})
export default class Speakers extends Vue {
  @Action private initializeApplication!: () => void;
  @mod.Action private loadGroups!: () => void;
  @mod.Getter private groups!: IDisplaySpeakerGroup[];

  private async mounted() {
    await this.initializeApplication();
    await this.loadGroups();
  }
}
</script>
<style lang="scss">
</style>
