import { ESPNErrorResponse, espnErrorSchema } from "../types/api";

/**
 * Helper function to determine if a given input represents an error
 * from the ESPN hidden APIs
 *
 * @param data raw espn response
 * @returns boolean representing if input is an error
 */
export function isESPNError(data: unknown): data is ESPNErrorResponse {
  const result = espnErrorSchema.safeParse(data);
  return result.success;
}
