export interface GPSCoordinatesType {
  latitude: number;         
  longitude: number;
}

export interface CityAPIResponseType {
  address: {
    city?: string;              // Sometimes, the reverse geolocation API provides a city, 
    neighbourhood?: string;     // other times, a neighbourhood or a town.
    town?: string;
    state: string;
  }
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
type bob = Partial<weatherAPIResponseType>