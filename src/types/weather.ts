export type WeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    windspeed_10m: string;
    precipitation: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    windspeed_10m: number[];
    precipitation: number[];
  };
};

export type HourlyData = {
  time: string;
  temperature: number;
  windspeed: number;
  precipitation: number;
};
