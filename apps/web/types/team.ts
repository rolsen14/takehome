import { ESPNTeam } from "./api";

// normalized format for our Supabase database
export interface DropbackTeam {
    id?: string; // TODO: solve for ESPN does not know our ID problem
    name: string;
    espn_team_id: string;
    abbreviation: string;
    location: string;
    is_all_star: boolean;
    division?: string;
    created_at?: string;
  }

  export const mapToDropbackTeam = (team: ESPNTeam): DropbackTeam => {
    return {
        espn_team_id: team.id,
        name: team.displayName,
        abbreviation: team.abbreviation,
        is_all_star: team.isAllStar,
        location: team.location,
    }
  }