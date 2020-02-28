<template>
  <div
    :class="'map ' + location"
    :style="{
      width: width + 'px',
      height: height + 'px',
      'background-position-y': -140 * size + 'px'
    }"
  >
    <div
      v-for="player in orange"
      :key="player.number"
      class="player orange"
      :style="calcPosition(player.position)"
    >
      {{ player.number }}
    </div>
    <div
      v-for="player in blue"
      :key="player.number"
      class="player blue"
      :style="calcPosition(player.position)"
    >
      {{ player.number }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Coordinates, PlayerType } from "@/dataTypes";

@Component
export default class MiniMap extends Vue {
  @Prop() private blue!: Array<PlayerType>;
  @Prop() private orange!: Array<PlayerType>;
  @Prop() public size!: number;
  @Prop() public location!: string;
  get height() {
    return 400 * this.size;
  }
  get width() {
    return 1920 * this.size;
  }
  calcPosition(position: Coordinates) {
    const boxSize = 11;
    return {
      top:
        (position.x / 15) * (this.height / 2) +
        this.height / 2 -
        boxSize / 2 +
        "px",
      right:
        (position.z / 80) * (this.width / 2) +
        this.width / 2 -
        boxSize / 2 +
        "px"
    };
  }
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
  background-image: url("../assets/map.jpg");
  background-size: cover;
  color: white;
  font-size: 25px;
}
.br {
  bottom: 0;
  right: 0;
}
.bl {
  bottom: 0;
  left: 0;
}
</style>
