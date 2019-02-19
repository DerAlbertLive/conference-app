<template>
  <section class="group">
    <div>
      <h2>{{ information.title }}</h2>
      <dl>
        <template v-for="item in information.items">
          <dt :key="item.term">{{ item.term }}</dt>
          <dd>
            <address v-if="item.address" v-html="brIt(item.address)"></address>
            <a v-if="item.link" :href="item.link.href">{{item.link.caption}}</a>
          </dd>
        </template>
      </dl>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { IConferenceInformation } from '@/types';

@Component({
  filters: {
    br(value: string) {
      return value.replace('\r\n', '<br/>').replace(/\n/g, '<br/>');
    },
  },
})
export default class Information extends Vue {
  @Action private initializeApplication!: () => void;
  @Getter private information!: IConferenceInformation;
  private async mounted() {
    await this.initializeApplication();
  }

  private brIt(value : string) {
      return value.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
  }
}
</script>
