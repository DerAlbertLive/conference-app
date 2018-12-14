<template>
  <div class="favorites">
    <h2>Favoriten</h2>
    <SessionGroup v-bind:sessions="sessions" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SessionGroup from '@/components/SessionsGroup.vue'; // @ is an alias to /src

@Component({
  components: {
    SessionGroup,
  },
})
export default class Favorites extends Vue {
    sessions = [{id:0,title:"Eins"}, {id:1,title:"Zwei"}, {id:2,title:"Drei"}]
}
</script>
