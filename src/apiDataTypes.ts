// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
namespace API {
  export interface StatsType {
    points: number;
    possession_time: number;
    shots_taken: number;
    steals: number;
    saves: number;
    stuns: number;
    passes: number;
    assists: number;
    goals: number;
    catches: number;
    blocks: number;
    interceptions: number;
  }

  // noinspection SpellCheckingInspection
  export interface PlayerType {
    stunned: boolean;
    invulnerable: boolean;
    blocking: boolean;
    number: number;
    level: number;
    playerid: number;
    name: string;
    possession: boolean;
    stats: StatsType;
    position: Array<number>;

    rhand: Array<number>;
    lhand: Array<number>;
    left: Array<number>;
    up: Array<number>;
    forward: Array<number>;
    velocity: Array<number>;
    userid: number;
  }

  export interface TeamType {
    team: string;
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
  export interface DiscType {
    position: Array<number>;
    velocity: Array<number>;
    bounce_count: number;
  }

  export interface DataType {
    client_name: string;
    sessionid: string;
    match_type: string;
    teams: ArrayLike<TeamType>;
    game_clock_display: string;
    game_status: string;
    blue_points: number;
    orange_points: number;
    last_score: ScoredType;
    disc: DiscType;
    private_match: boolean;
    game_clock: number;
  }
}
