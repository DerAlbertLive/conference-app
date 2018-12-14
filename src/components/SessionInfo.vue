<template>
<div>
    <h3>Session</h3>
    {{item.title}}
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SessionInfo extends Vue {
    @Prop({default:{ title: ' Dummy Title'}}) item;
}
</script>
<style lang="sass">

</style>

