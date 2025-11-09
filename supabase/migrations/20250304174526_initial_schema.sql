-- TEAMS
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  espn_team_id TEXT NULL UNIQUE,
  image_url TEXT UNIQUE,
  abbreviation TEXT NOT NULL,
  location TEXT,
  is_all_star boolean NOT NULL DEFAULT false,
  division TEXT NOT NULL,
  mascot TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PLAYERS
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  espn_player_id text NOT NULL UNIQUE,
  name TEXT NOT NULL,
  team_id INTEGER NOT NULL REFERENCES teams,
  position TEXT,
  jersey_number TEXT,
  height NUMERIC,
  weight NUMERIC,
  year TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);