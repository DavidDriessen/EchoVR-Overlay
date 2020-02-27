<template>
  <table class="states">
    <tr>
      <td class="left">{{ orangeStats.possessionTime }}</td>
      <td class="center">Possession time</td>
      <td class="right">{{ blueStats.possessionTime }}</td>
    </tr>
    <tr>
      <td class="left">{{ orangeStats.shotsTaken }}</td>
      <td class="center">Shots taken</td>
      <td class="right">{{ blueStats.shotsTaken }}</td>
    </tr>
    <tr>
      <td class="left">{{ orangeStats.saves }}</td>
      <td class="center">Saves</td>
      <td class="right">{{ blueStats.saves }}</td>
    </tr>
    <tr>
      <td class="left">{{ orangeStats.stuns }}</td>
      <td class="center">Stuns</td>
      <td class="right">{{ blueStats.stuns }}</td>
    </tr>
    <tr>
      <td class="left">{{ orangeStats.passes }}</td>
      <td class="center">Passes</td>
      <td class="right">{{ blueStats.passes }}</td>
    </tr>
    <tr>
      <td class="left">{{ orangeStats.assists }}</td>
      <td class="center">Assists</td>
      <td class="right">{{ blueStats.assists }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { StatsType } from "@/dataTypes";

@Component
export default class Stats extends Vue {
  @Prop() private blueStats!: StatsType;
  @Prop() private orangeStats!: StatsType;
}
</script>

<style scoped lang="scss">
.states {
  position: fixed;
  top: 200px;
  left: 50%;
  width: 600px;
  margin-left: -300px;
  font-size: 27px;
  color: white;
  border-collapse: collapse;
  tr {
    background-image: url("../assets/Echo states overlay.svg");
    height: 70px;
    td {
      width: 300px;
    }
    .left {
      text-align: right;
      padding-right: 70px;
    }
    .center {
      text-align: center;
    }
    .right {
      text-align: left;
      padding-left: 70px;
    }
  }
}
</style>
