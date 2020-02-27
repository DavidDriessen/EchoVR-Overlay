<template>
  <div class="scored">
    <div class="header">
      {{ scored.goalType }} : {{ scored.pointAmount }} Points
    </div>
    <div class="body">
      <span v-show="!assistScored">Scored by</span>
      <h3>{{ scored.personScored.name }}</h3>
      <h7 v-if="assistScored">ASSISTED BY {{ assistScored }}</h7>
    </div>
    <div class="footer">
      {{ discSpeed | round(2) }} m/s - {{ scored.distanceThrown | round(2) }} m
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
  position: fixed;
  top: 300px;
  left: 50%;
  width: 600px;
  margin-left: -300px;
  font-size: 27px;
  color: white;
  border-collapse: collapse;
  .header {
    background: rgba(0, 0, 0, 0.71);
    text-align: center;
    border-radius: 30px;
    padding: 15px;
  }
  .body {
    text-align: center;
    padding: 30px;
    font-size: 30px;
    line-height: 45px;
  }
  .footer {
    background: rgba(0, 0, 0, 0.71);
    text-align: center;
    border-radius: 30px;
    padding: 15px;
  }
}
</style>
