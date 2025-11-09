import { ESPNAthlete, ESPNTeam } from "./api";

// normalized format for our Supabase database
export interface DropbackPlayer {
    id?: string; // TODO: solve for ESPN does not know our player ID problem
    espnPlayerId: string;
    name: string;
    teamId: string;
    position: string;
    jerseyNumber: string;
    height: string;
    weight: string;
    year: string;
    createdAt?: string;
  }

  export const mapToDropbackPlayer = (player: ESPNAthlete): DropbackPlayer => {
    return {
        espnPlayerId: "123",
        name: "test",
        teamId: "1",
        position: "12345",
        jerseyNumber: "123",
        height: "123456",
        weight: "234",
        year: "123",
        // espnPlayerId: player.id,
        // name: player.fullName || `${player.firstName} ${player.lastName}`,
        // team: player.team?.displayName || "Unknown",
        // position: player.position?.abbreviation || "N/A",
        // jerseyNumber: player.jersey || "N/A",
        // height: player.height || null,
        // weight: player.weight || null,
        // year: player.class?.year || null,
    }
  }