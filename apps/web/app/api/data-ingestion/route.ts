
import { createClient } from "@supabase/supabase-js";
import { isESPNError } from "../../../utils/api";
import { ESPNAthlete, ESPNTeam } from "../../../types/api";
import { DropbackTeam, mapToDropbackTeam } from "../../../types/team";
import { DropbackPlayer, mapToDropbackPlayer } from "../../../types/athlete";

const supabaseUrl =
  "http://localhost:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
  // using default supabase local key
const supabase = createClient(supabaseUrl, supabaseKey);

const SPORT_CONFIG = {
  sport: "volleyball",
  league: "womens-college-volleyball",
  season: "2025",
};

/**
 * Fetches teams from ESPN API
 */
async function fetchTeamsFromESPN() {
  try {
    console.time("fetchTeamsFromESPN");

    const base_url = "https://site.api.espn.com/apis/site/v2/sports";
    const endpoint = `${base_url}/${SPORT_CONFIG.sport}/${SPORT_CONFIG.league}/teams?limit=100`; 
    // NOTE: selected limit for take-home purposes, would need to determine actual reasonable limitations/batching if this was prod

    console.log(`Fetching teams from: ${endpoint}`);
    
    const response = await fetch(endpoint);
    const data = await response.json();

    if (isESPNError(data)) {
      throw new Error(
        `ESPN API returned ${JSON.stringify(data)}`
      );
    }
    const teams = data.sports[0].leagues[0].teams.map((t: any) => t.team);

    // TODO: use zod for filtering/validations
    const filteredTeams: ESPNTeam[] = [];
    for (const team of teams) {
      console.log(JSON.stringify(team));
      if ('name' in team && team.name !== 'null') {
        if ('id' in team && Number(team.id) > 0) {
          filteredTeams.push(team);
        }
      }
    }

    console.timeEnd('fetchTeamsFromESPN');

    return filteredTeams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}


/**
 * Fetches athlete data from ESPN API for a given team ID
 */
async function fetchAthletesFromESPN(teamId: string) {
  try {
    console.time("fetchAthletesFromESPN-" + teamId);

    const base_url = "https://site.api.espn.com/apis/site/v2/sports";
    const endpoint = `${base_url}/${SPORT_CONFIG.sport}/${SPORT_CONFIG.league}/teams/${teamId}/roster`; 

    console.log(`Fetching athletes from: ${endpoint}`);
    
    const response = await fetch(endpoint, { method: 'GET', headers: { 'Content-Type': 'application/json'}});
    const data = await response.json();

    if (isESPNError(data)) {
      throw new Error(
        `ESPN API returned ${JSON.stringify(data)}`
      );
    }

    console.timeEnd("fetchAthletesFromESPN-" + teamId);

    return data;
  } catch (error) {
    console.error("Error fetching athletes:", error);
    throw error;
  }
}

/**
 * Fetches player stats for a specific player
 * @param playerId - ESPN player ID
 */
async function fetchPlayerStats(playerId: string) {
  try {
    console.time("fetchPlayerStats-" + playerId);

    const baseUrl = "https://site.web.api.espn.com/apis/common/v3/sports";
    const endpoint = `${baseUrl}/${SPORT_CONFIG.sport}/${SPORT_CONFIG.league}/athletes/${playerId}/splits`;

    console.log(`Fetching stats from: ${endpoint}`);
    
    const response = await fetch(endpoint, { method: 'GET', headers: { 'Content-Type': 'application/json'}});
    const data = await response.json();

    if (isESPNError(data)) {
      throw new Error(
        `ESPN API returned ${JSON.stringify(data)}`
      );
    }

    console.timeEnd("fetchPlayerStats-" + playerId);

    return data;
  } catch (error) {
    console.error(`Error fetching stats for player ${playerId}:`, error);
    throw error;
  }
}

/**
 * Stores teams data in Supabase
 * @param players - Array of team data
 */
async function storeTeamsInSupabase(teams: DropbackTeam[]) {
  try {
    // TODO: ensure there are no duplicates in input, otherwise this will throw
    // a constraint error
    const { data, error } = await supabase
      .from("teams")
      .upsert(teams, { onConflict: "name" });

    if (error) {
      throw error;
    }

    console.log(`Successfully stored ${teams.length} teams`);
    return data;
  } catch (error) {
    console.error("Error storing teams in Supabase:", error);
    throw error;
  }
}

/**
 * Stores player data in Supabase
 * @param players - Array of player data
 */
async function storePlayersInSupabase(players: DropbackPlayer[]) {
  try {
    const { data, error } = await supabase
      .from("players")
      .upsert(players, { onConflict: "name,player,year" });

    if (error) {
      throw error;
    }

    console.log(`Successfully stored ${players.length} players`);
    return data;
  } catch (error) {
    console.error("Error storing players in Supabase:", error);
    throw error;
  }
}


/**
 * Completes the entire data-ingestion process: fetching teams, athletes, stats
 */
export async function GET() {
  try {
      const teams: ESPNTeam[] = await fetchTeamsFromESPN();
      const mapped = teams.map((team) => mapToDropbackTeam(team));
      await storeTeamsInSupabase(mapped);

      for (const team of teams) {
        const athletes: ESPNAthlete[] = await fetchAthletesFromESPN(team.id);

        if (athletes.length === 0) {
          console.warn("No athletes found for team: " + team.name);
        } else {

          // const mappedPlayers = athletes.map((player) => mapToDropbackPlayer(player));
          // await storePlayersInSupabase(mappedPlayers);

          // // For each player, fetch their stats and store them
          // // Note: In a production environment, you might want to implement
          // // rate limiting or batching to avoid overwhelming the ESPN API
          // for (const player of mappedPlayers.slice(0, 10)) {
          //   // Limiting to 10 players for demonstration
          //   try {
          //     // const statsData = await fetchPlayerStats(player.id);
          //     // await storePlayerStatsInSupabase(
          //     //   player.id,
          //     //   statsData.splits?.categories[0].stats || {}
          //     // );
          //   } catch (error) {
          //     console.error(`Error processing player ${player.id}:`, error);
          //     // Continue with the next player
          //   }
          // }
        }
      }
  
    return new Response(JSON.stringify({
      message: "Data fetched and stored successfully"
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
