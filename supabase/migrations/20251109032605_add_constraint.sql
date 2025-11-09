ALTER TABLE players
ADD CONSTRAINT unique_player_traits UNIQUE (name, position, team_id, year);