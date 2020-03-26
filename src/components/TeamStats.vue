<template>
  <div class="states">
    <div class="header">
      Team stats
    </div>
    <div class="row">
      <div class="left">{{ moment(orangeStats.possessionTime) }}</div>
      <div class="center">Possession</div>
      <div class="right">{{ moment(blueStats.possessionTime) }}</div>
    </div>
    <div class="row">
      <div class="left">{{ orangeStats.shotsTaken }}</div>
      <div class="center">Shots taken</div>
      <div class="right">{{ blueStats.shotsTaken }}</div>
    </div>
    <div class="row" v-for="header in headers" :key="header">
      <div class="left">{{ orangeStats[header] }}</div>
      <div class="center">{{ header }}</div>
      <div class="right">{{ blueStats[header] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { StatsType } from "@/dataTypes";

@Component
export default class TeamStats extends Vue {
  @Prop() private blueStats!: StatsType;
  @Prop() private orangeStats!: StatsType;
  headers = ["assists", "saves", "steals", "stuns", "passes"];
  moment(min: number) {
    return (
      (Math.floor(min / 60) < 10 ? "0" : "") +
      Math.floor(min / 60) +
      ":" +
      (min % 60 < 10 ? "0" : "") +
      (min % 60)
    );
  }
}
</script>

<style scoped lang="scss">
.states {
  position: fixed;
  top: 21vw;
  left: 50%;
  width: 34vw;
  margin-left: -17vw;
  font-size: 1.5vw;
  color: white;
  text-transform: uppercase;
  text-align: center;
  border-spacing: 0.5vw;
  font-weight: bold;
  .header {
    font-size: 2vw;
  }
  .row {
    margin-bottom: 0.5vw;
    & > div {
      display: inline-block;
      background: rgba(0, 0, 0, 0.9);
      padding: 0.2vw;
    }
    .left {
      width: 4vw;
    }
    .center {
      width: 10vw;
      border: white solid 0.3vw;
    }
    .right {
      width: 4vw;
    }
  }
}
</style>
