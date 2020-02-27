<template>
  <header>
    <div class="orange-name">{{ orange_name }}</div>
    <div class="orange">{{ orange_score }}</div>
    <div class="time">{{ time }}</div>
    <div class="blue">{{ blue_score }}</div>
    <div class="blue-name">{{ blue_name }}</div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() private blue_score!: number;
  @Prop() private orange_score!: number;
  @Prop() private orange_name!: string;
  @Prop() private blue_name!: string;
  @Prop() private time!: number;
}
</script>

<style scoped lang="scss">
header {
  position: relative;
  top: 0;
  height: 90px;
  width: 700px;
  text-align: center;
  margin: auto;
  background-image: url("../assets/Echo score overlay.svg");
  background-size: contain;
  color: white;
  font-size: 30px;

  .blue {
    position: absolute;
    top: 20px;
    right: 180px;
  }
  .blue-name {
    position: absolute;
    top: 45px;
    left: calc(100% - 120px);
    width: 500px;
    text-align: left;
  }
  .orange {
    position: absolute;
    top: 20px;
    left: 180px;
  }
  .orange-name {
    position: absolute;
    top: 45px;
    right: calc(100% - 120px);
    width: 500px;
    text-align: right;
  }
  .time {
    text-align: center;
    position: absolute;
    top: 25px;
    width: 100px;
    left: 50%;
    margin-left: -50px;
  }
}
</style>
