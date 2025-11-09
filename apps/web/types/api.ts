export interface ESPNErrorResponse {
    code: number;
    message?: string;
    details?: string;
}

export interface ESPNTeamResponse {
    sports: ESPNTeamResponseSport[]
}

export interface ESPNTeamResponseSport {
    leagues: ESPNTeamResponseLeague[]
}

export interface ESPNTeamResponseLeague {
    teams: ESPNTeam[]
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
    
}