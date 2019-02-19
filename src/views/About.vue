<template>
  <section>
    <div class="about">
      <h2>Über</h2>
      <dl>
         <dt>Konferenz App</dt>
         <dd>Diese kleine App wurde Entwickelt damit man sich als
           Konferenz-Teilnehmer seine Session zusammenstellen kann. 
           Sie wurde im Rahmen von diversen Live Codings Stream
           entwickelt.<p>Sie darf bei jegliche Konferenz eingesetzt werden.
           Nur ein kurzer Hinweis wäre sehr freundlich.</p></dd>
          <dt>Quelltext</dt>
          <dd><a href="https://github.com/DerAlbertLive/conference-app">GitHub</a></dd>
          <dt>Contributors</dt>
          <dd><a href="https://github.com/DerAlbertLive/conference-app/graphs/contributors">GitHub Contributors</a></dd>
          <dt>Making Of</dt>
          <dd><a href="https://www.youtube.com/watch?v=ckbyySPSAFc&list=PLriglZnq-low43cDxKyQY610STFa5kTge">YouTube</a></dd>
          <dt>Contact</dt>
          <dd>Albert Weinert, <a href="mailto:info@der-albert.com">info@der-albert.com</a></dd>          
      </dl>
    </div>
  </section>
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
