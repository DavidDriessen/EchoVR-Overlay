<template>
  <div id="app" @click="debug = !debug">
    <div class="message">
      <div v-if="options.demo">
        Demo
      </div>
      <div v-if="gameData.gameState === 'offline'">
        Game is offline
      </div>
      <div v-if="gameData.gameState === 'lobby'">
        Lobby
      </div>
    </div>
    <ul class="log" v-if="debug">
      Log:
      <li v-for="er in log" :key="er">
        {{ er.code ? er.code : er.type }}: {{ er.message }}
      </li>
    </ul>
    <Header
      v-show="show.hud"
      :blue_score="gameData.blue.points"
      :orange_score="gameData.orange.points"
      :orange_name="options.orange"
      :blue_name="options.blue"
      :time="gameData.gameTime"
    />
    <Players
      v-show="show.hud"
      :show-stats.sync="options.playerStats && show.stats"
      :blue.sync="gameData.blue.players"
      :orange.sync="gameData.orange.players"
    />
    <TeamStats
      v-if="options.teamStats"
      v-show="show.hud && show.stats"
      :blue-stats.sync="gameData.blue.stats"
      :orange-stats.sync="gameData.orange.stats"
    />
    <Scored v-if="show.hud && show.goal" :scored.sync="gameData.lastScore" />
    <MiniMap
      v-if="options.miniMap"
      v-show="show.hud && gameData.gameState !== 'pre_match' && !show.stats"
      :blue.sync="gameData.blue.players"
      :orange.sync="gameData.orange.players"
      :disc.sync="gameData.disc"
      :size="options.miniMap.size"
      :location="options.miniMap.position"
      :map-small="!options.miniMap.fullMap"
    />
    <player-state
      v-if="options.playerStat"
      v-show="show.hud && gameData.player"
      :player="gameData.player"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from "axios";
import Header from "@/components/Header.vue";
import TeamStats from "@/components/TeamStats.vue";
import Scored from "@/components/Scored.vue";
import { DataType } from "@/dataTypes";
import Players from "@/components/Players.vue";
import MiniMap from "@/components/MiniMap.vue";
import PlayerState from "@/components/PlayerState.vue";

@Component({
  components: {
    PlayerState,
    MiniMap,
    Players,
    Header,
    TeamStats,
    Scored
  },
  methods: {}
})
export default class App extends Vue {
  gameData = {} as DataType;
  show = { stats: false, hud: true, goal: false };
  debug = false;
  options = {
    demo: false,
    orange: "",
    blue: "",
    miniMap: {
      size: 1,
      position: "br",
      fullMap: true
    },
    teamStats: true,
    playerStat: true,
    playerStats: true
  };
  log: { type: string; code: string; message: string }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conf: any;
  // noinspection JSUnusedGlobalSymbols
  beforeMount() {
    if (this.conf) this.options = this.conf;
    this.gameData = new DataType();
    if (this.options.demo) this.runDemo();
    else this.fetch();
  }

  fetch() {
    let call;
    if (process.env.NODE_ENV == "production")
      call = axios.get("http://127.0.0.1:6721/session", { timeout: 200 });
    else call = axios.get("/test-data.json");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call
      .then(response => {
        this.gameData = new DataType(response.data);
        if (process.env.NODE_ENV == "production") this.fetch();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.error(error.code == "ECONNABORTED");
        if (error.response) {
          switch (error.response.status) {
            case 404:
              // In lobby
              this.gameData.gameState = "lobby";
              break;
            case 500:
              // Error in api
              this.gameData.gameState = "error";
              break;
            default:
              // Something went wrong game-side.
              this.gameData.gameState = "error";
          }
        } else {
          if (error.code == "ECONNABORTED" || error.message == "Network Error")
            // Game not running
            this.gameData.gameState = "offline";
          // Something went wrong overlay-side.
          else {
            this.gameData.gameState = "error";
            this.log.push({
              type: "ClientError",
              code: error.code,
              message: error.message
            });
          }
        }
        this.log.push({
          type: "ClientError",
          code: error.code,
          message: error.message
        });
        if (process.env.NODE_ENV == "production") this.fetch();
      });
  }

