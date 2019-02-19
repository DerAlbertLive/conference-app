<template>
  <section class="Information group">
    <div>
      <h2>Information</h2>
      <dl>
        <dt>Veranstaltungsort</dt>
        <dd>
          <address>
            KOMED im MediaPark GmbH<br />
            Im MediaPark Haus 6 und Haus 7<br />
            50670 Köln
          </address>
        </dd>
        <dt>Anfahrt</dt>
        <dd>
          <a href="https://www.komed-veranstaltungen.de/standort/anfahrt/"
            >Zum Komed</a
          >
        </dd>
        <dt>Website</dt>
        <dd>
          <a href="https://www.dotnet-cologne.de">www.dotnet-cologne.de</a>
        </dd>
        <dt>Twitter</dt>
        <dd>
          <a href="https://twitter.com/dotnetcologne"
            >twitter.com/dotnetcologne</a
          >
        </dd>
        <dt>Hashtag</dt>
        <dd><a href="https://twitter.com/hashtag/dncgn?src=hash">#dncgn</a></dd>
      </dl>
    </div>
  </section>
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
<style lang="scss" scoped>
@import '../_vars.scss';
dl {
  padding: $padding;
}

dt {
  font-weight: bold;
  margin-bottom: $padding;
}

dd {
  margin-left: $padding * 4;
  margin-bottom: $padding;
}
</style>
