<template>
  <div
    class="map"
    :style="{
      width: 1920 * size + 'px',
      height: 440 * size + 'px',
      'background-position-y': -120 * size + 'px'
    }"
  >
    <div
      v-for="player in orange"
      :key="player.number"
      class="player orange"
      :style="{
        top: (player.position.z + 440 / 2) * size + 'px',
        left: (player.position.x + 1920 / 2) * size + 'px'
      }"
    >
      {{ player.number }}
    </div>
    <div
      v-for="player in blue"
      :key="player.number"
      class="player blue"
      :style="{
        top: (player.position.z + 440 / 2) * size + 'px',
        left: (player.position.x + 1920 / 2) * size + 'px'
      }"
    >
      {{ player.number }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PlayerType } from "@/dataTypes";

@Component({})
export default class MiniMap extends Vue {
  @Prop() private blue!: Array<PlayerType>;
  @Prop() private orange!: Array<PlayerType>;
  @Prop() private size = 0.4;
}
</script>

<style scoped lang="scss">
.player {
  border: white solid 1px;
  border-radius: 5px;
  background: black;
  padding: 5px;
  font-weight: bold;
  width: 10px;
  height: 10px;
  text-align: center;
  font-size: 10px;
  position: absolute;
}
.orange {
  color: rgba(230, 96, 0, 0.9);
}
.blue {
  color: rgba(72, 142, 231, 0.9);
}
.map {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-image: url("../assets/map.jpg");
  background-size: cover;
}
</style>
