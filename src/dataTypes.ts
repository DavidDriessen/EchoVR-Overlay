export class StatsType {
  possessionTime: number;
  shotsTaken: number;
  steals: number;
  saves: number;
  stuns: number;
  passes: number;
  assists: number;
  points: number;

  constructor(data: API.StatsType | undefined) {
    if (data) {
      this.possessionTime = Math.round(data.possession_time);
      this.shotsTaken = data.shots_taken;
      this.steals = data.steals;
      this.points = data.points;
      this.saves = data.saves;
      this.stuns = data.stuns;
      this.passes = data.passes;
      this.assists = data.assists;
    } else {
      this.possessionTime = 0;
      this.shotsTaken = 0;
      this.points = 0;
      this.steals = 0;
      this.saves = 0;
      this.stuns = 0;
      this.passes = 0;
      this.assists = 0;
    }
  }
}

export class Coordinates {
  x: number;
  y: number;
  z: number;

  constructor(data: Array<number>) {
    if (data && data.length == 3) {
      this.x = data[0];
      this.y = data[1];
      this.z = data[2];
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
  }
}

export class PlayerType {
  stats: StatsType;
  name: string;
  number: number;
  stunned: boolean;
  playerId: number;
  blocking: boolean;
  possession: boolean;
  invulnerable: boolean;
  position: Coordinates;
  team: TeamType;

  constructor(data: API.PlayerType, team: TeamType) {
    this.name = data.name;
    this.number = data.number;
    this.stunned = data.stunned;
    this.playerId = data.playerid;
    this.blocking = data.blocking;
    this.possession = data.possession;
    this.invulnerable = data.invulnerable;
    this.stats = new StatsType(data.stats);
    this.position = new Coordinates(data.position);
    this.team = team;
  }
}

export class TeamType {
  name: string;
  color: string;
  points: number;
  stats: StatsType;
  possession: boolean;
  players: Array<PlayerType>;

  constructor(data: API.TeamType, points: number, color: string) {
    this.color = color;
    this.name = data.team;
    this.players = [];
    this.points = points;
    this.possession = data.possession;
    this.stats = new StatsType(data.stats);
    if (data.players)
      for (const player of data.players) {
        this.players.push(new PlayerType(player, this));
      }
  }
}

export interface ScoredType {
  team: TeamType | undefined;
  discSpeed: number;
  goalType: string;
  pointAmount: number;
  distanceThrown: number;
  personScored: PlayerType | undefined;
  assistScored: PlayerType | undefined;
}

export class DiscType {
  position: Coordinates;
  velocity: Coordinates;
  bounceCount: number;
  constructor(data: API.DiscType) {
    this.position = new Coordinates(data.position);
    this.velocity = new Coordinates(data.velocity);
    this.bounceCount = data.bounce_count;
  }
}

export class DataType {
  gameTime: string;
  gameState: string;
  player: PlayerType | undefined;
  blue: TeamType;
  orange: TeamType;
  lastScore: ScoredType;
  disc: DiscType;

  constructor(data: API.DataType | undefined = undefined) {
    if (data) {
      this.gameTime = data.game_clock_display;
      this.gameState = data.game_status;
      this.disc = new DiscType(data.disc);
      this.blue = new TeamType(data.teams[0], data.blue_points, "blue");
      this.orange = new TeamType(data.teams[1], data.orange_points, "orange");
      this.player = this.findMember(data.client_name);
      if (data.last_score.goal_type == "[NO GOAL]") {
        this.lastScore = {} as ScoredType;
      } else {
        this.lastScore = {
          goalType: data.last_score.goal_type,
          pointAmount: data.last_score.point_amount,
          discSpeed: data.last_score.disc_speed,
          distanceThrown: data.last_score.distance_thrown
        } as ScoredType;
        if (data.last_score.team == "blue") this.lastScore.team = this.blue;
        else this.lastScore.team = this.orange;
        this.lastScore.personScored = this.findMember(
          data.last_score.person_scored
        );
        this.lastScore.assistScored = this.findMember(
          data.last_score.assist_scored
        );
      }
    } else {
      this.gameTime = "00:00";
      this.gameState = "";
      this.disc = new DiscType({} as API.DiscType);
      this.blue = new TeamType({} as API.TeamType, 0, "blue");
      this.orange = new TeamType({} as API.TeamType, 0, "orange");
      this.lastScore = {} as ScoredType;
    }
  }

  findMember(name: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tmp: string | any[] = [];
    if (this.blue.players) tmp = this.blue.players.filter(m => m.name == name);
    if (this.orange.players && tmp.length == 0)
      tmp = this.orange.players.filter(m => m.name == name);
    if (tmp.length == 0) return undefined;
    return tmp[0];
  }
}
