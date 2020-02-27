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
      :blue="gameData.blue.players"
      :orange="gameData.orange.players"
    ></Players>
    <Stats
      v-if="show.stats"
      :blue-stats.sync="gameData.blue.stats"
      :orange-stats.sync="gameData.orange.stats"
    ></Stats>
    <Scored v-if="show.goal" :scored.sync="gameData.lastScore"></Scored>
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

@Component({
  components: {
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
  options = {};
  beforeMount() {
    this.options = this.parseParams();
    this.gameData = new DataType();
    this.fetch();
    // setInterval(this.fetch, 3000);
  }

  fetch() {
    let call;
    if (process.env.NODE_ENV == "production")
      call = axios.get("http://127.0.0.1/session");
    // else call = axios.get("/session");
    else call = axios.get("/test-data.json");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call
      .then(response => {
        this.gameData = new DataType(response.data);
        if (process.env.NODE_ENV == "production") this.fetch();
        // setTimeout(this.fetch, 1000);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              // In lobby
              this.gameData.gameState = "lobby";
              break;
            default:
              // Something went wrong.
              this.gameData.gameState = "error";
          }
        } else {
          // Game not running
          this.gameData.gameState = "offline";
        }
        if (process.env.NODE_ENV == "production") this.fetch();
      });
  }

  @Watch("gameData.gameState")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChangedGameState(value: string, oldValue: string) {
    switch (value) {
      case "error":
      case "offline":
      case "lobby":
        this.show.header = false;
        this.show.goal = false;
        this.show.stats = false;
        break;
      case "":
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
      default:
    }
  }
  parseParams() {
    if (window.location.search === "") return {};
    return JSON.parse(
      '{"' +
        decodeURIComponent(window.location.search)
          .slice(1)
          .split("&")
          .map(i => i.split("=").join('":"'))
          .join('","') +
        '"}'
    );
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
