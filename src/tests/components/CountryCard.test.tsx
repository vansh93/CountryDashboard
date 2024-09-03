import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryCard from '../../components/CountryCard';
import { Country } from '../../types/country';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

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

describe('CountryCard Component', () => {
  it('should render country information correctly', () => {
    render(<CountryCard country={mockCountry} onSelect={jest.fn()} selected={false} />);
    
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Capital: Washington D.C.')).toBeInTheDocument();
    expect(screen.getByText('Population: 331,002,651')).toBeInTheDocument();
    expect(screen.getByText('Region: Americas')).toBeInTheDocument();
  });

  it('should call onSelect when checkbox is clicked', () => {
    const onSelectMock = jest.fn();
    render(<CountryCard country={mockCountry} onSelect={onSelectMock} selected={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(onSelectMock).toHaveBeenCalledWith(mockCountry);
  });

  it('should navigate to the details page when "View Details" button is clicked', () => {
    render(<CountryCard country={mockCountry} onSelect={jest.fn()} selected={false} />);
    
    const viewDetailsButton = screen.getByRole('button', { name: /View Details/i });
    fireEvent.click(viewDetailsButton);
    
    expect(mockRouter.push).toHaveBeenCalledWith('/country/United States');
  });

  it('should display checkbox as checked if selected is true', () => {
    render(<CountryCard country={mockCountry} onSelect={jest.fn()} selected={true} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
