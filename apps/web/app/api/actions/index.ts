"use server";

import { createClient } from "../supabase";

const supabase = createClient();

/**
 * Fetches all players from the database
 */
export async function getPlayers() {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("name");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

/**
 * Fetches player stats for specific players
 * @param playerIds - Array of player IDs to fetch stats for
 */
export async function getPlayerStats(playerIds: string[]) {
  try {
    const { data, error } = await supabase
      .from("player_stats")
      .select("*")
      .in("player_id", playerIds);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching player stats:", error);
    return [];
  }
}

/**
 * Fetches player data with stats combined
 * @param playerId - Player ID to fetch data for
 */
export async function getPlayerWithStats(playerId: string) {
  try {
    // Fetch player data
    const { data: playerData, error: playerError } = await supabase
      .from("players")
      .select("*")
      .eq("player_id", playerId)
      .single();

    if (playerError) {
      throw playerError;
    }

    // Fetch player stats
    const { data: statsData, error: statsError } = await supabase
      .from("player_stats")
      .select("*")
      .eq("player_id", playerId)
      .single();

    if (statsError && statsError.code !== "PGRST116") {
      // PGRST116 is "No rows returned"
      throw statsError;
    }

    // Combine the data
    return {
      ...playerData,
      stats: statsData || null,
    };
  } catch (error) {
    console.error(`Error fetching player data for ${playerId}:`, error);
    return null;
  }
}

/**
 * Compares two players
 * @param player1Id - First player ID
 * @param player2Id - Second player ID
 */
export async function comparePlayers(player1Id: string, player2Id: string) {
  try {
    const player1 = await getPlayerWithStats(player1Id);
    const player2 = await getPlayerWithStats(player2Id);

    return { player1, player2 };
  } catch (error) {
    console.error("Error comparing players:", error);
    return { player1: null, player2: null };
  }
}
