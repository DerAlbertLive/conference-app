<template>
  <div class="about"><h2>Über</h2></div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component
export default class About extends Vue {
  @Action private initializeApplication!: () => void;

  private async mounted() {
    await this.initializeApplication();
  }
}
</script>
