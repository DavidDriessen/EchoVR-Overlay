<template>
  <div class="scoreboard">
    <table v-if="blue.length > 0" class="blue">
      <thead>
        <th>Name</th>
        <th>Points</th>
        <th>Assists</th>
        <th>Saves</th>
        <th>Stuns</th>
      </thead>
      <tbody>
        <tr v-for="player in blue" :key="player.number">
          <td class="name">{{ player.name }}</td>
          <td>{{ player.stats.points }}</td>
          <td>{{ player.stats.assists }}</td>
          <td>{{ player.stats.saves }}</td>
          <td>{{ player.stats.stuns }}</td>
        </tr>
      </tbody>
    </table>
    <table v-if="orange.length > 0" class="orange">
      <thead>
        <th>Name</th>
        <th>Points</th>
        <th>Assists</th>
        <th>Saves</th>
        <th>Stuns</th>
      </thead>
      <tbody>
        <tr v-for="player in orange" :key="player.number">
          <td class="name">{{ player.name }}</td>
          <td>{{ player.stats.points }}</td>
          <td>{{ player.stats.assists }}</td>
          <td>{{ player.stats.saves }}</td>
          <td>{{ player.stats.stuns }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
$orange: rgba(230, 124, 53, 0.9);
$blue: rgb(63, 174, 223);
.scoreboard{
  position: absolute;
  top: 30%;
  left: 20px;
}
table{
  border-spacing: 5px ;
  color: white;
}
td{
  background: rgba(128, 128, 128, 0.3);
  width: 60px;
  text-align: center;
  padding: 10px;
}
.name{
  width: 200px;
  text-align: left;
}
.orange {
  background: $orange;
}
.blue {
  background: $blue;
}
</style>
