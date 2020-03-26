<template>
  <div class="scored">
    <div class="header">
      <h1>GOAL</h1>
      <h3>{{ scored.goalType }} : {{ scored.pointAmount }} PTS</h3>
    </div>
    <div class="footer">
      <div :class="'body ' + scored.team.color">
        <span v-show="!assistScored">Scored by</span>
        {{ scored.personScored.name }}
        <br />
        <span v-if="assistScored">ASSISTED BY {{ assistScored }}</span>
      </div>
      <div class="states">
        <div class="stat">
          <font-awesome-icon class="icon" icon="tachometer-alt" />
          <div>{{ discSpeed | round(0) }}m/s</div>
          <small>Disc speed</small>
        </div>
        <div class="stat">
          <font-awesome-icon class="icon" icon="ruler" />
          <div>{{ scored.distanceThrown | round(0) }}m</div>
          <small>Throw distance</small>
        </div>
        <!--        <div class="stat">-->
        <!--          <font-awesome-icon class="icon" icon="stopwatch" />-->
        <!--          <div>00:28</div>-->
        <!--          <small>Goal time</small>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ScoredType } from "@/dataTypes";

@Component({
  filters: {
    round: (value: number, decimals: number) => {
      if (!value) value = 0;
      if (!decimals) decimals = 0;
      return (
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
      );
    }
  }
})
export default class Scored extends Vue {
  @Prop() private scored!: ScoredType;
  discSpeed = 0.54587354;
  assistScored = "";
  // noinspection JSUnusedGlobalSymbols
  beforeMount() {
    if (this.scored) {
      this.discSpeed = this.scored.discSpeed;
      this.assistScored = this.scored.assistScored
        ? this.scored.assistScored.name
        : "";
    }
  }
}
</script>

<style scoped lang="scss">
.scored {
  text-shadow: -2px -1px black;
  text-align: center;
  color: white;
  & > div {
    position: fixed;
    left: 50%;
    margin-left: -17vw;
    width: 34vw;
  }
  .header {
    top: 15vw;
    h1 {
      font-size: 5vw;
      line-height: 0;
    }
    h3 {
      font-size: 2vw;
    }
  }
  .footer {
    bottom: 5vw;
    font-size: 1.3vw;
    .body {
      padding-top: 1vw;
      padding-bottom: 1vw;
      margin-bottom: 0.3vw;
      &.blue {
        background: rgb(0, 138, 255);
        background: linear-gradient(
          90deg,
          rgba(0, 138, 255, 0) 0%,
          rgba(0, 138, 255, 1) 20%,
          rgba(0, 138, 255, 1) 80%,
          rgba(0, 138, 255, 0) 100%
        );
      }
      &.orange {
        background: rgb(248, 149, 15);
        background: linear-gradient(
          90deg,
          rgba(248, 149, 15, 0) 0%,
          rgba(248, 149, 15, 1) 20%,
          rgba(248, 149, 15, 1) 80%,
          rgba(248, 149, 15, 0) 100%
        );
      }
    }
    .stat {
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.7);
      border: white solid 0.2vw;
      margin: 0.4vw;
      width: 15vw;
      height: 3vw;
      padding: 0.3vw;
      text-transform: uppercase;
      .icon {
        float: left;
        margin-top: 0.5vw;
        margin-left: 0.2vw;
        font-size: 2vw;
      }
      small {
        font-size: 0.8vw;
      }
    }
  }
}
</style>
