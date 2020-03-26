<template>
  <div
    :class="'map ' + location + ' ' + (mapSmall ? 'map2' : 'map1')"
    :style="{
      width: width / 50 + 'vw',
      height: height / 50 + 'vw'
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
    <echo-icon
      class="disc"
      color="white"
      :style="calcPosition(disc.position, 20)"
    >
    </echo-icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Coordinates, PlayerType, DiscType } from "@/dataTypes";
import EchoIcon from "@/components/EchoIcon.vue";
@Component({
  components: { EchoIcon }
})
export default class MiniMap extends Vue {
  @Prop() private blue!: Array<PlayerType>;
  @Prop() private orange!: Array<PlayerType>;
  @Prop() private disc!: DiscType;
  @Prop() public size!: number;
  @Prop() public location!: string;
  @Prop() public mapSmall!: boolean;
  get height() {
    return 2255 * 0.2 * this.size;
  }
  get width() {
    if (this.mapSmall) return 5591 * 0.2 * this.size;
    else return this.fullWidth;
  }
  get fullWidth() {
    return 10780 * 0.2 * this.size;
  }
  calcPosition(position: Coordinates, boxSize = 14) {
    return {
      top:
        "calc(" +
        ((position.x / 15) * (this.height / 2) + this.height / 2) / 50 +
        "vw - " +
        boxSize / 2 +
        "px)",
      right:
        "calc(" +
        ((position.z / 80) * (this.fullWidth / 2) + this.width / 2) / 50 +
        "vw - " +
        boxSize / 2 +
        "px)"
    };
  }
}
</script>

<style scoped lang="scss">
.disc {
  position: absolute;
  width: 20px;
  height: 20px;
}
.player {
  border-radius: 50%;
  padding: 2px;
  font-weight: bold;
  width: 14px;
  height: 14px;
  text-align: center;
  font-size: 12px;
  position: absolute;
}
.orange {
  background-color: rgba(230, 96, 0, 0.9);
}
.blue {
  background-color: rgba(0, 153, 255, 0.9);
}
.map {
  position: fixed;
  background-size: cover;
  color: white;
  font-size: 25px;
  overflow: hidden;
}
.map1 {
  background-image: url("../assets/full-map.png");
}
.map2 {
  background-image: url("../assets/inner-map.png");
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
