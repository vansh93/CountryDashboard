import { sortCountriesByPopulation, filterCountriesByRegion } from '../../utils/countryUtils';
import { Country } from '../../types/country';

const mockCountries: Country[] = [
    {
      name: { common: 'United States' },
      "flags": {
          "png": "https://flagcdn.com/w320/it.png",
          "svg": "https://flagcdn.com/it.svg"
        },
      capital: ['Washington D.C.'],
      population: 331002651,
      region: 'Americas',
      "timezones": [
          "UTC-02:00"
        ],
      "languages": {
          "eng": "English"
        },
      "currencies": {
          "SHP": {
            "name": "Saint Helena pound",
            "symbol": "£"
          }
        },
      "subregion": "Northern Africa",
    },
    {
      name: { common: 'Canada' },
      flags: {
          "png": "https://flagcdn.com/w320/gs.png",
          "svg": "https://flagcdn.com/gs.svg"
      },
      capital: ['Ottawa'],
      population: 37742154,
      region: 'Americas',
      "timezones": [
          "UTC-02:00"
        ],
      "languages": {
          "eng": "English"
        },
      "currencies": {
          "SHP": {
            "name": "Saint Helena pound",
            "symbol": "£"
          }
        },
      "subregion": "Northern Africa",
    },
  ];

describe('countryUtils', () => {
  it('should sort countries by population in ascending order', () => {
    const sortedCountries = sortCountriesByPopulation(mockCountries, 'asc');
    expect(sortedCountries[0].name.common).toBe('Canada');
    expect(sortedCountries[1].name.common).toBe('United States');
  });

  it('should sort countries by population in descending order', () => {
    const sortedCountries = sortCountriesByPopulation(mockCountries, 'desc');
    expect(sortedCountries[0].name.common).toBe('United States');
    expect(sortedCountries[1].name.common).toBe('Canada');
  });

  it('should filter countries by region', () => {
    const filteredCountries = filterCountriesByRegion(mockCountries, 'Americas');
    expect(filteredCountries.length).toBe(2);
  });

  it('should return an empty array if no countries match the region', () => {
    const filteredCountries = filterCountriesByRegion(mockCountries, 'Asia');
    expect(filteredCountries.length).toBe(0);
  });
});
