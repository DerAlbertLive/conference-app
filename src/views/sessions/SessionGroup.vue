<template>
  <section>
    <h3 data-cy="title">{{ group.title }}</h3>
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
  @Prop()
  private group!: IDisplaySessionGroup;
}
</script>

<style lang="sass"></style>
