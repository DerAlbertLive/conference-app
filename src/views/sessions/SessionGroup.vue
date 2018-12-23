<template>
  <section>
    <h2 data-cy="title">{{ group.title }}</h2>
    <SessionInfo
      v-for="(item, index) in group.sessions"
      :item="item"
      :key="item.id"
      :data-cy="'info-' + index"
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
