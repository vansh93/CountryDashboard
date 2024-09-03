import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../app/page';
import { Country } from '../../types/country';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next/navigation';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(), // Correctly mock useRouter as a jest function
}));

// Define a mock for useRouter using TypeScript's type assertion
const mockRouter = {
  push: jest.fn(),
};

// Use jest.fn() directly for mocking and cast to the correct type
jest.mock('next/navigation', () => ({
    useRouter: () => mockRouter, // Use function to return mockRouter object
  }));

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

describe('Home Component', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCountries });
  });

  it('should fetch and render countries', async () => {
    render(<Home />);
    
    expect(await screen.findByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('should enable "Compare" button when two countries are selected', async () => {
    render(<Home />);
    
    const firstCheckbox = await screen.findAllByRole('checkbox')[0];
    const secondCheckbox = await screen.findAllByRole('checkbox')[1];
    
    fireEvent.click(firstCheckbox);
    fireEvent.click(secondCheckbox);
    
    const compareButton = screen.getByRole('button', { name: /Compare/i });
    expect(compareButton).toBeEnabled();
  });

  it('should navigate to compare page when "Compare" button is clicked', async () => {
    render(<Home />);
    
    const firstCheckbox = await screen.findAllByRole('checkbox')[0];
    const secondCheckbox = await screen.findAllByRole('checkbox')[1];
    
    fireEvent.click(firstCheckbox);
    fireEvent.click(secondCheckbox);
    
    const compareButton = screen.getByRole('button', { name: /Compare/i });
    fireEvent.click(compareButton);
    
    expect(mockRouter.push).toHaveBeenCalledWith('/compare');
  });

  it('should not enable "Compare" button when less than two countries are selected', async () => {
    render(<Home />);
    
    const firstCheckbox = await screen.findAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);
    
    const compareButton = screen.getByRole('button', { name: /Compare/i });
    expect(compareButton).toBeDisabled();
  });
});
