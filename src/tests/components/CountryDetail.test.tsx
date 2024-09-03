import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryDetail from '../../components/CountryDetail';
import { Country } from '../../types/country';

const mockCountry: Country = {
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
  };

describe('CountryDetail Component', () => {
  it('should render detailed country information correctly', () => {
    render(<CountryDetail country={mockCountry} />);
    
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Capital: Washington D.C.')).toBeInTheDocument();
    expect(screen.getByText('Population: 331,002,651')).toBeInTheDocument();
    expect(screen.getByText('Region: Americas')).toBeInTheDocument();
    expect(screen.getByText('Subregion: Northern America')).toBeInTheDocument();
    expect(screen.getByText('Timezones: UTC-05:00')).toBeInTheDocument();
    expect(screen.getByText('Currencies: United States Dollar')).toBeInTheDocument();
    expect(screen.getByText('Languages: English')).toBeInTheDocument();
  });

  it('should display flag image with correct src and alt attributes', () => {
    render(<CountryDetail country={mockCountry} />);
    
    const flagImage = screen.getByRole('img', { name: /United States/i });
    expect(flagImage).toHaveAttribute('src', 'https://restcountries.com/v3.1/flags/us.svg');
    expect(flagImage).toHaveAttribute('alt', 'United States');
  });
});
