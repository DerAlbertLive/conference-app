<template>
<section>
    <SessionInfo v-for="item in sessions" v-bind:item="item" v-bind:key="item.id" />
</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import SessionInfo from './SessionInfo.vue';
import Component from 'vue-class-component';

@Component({
    components: {SessionInfo}
})
export default class SessionGroup extends Vue {
    @Prop({default:{}}) sessions;
}
</script>
<style lang="sass">

</style>

