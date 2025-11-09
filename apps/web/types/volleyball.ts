
export interface Game {
    id: string;
    date_time: string;
    away_team_id: string;
    home_team_id: string;
}

export interface PlayerGameTotalStat {
    game_id: string;
    player_id: string;
    position: string;
    stat_name: string;
    stat_value: string;
} // ex: 123, Libero, anna grade, digs, 4
