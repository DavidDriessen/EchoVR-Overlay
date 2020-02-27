<template>
  <table>
    <tr v-for="player in orange" :key="player.number">
      <td>{{ player.name }}</td>
    </tr>
    <tr v-for="player in blue" :key="player.number">
      <td>{{ player.name }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PlayerType } from "@/dataTypes";

@Component({})
export default class ScoreBoard extends Vue {
  @Prop() private blue!: Array<PlayerType>;
  @Prop() private orange!: Array<PlayerType>;
}
</script>

<style scoped lang="scss">
$orange: rgba(230, 96, 0, 0.9);
$blue: rgba(72, 142, 231, 0.9);
</style>
