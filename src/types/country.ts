// src/types/country.ts
export interface Country {
    name: {
      common: string;
    };
    capital: string[];
    region: string;
    subregion: string;
    population: number;
    flags: {
      svg: string;
      png: string;
    };
    currencies: Record<string, any>;
    languages: Record<string, string>;
    timezones: string[];
  }
  