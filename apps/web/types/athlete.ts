import { ESPNAthlete } from "./api";
import { DropbackTeam } from "./team";

// normalized format for our Supabase database
export interface DropbackPlayer {
  id: number;
  espn_player_id: string;
  name: string;
  team_id: number;
  position: string;
  jersey_number: string;
  height: number | null;
  weight: number | null;
  year: string | null;
  image_url: string | null;
  created_at?: string;
}

export interface FullDropbackPlayer extends DropbackPlayer {
  team: Pick<DropbackTeam, "name" | "image_url">;
}

export interface FullDropbackPlayerWithStats extends DropbackPlayer {
  team: Pick<DropbackTeam, "name" | "image_url">;
  stats: Map<string, string>;
}

export const mapToDropbackPlayer = (
  player: ESPNAthlete,
  dropback_team_id: number,
): Omit<DropbackPlayer, "id"> => {
  return {
    espn_player_id: player.id,
    name: player.name,
    team_id: dropback_team_id,
    position: player.position || "N/A",
    jersey_number: player.jerseyNumber || "N/A",
    height: player.height || null,
    weight: player.weight || null,
    year: player.year || null,
    image_url: player.imageUrl,
  };
};
