import { ESPNTeam } from "./api";

// normalized format for our Supabase database
export interface DropbackTeam {
  id?: number;
  name: string;
  espn_team_id: string;
  abbreviation: string;
  location: string;
  is_all_star: boolean;
  division?: string;
  created_at?: string;
  image_url?: string;
}

export const mapToDropbackTeam = (team: ESPNTeam): DropbackTeam => {
  return {
    espn_team_id: team.id,
    name: team.displayName,
    abbreviation: team.abbreviation,
    is_all_star: team.isAllStar,
    location: team.location,
    image_url: team.logos[0]?.href,
  };
};
