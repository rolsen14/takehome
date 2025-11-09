export interface PlayerStat {
  player_id: number;
  stat_name: string;
  stat_value: string;
}

export interface StatForChart {
  name: string;
}

export type PlayerStatForChart = Partial<StatForChart> & {
  [key: string]: string;
};

// in the future, it would be more meaningful to attach stats to games:
// export interface Game {
//     id: string;
//     date_time: string;
//     away_team_id: string;
//     home_team_id: string;
// }

// export interface PlayerGameTotalStat {
//     game_id: string;
//     player_id: string;
//     position: string;
//     stat_name: string;
//     stat_value: string;
// } // ex: 123, Libero, Anna Smith, 'digs', 4
