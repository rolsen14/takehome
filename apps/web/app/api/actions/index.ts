"use server";

import {
  FullDropbackPlayer,
  FullDropbackPlayerWithStats,
} from "../../../types/athlete";
import { supabase } from "../supabase";

/**
 * Fetches all players from the database
 */
export async function getPlayers() {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("*, team: teams ( name, image_url )")
      .order("name");

    if (error) {
      throw error;
    }

    return data as FullDropbackPlayer[];
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

/**
 * Fetches player data with stats combined
 * @param playerId - Player ID to fetch data for
 */
export async function getPlayerWithStats(playerId: number) {
  try {
    // Fetch player data
    const { data: playerData, error: playerError } = await supabase
      .from("players")
      .select("*, team: teams ( name, image_url )")
      .eq("id", playerId)
      .single();

    if (playerError) {
      throw playerError;
    }

    // Fetch player stats
    const { data: statsData, error: statsError } = await supabase
      .from("player_stat")
      .select("*")
      .eq("player_id", playerId);

    if (statsError && statsError.code !== "PGRST116") {
      // PGRST116 is "No rows returned"
      throw statsError;
    }

    const statsMap = new Map<string, string>();
    statsData?.forEach((row) => {
      statsMap.set(row.stat_name, row.stat_value);
    });

    // Combine the data
    return {
      ...playerData,
      stats: statsMap || null,
    };
  } catch (error) {
    console.error(`Error fetching player data for ${playerId}:`, error);
    return null;
  }
}

/**
 * Gathers statistics for a given list of players.
 *
 * @param playerIds - list of player IDs to compare
 */
export async function comparePlayers(playerIds: number[]) {
  try {
    const players = [];
    for (const id of playerIds) {
      const player = await getPlayerWithStats(id);
      players.push(player);
    }

    return players as FullDropbackPlayerWithStats[];
  } catch (error) {
    console.error("Error comparing players:", error);
    return [];
  }
}
