import { faker } from "@faker-js/faker";
import { ESPNAthlete, ESPNTeam, espnTeamSchema } from "../../../types/api";
import { DropbackPlayer, mapToDropbackPlayer } from "../../../types/athlete";
import { PlayerStat } from "../../../types/stat";
import { DropbackTeam, mapToDropbackTeam } from "../../../types/team";
import { isESPNError } from "../../../utils/api";
import { supabase } from "../supabase";

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

    const baseUrl = "https://site.api.espn.com/apis/site/v2/sports";
    const endpoint = `${baseUrl}/${SPORT_CONFIG.sport}/${SPORT_CONFIG.league}/teams?limit=100`; // NOTE: limit 100 for take-home purposes

    console.log(`Fetching teams from: ${endpoint}`);

    const response = await fetch(endpoint);
    const data = await response.json();

    if (isESPNError(data)) {
      throw new Error(`ESPN API returned ${JSON.stringify(data)}`);
    }
    const teams = data.sports[0].leagues[0].teams.map(
      (t: { team: ESPNTeam }) => t.team,
    );

    // zod validation for raw data, gracefully skip what does not match
    const filteredTeams: ESPNTeam[] = [];
    for (const team of teams) {
      const result = espnTeamSchema.safeParse(team);
      if (result.success) {
        filteredTeams.push(team);
      }
    }

    console.timeEnd("fetchTeamsFromESPN");

    return filteredTeams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}

/**
 * SEED: represents fetching athlete data from ESPN API for a given team ID
 */
async function fetchAthletesFromESPNSeed(teamId: number) {
  const athletes: ESPNAthlete[] = [];
  const volleyballPositions = [
    "Setter",
    "Outside Hitter",
    "Opposite Hitter",
    "Middle Blocker",
    "Libero",
    "Defensive Specialist",
    "Serving Specialist",
  ];

  for (let i = 0; i < faker.number.int({ min: 10, max: 16 }); i++) {
    athletes.push({
      id:
        faker.number.int({ min: 100, max: 1000 }).toString() +
        faker.number.int({ min: 100, max: 1000 }) +
        faker.number.int({ min: 100, max: 1000 }),
      teamId,
      name: faker.person.fullName(),
      jerseyNumber: faker.number.int({ min: 1, max: 80 }).toString(),
      position:
        volleyballPositions[
          faker.number.int({ min: 0, max: volleyballPositions.length - 1 })
        ] || "Setter",
      height: null,
      weight: null,
      year: null,
      imageUrl: null,
    });
  }

  return athletes;
}

/**
 * Fetches athlete data from ESPN API for a given team ID
 */
async function fetchAthletesFromESPN(teamId: string) {
  try {
    console.time("fetchAthletesFromESPN-" + teamId);

    const baseUrl = "https://site.api.espn.com/apis/site/v2/sports";
    const endpoint = `${baseUrl}/${SPORT_CONFIG.sport}/${SPORT_CONFIG.league}/teams/${teamId}/athletes`;

    console.log(`Fetching athletes from: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (isESPNError(data)) {
      throw new Error(`ESPN API returned ${JSON.stringify(data)}`);
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

    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (isESPNError(data)) {
      throw new Error(`ESPN API returned ${JSON.stringify(data)}`);
    }

    console.timeEnd("fetchPlayerStats-" + playerId);

    return data;
  } catch (error) {
    console.error(`Error fetching stats for player ${playerId}:`, error);
    throw error;
  }
}

/**
 * SEED: represents fetching player stats for a specific player
 * @param playerId - ESPN player ID
 */
async function fetchPlayerStatsSeed(playerId: number) {
  const playerStats: PlayerStat[] = [];

  const keyStats = [
    "setsPlayed",
    "kills",
    "digs",
    "attackErrors",
    "blockSolos",
    "blockAssists",
    "blockingErrors",
    "totalAttempts",
  ];

  for (const stat of keyStats) {
    playerStats.push({
      player_id: playerId,
      stat_name: stat,
      stat_value: faker.number.int({ min: 0, max: 8 }).toString(),
    });
  }
  return playerStats;
}

/**
 * Stores teams data in Supabase
 * @param players - Array of team data
 */
async function storeTeamsInSupabase(teams: DropbackTeam[]) {
  try {
    // TODO: check for duplicate input to avoid constraint error
    const { data, error } = await supabase
      .from("teams")
      .upsert(teams, { onConflict: "name" })
      .select("id, name");

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
async function storePlayersInSupabase(players: Omit<DropbackPlayer, "id">[]) {
  try {
    const { data, error } = await supabase
      .from("players")
      .upsert(players, { onConflict: "name,position,team_id,year" })
      .select("id");

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
 * Stores player statistics data in Supabase
 * @param playerStats - Array of player stat data
 */
async function storePlayerStatsInSupabase(playerStats: PlayerStat[]) {
  try {
    const { data, error } = await supabase
      .from("player_stat")
      .insert(playerStats);

    if (error) {
      throw error;
    }

    console.log(`Successfully stored ${playerStats.length} player stats`);
    return data;
  } catch (error) {
    console.error("Error storing player stats in Supabase:", error);
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
    const teamsWithIds = await storeTeamsInSupabase(mapped);

    for (const team of teamsWithIds) {
      const athletes: ESPNAthlete[] = await fetchAthletesFromESPNSeed(team.id);

      if (athletes.length === 0) {
        console.warn("No athletes found for team: " + team.name);
      } else {
        const mappedPlayers = athletes.map((player) =>
          mapToDropbackPlayer(player, team.id),
        );
        const playersWithIds = await storePlayersInSupabase(mappedPlayers);

        // TODO: implement batching to avoid overwhelming the ESPN API
        for (const player of playersWithIds) {
          try {
            const statsData = await fetchPlayerStatsSeed(player.id);
            await storePlayerStatsInSupabase(statsData);
          } catch (error) {
            console.error(`Error processing player ${player.id}:`, error);
            // continue with the next player
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: "Data fetched and stored successfully",
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
