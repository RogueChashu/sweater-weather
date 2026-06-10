export interface GPSCoordinatesType {
  latitude: number;         
  longitude: number;
}

export interface DaysForecast  {
  datetime: string;       // ex: "2025-10-10" year-month-day
  icon: string;           // ex: "clear-day"
  temp: number;           // ex: 48.5 (comes in °F by default)
  conditions: string;     // ex: "cloudy"
  tempmin: number;        // ex: 33.5 (comes in °F by default)
  tempmax: number;        // ex: 62.5 (comes in °F by default)
}

export type DaysForecastType = DaysForecast[];

export interface weatherAPIResponseType {
  resolvedAddress: string;
  currentConditions: {
    icon: string;               // ex: "clear-day"
    temp: number;               // ex: 58.2 (temp comes in °F by default)
    conditions: string;         // ex: "cloudy"
  }
  days: DaysForecastType;
} 

export type GeocodingProperties = {
  city: string;
  address_line1: string;
  state_code: string;
  country: string;
  lat: number;
  lon: number;
}

export type GeocodingData = {
  properties: GeocodingProperties;
}

export type GeocodingAPIResponseType = {
  features: GeocodingData[];
}
