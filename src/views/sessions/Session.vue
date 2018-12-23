<template>
  
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySpeaker } from '@/types';
import { namespace, Action } from 'vuex-class';
import SessionInfo from '../../components/SessionInfo.vue';

const mod = namespace('sessions');

@Component({
  components: { SessionInfo },
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
<style lang="scss">
</style>

