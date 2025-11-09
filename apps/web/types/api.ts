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
