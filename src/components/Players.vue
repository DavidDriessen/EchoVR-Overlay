<template>
  <div :class="showStats ? 'open' : ''">
    <ul class="orange-players">
      <li class="header">
        <div class="stats">
          <div class="stat">Stuns</div>
          <div class="stat">Steals</div>
          <div class="stat">Saves</div>
          <div class="stat">Assists</div>
          <div class="stat">Shots taken</div>
          <div class="stat">Points</div>
        </div>
      </li>
      <li v-for="player in orange" :key="player.number">
        <div class="stats">
          <div class="stat">{{ player.stats.stuns }}</div>
          <div class="stat">{{ player.stats.steals }}</div>
          <div class="stat">{{ player.stats.saves }}</div>
          <div class="stat">{{ player.stats.assists }}</div>
          <div class="stat">{{ player.stats.shotsTaken }}</div>
          <div class="stat">{{ player.stats.points }}</div>
        </div>
        <div class="possession">
          <EchoIcon class="icon" color="#E66000" v-show="player.possession" />
        </div>
        <div class="number">{{ player.number }}</div>
        <div class="name">{{ player.name }}</div>
      </li>
    </ul>
    <ul class="blue-players">
      <li class="header">
        <div class="name"></div>
        <div class="number"></div>
        <div class="possession"></div>
        <div class="stats">
          <div class="stat">Points</div>
          <div class="stat">Shots taken</div>
          <div class="stat">Assists</div>
          <div class="stat">Saves</div>
          <div class="stat">Steals</div>
          <div class="stat">Stuns</div>
        </div>
      </li>
      <li v-for="player in blue" :key="player.number">
        <div class="name">{{ player.name }}</div>
        <div class="number">{{ player.number }}</div>
        <div class="possession">
          <EchoIcon class="icon" color="#488EE7" v-show="player.possession" />
        </div>
        <div class="stats">
          <div class="stat">{{ player.stats.points }}</div>
          <div class="stat">{{ player.stats.shotsTaken }}</div>
          <div class="stat">{{ player.stats.assists }}</div>
          <div class="stat">{{ player.stats.saves }}</div>
          <div class="stat">{{ player.stats.steals }}</div>
          <div class="stat">{{ player.stats.stuns }}</div>
        </div>
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
  @Prop() private showStats!: boolean;
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped lang="scss">
$orange: rgba(230, 96, 0, 0.9);
$blue: rgba(72, 142, 231, 0.9);
ul {
  position: absolute;
  padding: 0;
  opacity: 0.8;
  top: 5vw;
  font-size: 1.5vw;
  list-style: none;
  color: white;
  li {
    transition: margin 1s;
    margin-bottom: 0.3vw;
    div {
      display: inline-block;
    }
    .number {
      border: white solid 3px;
      border-radius: 3px;
      background: black;
      padding: 5px;
      font-weight: bold;
      width: 2vw;
      text-align: center;
      transition: margin 1s;
      margin-left: 0.5vw;
      margin-right: 0.5vw;
    }
    .name {
      border-radius: 2px;
      width: 20vw;
      padding: 0.5vw;
    }
    .possession {
      position: absolute;
      width: 2.7vw;
      height: 2.7vw;
      .icon {
        width: 100%;
        height: 100%;
      }
    }
    .stats {
      .stat {
        padding: 0.5vw;
        width: 3.3vw;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
  .header {
    .name {
      background: transparent !important;
    }
    .number {
      border-color: transparent;
      background: transparent;
    }
    font-size: 1vw;
    .stats {
      .stat {
      }
    }
  }
  &.blue-players {
    right: 0;
    li {
      padding-left: 1vw;
      margin-right: -26vw;
      .number {
        color: $blue;
        margin-right: 4vw;
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
      .possession {
        left: 25.8vw;
      }
      .stats {
        background: linear-gradient(
          90deg,
          $blue 0%,
          $blue 70%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }
  }
  &.orange-players {
    left: 0;
    li {
      padding-left: 1vw;
      margin-left: -27vw;
      .number {
        color: $orange;
        margin-left: 4vw;
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
      .possession {
        right: 25.8vw;
      }
      .stats {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0) 0%,
          $orange 30%,
          $orange 100%
        );
      }
    }
  }
}
.open {
  ul {
    li {
      margin-right: 0 !important;
      margin-left: 0 !important;
      .number {
        margin-left: 0.5vw;
        margin-right: 0.5vw;
      }
      .possession {
        display: none;
      }
    }
  }
}
</style>
