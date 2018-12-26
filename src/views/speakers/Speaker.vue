<template>
  <div class="speaker" data-cy="speaker">
    <h2 data-cy="name">{{ speaker.name }}</h2>
    <img :src="speaker.imageUrl" :alt="altText" />
    <p data-cy="bio">{{ speaker.bio }}</p>
    <SessionInfo
      v-for="(item, index) in speaker.sessions"
      :item="item"
      :key="item.id"
      :data-cy="'info-' + index"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySpeaker } from '@/types';
import { namespace, Action } from 'vuex-class';
import SessionInfo from '../../components/SessionInfo.vue';

const mod = namespace('speakers');

@Component({
  components: { SessionInfo },
})
export default class Speaker extends Vue {
  @Action private initializeApplication!: () => void;
  @mod.Action private loadSpeaker!: (id: string) => void;
  @mod.Getter private speaker!: IDisplaySpeaker;

  private async mounted() {
    await this.initializeApplication();
    await this.loadSpeaker(this.$route.params.id);
  }
  get altText() {
    return `Picture of ${this.speaker.name}`;
  }
}
</script>
<style lang="scss">
speaker .img {
  margin-bottom: 1em;
}
</style>
