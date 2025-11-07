
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// These would typically come from environment variables
const supabaseUrl =
  "http://localhost:54321";
const supabaseKey =
  "your-local-service-role-key";
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration for the sport we want to fetch
// Assignees will modify this to their chosen sport
const SPORT_CONFIG = {
  sport: "basketball",
  league: "mens-college-basketball",
  season: "2023", // Update this to current season
};

/**
 * Fetches player data from ESPN API
 * @param teamId - Optional team ID to filter players
 */
async function fetchPlayersFromESPN(teamId?: string) {
  try {
    // Base URL for ESPN API
    const baseUrl = "https://site.web.api.espn.com/apis/common/v3/sports";

    // Endpoint to get players (this would be different based on the sport)
    // For demonstration purposes, using a team endpoint that returns players
    // Assignees will need to find the right endpoint for their chosen sport
    const endpoint = teamId
      ? `${baseUrl}/${SPORT_CONFIG.sport}/${SPORT_CONFIG.league}/teams/${teamId}/athletes?limit=100`
      : `${baseUrl}/${SPORT_CONFIG.sport}/${SPORT_CONFIG.league}/athletes?limit=100`;

    console.log(`Fetching players from: ${endpoint}`);

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(
        `ESPN API returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
}

/**
 * Fetches player stats for a specific player
 * @param playerId - ESPN player ID
 */
async function fetchPlayerStats(playerId: string) {
  try {
    const baseUrl = "https://site.web.api.espn.com/apis/common/v3/sports";
    const endpoint = `${baseUrl}/${SPORT_CONFIG.sport}/${SPORT_CONFIG.league}/athletes/${playerId}/splits`;

    console.log(`Fetching stats for player ${playerId}`);

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(
        `ESPN API returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching stats for player ${playerId}:`, error);
    throw error;
  }
}

/**
 * Stores player data in Supabase
 * @param players - Array of player data
 */
async function storePlayersInSupabase(players: any[]) {
  try {
    // Process and format the data for storage
    const formattedPlayers = players.map((player) => ({
      player_id: player.id,
      name: player.fullName || `${player.firstName} ${player.lastName}`,
      team: player.team?.displayName || "Unknown",
      position: player.position?.abbreviation || "N/A",
      jersey_number: player.jersey || "N/A",
      height: player.height || null,
      weight: player.weight || null,
      year: player.class?.year || null,
      image_url: player.headshot?.href || null,
      // Add more fields as needed
    }));

    // Insert or update players in the database
    const { data, error } = await supabase
      .from("players")
      .upsert(formattedPlayers, { onConflict: "player_id" });

    if (error) {
      throw error;
    }

    console.log(`Successfully stored ${formattedPlayers.length} players`);
    return data;
  } catch (error) {
    console.error("Error storing players in Supabase:", error);
    throw error;
  }
}

/**
 * Stores player stats in Supabase
 * @param playerId - ESPN player ID
 * @param stats - Player stats data
 */
async function storePlayerStatsInSupabase(playerId: string, stats: any) {
  try {
    // Process and format the stats for storage
    // This will vary depending on the sport and what stats are available
    // This is just an example structure
    const formattedStats = {
      player_id: playerId,
      season: SPORT_CONFIG.season,
      games_played: stats.gamesPlayed || 0,
      points_per_game: stats.points?.avg || 0,
      rebounds_per_game: stats.rebounds?.avg || 0,
      assists_per_game: stats.assists?.avg || 0,
      field_goal_percentage: stats.fieldGoalPercent?.avg || 0,
      three_point_percentage: stats.threePointPercent?.avg || 0,
      free_throw_percentage: stats.freeThrowPercent?.avg || 0,
      // Add more stat fields as needed
      updated_at: new Date().toISOString(),
    };

    // Insert or update stats in the database
    const { data, error } = await supabase
      .from("player_stats")
      .upsert(formattedStats, { onConflict: "player_id" });

    if (error) {
      throw error;
    }

    console.log(`Successfully stored stats for player ${playerId}`);
    return data;
  } catch (error) {
    console.error(`Error storing stats for player ${playerId}:`, error);
    throw error;
  }
}

// Route handler for GET requests
export async function GET() {
  try {
      // Fetch players from ESPN
      const playersData = await fetchPlayersFromESPN();
      const players = playersData.athletes || [];
  
      if (players.length === 0) {
        console.warn("No players found");
        return { message: "No players found" };
      }
  
      // Store players in Supabase
      await storePlayersInSupabase(players);
  
      // For each player, fetch their stats and store them
      // Note: In a production environment, you might want to implement
      // rate limiting or batching to avoid overwhelming the ESPN API
      for (const player of players.slice(0, 10)) {
        // Limiting to 10 players for demonstration
        try {
          const statsData = await fetchPlayerStats(player.id);
          await storePlayerStatsInSupabase(
            player.id,
            statsData.splits?.categories[0].stats || {}
          );
        } catch (error) {
          console.error(`Error processing player ${player.id}:`, error);
          // Continue with the next player
        }
      }
  
    return new Response(JSON.stringify({
      message: "Players fetched and stored successfully"
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
