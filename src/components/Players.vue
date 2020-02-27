<template>
  <div>
    <ul class="orange-players">
      <li v-for="player in orange" :key="player.number">
        <!--        <EchoIcon-->
        <!--          class="icon"-->
        <!--          color="#E66000"-->
        <!--          v-show="player.possession"-->
        <!--        ></EchoIcon>-->
        <div class="number">{{ player.number }}</div>
        <div class="separator"></div>
        <div class="name">{{ player.name }}</div>
      </li>
    </ul>
    <ul class="blue-players">
      <li v-for="player in blue" :key="player.number">
        <!--        <EchoIcon-->
        <!--          class="icon"-->
        <!--          color="#488EE7"-->
        <!--          v-show="player.possession"-->
        <!--        ></EchoIcon>-->
        <div class="number">{{ player.number }}</div>
        <div class="separator"></div>
        <div class="name">{{ player.name }}</div>
      </li>
    </ul>
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
export default class Players extends Vue {
  @Prop() private blue!: Array<PlayerType>;
  @Prop() private orange!: Array<PlayerType>;
}
</script>

<style scoped lang="scss">
$orange: rgba(230, 96, 0, 0.9);
$blue: rgba(72, 142, 231, 0.9);
ul {
  padding: 0;
  opacity: 0.8;
  top: 50px;
  font-size: 25px;
  list-style: none;
  color: white;
}
.icon {
  position: absolute;
  width: 40px;
  height: 40px;
  margin-top: 3px;
}
.number {
  border: white solid 3px;
  border-radius: 3px;
  background: black;
  padding: 5px;
  font-weight: bold;
  width: 40px;
  /*height: 40px;*/
  text-align: center;
}
.separator {
  border: solid 3px;
  width: 2px;
  border-radius: 2px;
  margin-left: 3px;
  margin-right: 3px;
  height: 40px;
}
.name {
  border-radius: 2px;
  width: 300px;
  padding: 8px;
}
.orange-players {
  position: fixed;
  left: 20px;

  div {
    float: left;
  }
  .number {
    color: $orange;
    margin-left: 50px;
  }
  .separator {
    border-color: $orange;
  }
  .name {
    text-align: left;
    background: linear-gradient(
      90deg,
      $orange 0%,
      $orange 20%,
      rgba(0, 0, 0, 0) 100%
    );
  }
}
.blue-players {
  position: fixed;
  right: 20px;

  div {
    float: right;
  }
  .icon {
    right: 0;
  }
  .number {
    color: $blue;
    margin-right: 50px;
  }
  .separator {
    border-color: $blue;
  }
  .name {
    text-align: right;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      $blue 80%,
      $blue 100%
    );
  }
}
</style>
