// src/utils/countryUtils.ts
import { Country } from '../types/country';

export const sortCountriesByPopulation = (
  countries: Country[],
  order: 'asc' | 'desc' = 'asc'
): Country[] => {
  return [...countries].sort((a, b) =>
    order === 'asc' ? a.population - b.population : b.population - a.population
  );
};

export const filterCountriesByRegion = (countries: Country[], region: string): Country[] => {
  if (region === 'All') return countries;
  return countries.filter((country) => country.region === region);
};

export const searchCountries = (countries: Country[], query: string): Country[] => {
  if (!query) return countries;
  return countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()) ||
      (country.capital && country.capital.some(cap => cap.toLowerCase().includes(query.toLowerCase())))
  );
};
