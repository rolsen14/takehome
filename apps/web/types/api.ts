import z from "zod";

/**
 * For validating raw ESPN error response
 */
export const espnErrorSchema = z.union([
  z.object({
    code: z.string().nonempty(),
  }),
  z.object({
    error: z.string(),
  }),
]);

/**
 * For validating raw ESPN data input
 */
export const espnTeamSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
  slug: z.string(),
  abbreviation: z.string(),
  displayName: z.string().refine((val) => val !== "null", {
    message: 'displayName cannot be "null"',
  }),
  shortDisplayName: z.string(),
  name: z.string().refine((val) => val !== "null", {
    message: 'name cannot be "null"',
  }),
  nickname: z.string(),
  location: z.string().nonempty(),
  color: z.string(),
  isActive: z.literal(true),
  isAllStar: z.boolean(),
  logos: z.array(
    z.object({
      href: z.string(),
    }),
  ),
});

export interface ESPNErrorResponse {
  code: number;
  message?: string;
  details?: string;
}

export interface ESPNTeamResponse {
  sports: ESPNTeamResponseSport[];
}

export interface ESPNTeamResponseSport {
  leagues: ESPNTeamResponseLeague[];
}

export interface ESPNTeamResponseLeague {
  teams: ESPNTeam[];
}

export interface ESPNTeam {
  id: string;
  slug: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  name: string;
  nickname: string;
  location: string;
  color: string;
  isActive: boolean;
  isAllStar: boolean;
  logos: ESPNLogo[];
}

export interface ESPNLogo {
  href: string;
  alt: string;
  width: number;
  height: number;
}

export interface ESPNAthlete {
  id: string;
  name: string;
  teamId: number;
  position: string;
  jerseyNumber: string | null;
  height: number | null;
  weight: number | null;
  year: string | null;
  imageUrl: string | null;
}
