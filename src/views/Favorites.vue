<template>
  <div class="favorites">
    <Sessions msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sessions from '@/components/Sessions.vue'; // @ is an alias to /src

@Component({
  components: {
    Sessions,
  },
})
export default class Favorites extends Vue {

}
</script>
