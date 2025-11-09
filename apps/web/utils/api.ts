import { ESPNErrorResponse } from "../types/api";

export function isESPNError(data: unknown): data is ESPNErrorResponse {
    // TODO: validate ESPN error response format + consistency
    // across hidden API endpoints
    if (data !== null && typeof data === 'object' && ('code' in data || 'error' in data)) {
        return true;
    }
    return false;
  }