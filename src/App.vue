<template>
  <div id="app">
    <Header
      v-show="show.header"
      :blue_score="gameData.blue.points"
      :orange_score="gameData.orange.points"
      :orange_name="options.orange"
      :blue_name="options.blue"
      :time="gameData.gameTime"
    ></Header>
    <Players
      v-show="show.header"
      :blue.sync="gameData.blue.players"
      :orange.sync="gameData.orange.players"
    ></Players>
    <Stats
      v-if="show.stats"
      :blue-stats.sync="gameData.blue.stats"
      :orange-stats.sync="gameData.orange.stats"
    ></Stats>
    <Scored v-if="show.goal" :scored.sync="gameData.lastScore"></Scored>
    <MiniMap
      v-if="options.miniMap"
      v-show="show.header && !show.stats"
      :blue.sync="gameData.blue.players"
      :orange.sync="gameData.orange.players"
      :disc.sync="gameData.disc"
      :size="options.mapSize"
      :location="options.mapPos"
    ></MiniMap>
    <ScoreBoard
      v-if="options.scoreboard"
      v-show="show.stats"
      :blue.sync="gameData.blue.players"
      :orange.sync="gameData.orange.players"
    ></ScoreBoard>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from "axios";
import Header from "@/components/Header.vue";
import Stats from "@/components/Stats.vue";
import Scored from "@/components/Scored.vue";
import { DataType } from "@/dataTypes";
import Players from "@/components/Players.vue";
import MiniMap from "@/components/MiniMap.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";

@Component({
  components: {
    ScoreBoard,
    MiniMap,
    Players,
    Header,
    Stats,
    Scored
  },
  methods: {}
})
export default class App extends Vue {
  gameData = {} as DataType;
  show = { stats: false, header: true, goal: false };
  options = {
    liveTest: false,
    orange: "",
    blue: "",
    miniMap: false,
    mapSize: 0.5,
    mapPos: "br",
    scoreboard: false
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conf: any;
  // noinspection JSUnusedGlobalSymbols
  beforeMount() {
    if (this.conf) this.options = this.conf;
    this.parseParams();
    this.gameData = new DataType();
    this.fetch();
  }

  fetch() {
    let call;
    if (process.env.NODE_ENV == "production")
      call = axios.get("http://127.0.0.1/session");
    else if (this.options.liveTest) call = axios.get("/session");
    else call = axios.get("/test-data.json");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call
      .then(response => {
        this.gameData = new DataType(response.data);
        if (process.env.NODE_ENV == "production" || this.options.liveTest)
          this.fetch();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              // In lobby
              this.gameData.gameState = "lobby";
              break;
            case 500:
              // Error in api
              this.gameData.gameState = "error";
              console.log(error);
              break;
            default:
              // Something went wrong.
              this.gameData.gameState = "error";
              console.error(error);
          }
        } else {
          // Game not running
          this.gameData.gameState = "offline";
        }
        if (process.env.NODE_ENV == "production" || this.options.liveTest)
          this.fetch();
      });
  }

  @Watch("gameData.gameState")
  onChangedGameState(value: string, oldValue: string) {
    switch (value) {
      case "error":
      case "offline":
      case "lobby":
        this.show.header = false;
        this.show.goal = false;
        this.show.stats = false;
        break;
      case "pre_match":
        this.show.header = false;
        this.show.goal = false;
        this.show.stats = false;
        break;
      case "round_over":
        break;
      case "post_match":
        break;
      case "round_start":
        this.show.header = true;
        this.show.goal = false;
        this.show.stats =
          this.gameData.blue.points > 0 || this.gameData.orange.points > 0;
        break;
      case "score":
        this.show.header = true;
        this.show.goal = true;
        this.show.stats = false;
        break;
      case "playing":
        this.show.header = true;
        this.show.goal = false;
        this.show.stats = false;
        break;
      case "":
        switch (oldValue) {
          case "score":
            break;
          case "pre_match":
            break;
        }
        break;
    }
  }
  parseParams() {
    if (window.location.search === "") return {};
    decodeURIComponent(window.location.search)
      .slice(1)
      .split("&")
      .map(i => {
        const o = i.split("=");
        switch (o[0]) {
          case "blue":
            this.options.blue = o[1];
            break;
          case "orange":
            this.options.orange = o[1];
            break;
          case "liveTest":
            this.options.liveTest = true;
            break;
          case "scoreboard":
            this.options.scoreboard = true;
            break;
          case "miniMap":
            this.options.miniMap = true;
            break;
          case "mapSize":
            this.options.mapSize = parseFloat(o[1]);
            break;
          case "mapPos":
            if (["br", "bl"].indexOf(o[1]) >= 0) this.options.mapPos = o[1];
            break;
        }
      });
  }
}
</script>

<style lang="scss">
#app {
  /*background: gray;*/
  font-family: Bahnschrift, serif;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
