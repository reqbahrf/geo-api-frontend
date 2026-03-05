export interface GeoData {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string; // coordinates in "lat,lon" format
  postal?: string;
  org?: string;
  timezone?: string;
  readme?: string;
}

export interface GeoError {
  error: string;
  details?: unknown;
}

export interface SearchHistoryItem {
  id: string;
  ip: string;
  data: GeoData;
  timestamp: Date;
}
