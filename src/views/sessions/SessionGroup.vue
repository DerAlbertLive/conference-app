<template>
  <section>
    <SessionInfo
      v-for="item in group.sessions"
      v-bind:item="item"
      v-bind:key="item.id"
    />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IDisplaySessionGroup } from '@/types';
import SessionInfo from '@/components/SessionInfo.vue';

@Component({
  components: { SessionInfo },
})
export default class SessionGroup extends Vue {
  @Prop({ default: {} })
  private group!: IDisplaySessionGroup;
}
</script>

<style lang="sass"></style>