  @Watch("gameData.gameState")
  onChangedGameState(value: string, oldValue: string) {
    switch (value) {
      case "error":
      case "offline":
      case "lobby":
        this.show.hud = false;
        this.show.goal = false;
        this.show.stats = false;
        break;
      case "pre_match":
        this.show.hud = true;
        this.show.goal = false;
        this.show.stats = false;
        break;
      case "round_over":
        break;
      case "post_match":
        this.show.hud = true;
        this.show.goal = false;
        this.show.stats = true;
        break;
      case "round_start":
        this.show.hud = true;
        this.show.goal = false;
        this.show.stats =
          this.gameData.blue.points > 0 || this.gameData.orange.points > 0;
        break;
      case "score":
        this.show.hud = true;
        this.show.goal = true;
        this.show.stats = false;
        break;
      case "playing":
        this.show.hud = true;
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

  runDemo() {
    this.gameData = new DataType({
      disc: {
        position: [0.0, 0.0, 0.0],
        velocity: [0.0, 0.0, 0.0],
        // eslint-disable-next-line @typescript-eslint/camelcase
        bounce_count: 0
      },
      sessionid: "0A34E0FC-DE95-4516-A594-CCD61CC29071",
      // eslint-disable-next-line @typescript-eslint/camelcase
      orange_points: 4,
      // eslint-disable-next-line @typescript-eslint/camelcase
      private_match: false,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_name: "Hamsterbil",
      // eslint-disable-next-line @typescript-eslint/camelcase
      game_clock_display: "00:39.54",
      // eslint-disable-next-line @typescript-eslint/camelcase
      game_status: "pre_match",
      // eslint-disable-next-line @typescript-eslint/camelcase
      game_clock: 39.544437,
      // eslint-disable-next-line @typescript-eslint/camelcase
      match_type: "Echo_Arena",
      teams: [
        {
          players: [
            {
              name: "lolzarethebest",
              rhand: [1.3540001, 0.347, 36.025002],
              playerid: 1,
              position: [1.677, 0.93000007, 35.552002],
              lhand: [1.7870001, 0.32700002, 35.624001],
              userid: 1974001562636403,
              stats: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                possession_time: 40.501732,
                points: 4,
                saves: 0,
                goals: 0,
                stuns: 5,
                passes: 0,
                catches: 0,
                steals: 0,
                blocks: 0,
                interceptions: 0,
                assists: 2,
                // eslint-disable-next-line @typescript-eslint/camelcase
                shots_taken: 2
              },
              number: 22,
              level: 50,
              possession: true,
              left: [0.96600002, 0.116, -0.23100001],
              invulnerable: false,
              up: [-0.050000001, 0.96100003, 0.27200001],
              forward: [0.25300002, -0.252, 0.93400002],
              stunned: false,
              velocity: [-0.44000003, 0.74900001, -0.22000001],
              blocking: false
            },
            {
              name: "UnguardedFour58",
              rhand: [1.4400001, -1.243, -29.041002],
              playerid: 3,
              position: [1.4770001, -0.73400003, -29.567001],
              lhand: [1.8130001, -1.3160001, -29.729002],
              userid: 2368674609835371,
              stats: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                possession_time: 56.502354,
                points: 6,
                saves: 1,
                goals: 0,
                stuns: 2,
                passes: 0,
                catches: 0,
                steals: 0,
                blocks: 0,
                interceptions: 0,
                assists: 0,
                // eslint-disable-next-line @typescript-eslint/camelcase
                shots_taken: 4
              },
              number: 12,
              level: 50,
              possession: false,
              left: [-0.25300002, -0.148, -0.95600003],
              invulnerable: false,
              up: [0.34100002, 0.91100007, -0.23100001],
              forward: [0.90500003, -0.384, -0.18000001],
              stunned: false,
              velocity: [0.074000001, -0.38900003, -0.013],
              blocking: false
            },
            {
              name: "x_gaming",
              rhand: [7.3110003, -7.3570004, 23.293001],
              playerid: 5,
              position: [7.4440002, -6.5430002, 23.535002],
              lhand: [7.5510006, -7.3350005, 23.766001],
              userid: 1759194590844392,
              stats: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                possession_time: 38.027275,
                points: 0,
                saves: 0,
                goals: 0,
                stuns: 1,
                passes: 0,
                catches: 0,
                steals: 0,
                blocks: 0,
                interceptions: 0,
                assists: 3,
                // eslint-disable-next-line @typescript-eslint/camelcase
                shots_taken: 0
              },
              number: 13,
              level: 50,
              possession: false,
              left: [0.85400003, -0.0050000004, 0.52000004],
              invulnerable: true,
              up: [0.14600001, 0.96200007, -0.23100001],
              forward: [-0.49900001, 0.273, 0.82300001],
              stunned: false,
              velocity: [-1.266, 2.7770002, 2.572],
              blocking: false
            }
          ],
          team: "BLUE TEAM",
          possession: true,
          stats: {
            points: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            possession_time: 135.03137,
            interceptions: 0,
            blocks: 0,
            steals: 0,
            catches: 0,
            passes: 0,
            saves: 1,
            goals: 0,
            stuns: 8,
            assists: 5,
            // eslint-disable-next-line @typescript-eslint/camelcase
            shots_taken: 6
          }
        },
        {
          players: [
            {
              name: "DJ_Echooo",
              rhand: [4.8660002, -3.6200001, -30.083002],
              playerid: 0,
              position: [4.9780002, -2.6860001, -30.082001],
              lhand: [5.1530004, -3.6500001, -30.054001],
              userid: 2641159782568346,
              stats: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                possession_time: 31.510298,
                points: 2,
                saves: 0,
                goals: 0,
                stuns: 2,
                passes: 0,
                catches: 0,
                steals: 1,
                blocks: 0,
                interceptions: 0,
                assists: 1,
                // eslint-disable-next-line @typescript-eslint/camelcase
                shots_taken: 3
              },
              number: 5,
              level: 44,
              possession: false,
              left: [0.75100005, 0.16100001, 0.64100003],
              invulnerable: false,
              up: [0.077000007, 0.94200003, -0.32600001],
              forward: [-0.65600002, 0.294, 0.69500005],
              stunned: false,
              velocity: [-0.317, -0.080000006, -0.16800001],
              blocking: false
            },
            {
              name: "Hamsterbil",
              rhand: [6.5120001, -4.9780002, 30.986002],
              playerid: 2,
              position: [6.6230001, -4.3830004, 31.030001],
              lhand: [6.4320002, -5.2620001, 31.126001],
              userid: 2355372624492830,
              stats: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                possession_time: 23.534037,
                points: 2,
                saves: 0,
                goals: 0,
                stuns: 11,
                passes: 0,
                catches: 0,
                steals: 0,
                blocks: 0,
                interceptions: 0,
                assists: 1,
                // eslint-disable-next-line @typescript-eslint/camelcase
                shots_taken: 1
              },
              number: 18,
              level: 49,
              possession: false,
              left: [0.27600002, -0.089000002, 0.95700002],
              invulnerable: false,
              up: [0.35100001, 0.93600005, -0.015000001],
              forward: [-0.89500004, 0.34, 0.289],
              stunned: false,
              velocity: [-3.7030001, 2.2920001, 2.1300001],
              blocking: false
            },
            {
              name: "manmosh",
              rhand: [0.65400004, -3.006, 29.362001],
              playerid: 4,
              position: [0.53800005, -2.5940001, 29.550001],
              lhand: [0.31600001, -3.0360003, 29.431002],
              userid: 3145929062136602,
              stats: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                possession_time: 35.728519,
                points: 0,
                saves: 0,
                goals: 0,
                stuns: 2,
                passes: 0,
                catches: 0,
                steals: 0,
                blocks: 0,
                interceptions: 0,
                assists: 0,
                // eslint-disable-next-line @typescript-eslint/camelcase
                shots_taken: 1
              },
              number: 27,
              level: 50,
              possession: false,
              left: [-0.99500006, 0.079000004, -0.066],
              invulnerable: false,
              up: [0.072000004, 0.99200004, 0.108],
              forward: [0.074000001, 0.10200001, -0.99200004],
              stunned: false,
              velocity: [-0.15700001, 0.32500002, -4.9370003],
              blocking: false
            }
          ],
          team: "ORANGE TEAM",
          possession: false,
          stats: {
            points: 4,
            // eslint-disable-next-line @typescript-eslint/camelcase
            possession_time: 90.772858,
            interceptions: 0,
            blocks: 0,
            steals: 1,
            catches: 0,
            passes: 0,
            saves: 0,
            goals: 0,
            stuns: 15,
            assists: 2,
            // eslint-disable-next-line @typescript-eslint/camelcase
            shots_taken: 5
          }
        }
      ],
      // eslint-disable-next-line @typescript-eslint/camelcase
      blue_points: 10,
      // eslint-disable-next-line @typescript-eslint/camelcase
      last_score: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        disc_speed: 0.0,
        team: "orange",
        // eslint-disable-next-line @typescript-eslint/camelcase
        goal_type: "INSIDE SHOT",
        // eslint-disable-next-line @typescript-eslint/camelcase
        point_amount: 2,
        // eslint-disable-next-line @typescript-eslint/camelcase
        distance_thrown: 4.214704,
        // eslint-disable-next-line @typescript-eslint/camelcase
        person_scored: "lolzarethebest",
        // eslint-disable-next-line @typescript-eslint/camelcase
        assist_scored: "x_gaming"
      }
    });
    const interval = 2000;
    setTimeout(() => {
      this.gameData.gameState = "playing";
      setTimeout(() => {
        this.gameData.gameState = "score";
        setTimeout(() => {
          this.gameData.gameState = "round_start";
          setTimeout(() => {
            this.runDemo();
          }, interval);
        }, interval);
      }, interval);
    }, interval);
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
.message {
  & > div {
    position: absolute;
    background: rgba(0, 0, 0, 0.48);
    color: white;
    font-size: 1.5vw;
    padding: 1vw;
    border-bottom-right-radius: 2vw;
  }
}
.log {
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.48);
  color: white;
  font-size: 1.5vw;
  padding: 1vw;
  border-top-left-radius: 2vw;
  border-bottom-left-radius: 2vw;
  li {
    list-style: none;
  }
  height: 40vw;
  width: 30vw;
  overflow-y: scroll;
  z-index: 50;
}
</style>
