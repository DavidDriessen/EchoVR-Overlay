// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
namespace API {
  export interface StatsType {
    possession_time: number;
    shots_taken: number;
    saves: number;
    stuns: number;
    passes: number;
    assists: number;
  }

  // noinspection SpellCheckingInspection
  export interface PlayerType {
    stunned: boolean;
    invulnerable: boolean;
    blocking: boolean;
    number: number;
    playerid: number;
    name: string;
    possession: boolean;
    stats: StatsType;
    position: Array<number>;
  }

  export interface TeamType {
    players: Array<PlayerType>;
    possession: boolean;
    stats: StatsType;
  }

  export interface ScoredType {
    team: string;
    disc_speed: number;
    goal_type: string;
    point_amount: number;
    distance_thrown: number;
    person_scored: string;
    assist_scored: string;
  }

  export interface DataType {
    teams: ArrayLike<TeamType>;
    game_clock_display: string;
    game_status: string;
    blue_points: number;
    orange_points: number;
    last_score: ScoredType;
  }
}
