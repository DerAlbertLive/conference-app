<template>
  <div class="Information"><h2>Information</h2></div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component
export default class Information extends Vue {
  @Action private initializeApplication!: () => void;

  private async mounted() {
    await this.initializeApplication();
  }
}
</script>
