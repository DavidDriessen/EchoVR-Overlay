<template>
  <div v-if="player" :class="'player ' + player.team.color">
    <div class="name">{{ player.name }}</div>
    <div class="stat">Points {{ player.stats.points }}</div>
    <div class="stat">Assists {{ player.stats.assists }}</div>
    <div class="stat">Saves {{ player.stats.saves }}</div>
    <div class="stat">Steals {{ player.stats.steals }}</div>
    <div class="stat">Stuns {{ player.stats.stuns }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EchoIcon from "@/components/EchoIcon.vue";
import { PlayerType } from "@/dataTypes";

@Component({
  components: {
    EchoIcon
  }
})
export default class PlayerState extends Vue {
  @Prop() private player!: PlayerType;
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped lang="scss">
.orange {
  background: rgb(248, 149, 15);
  background: linear-gradient(
    90deg,
    rgba(248, 149, 15, 1) 0%,
    rgba(248, 149, 15, 1) 20%,
    rgba(248, 149, 15, 0.7539216370141807) 45%,
    rgba(248, 149, 15, 0) 100%
  );
}
.blue {
  background: rgb(0, 138, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 138, 255, 1) 0%,
    rgba(0, 138, 255, 1) 20%,
    rgba(0, 138, 255, 0.7539216370141807) 45%,
    rgba(0, 138, 255, 0) 100%
  );
}
.player {
  position: absolute;
  bottom: 0;
  color: white;
  height: 3.2vw;
  font-size: 1.2vw;
  width: 60vw;
  div {
    float: left;
    margin: 0.5vw;
  }
}
.name {
  border-radius: 2px;
  padding: 0.4vw;
  width: 15vw;
  text-align: center;
  justify-content: center;
}
.stat {
  border: white solid 2px;
  text-transform: uppercase;
  padding: 0.3vw;
}
</style>
