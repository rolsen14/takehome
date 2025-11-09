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