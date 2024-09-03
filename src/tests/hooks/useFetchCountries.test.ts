import { renderHook, act } from '@testing-library/react-hooks';
import useFetchCountries from '../../hooks/useFetchCountries';
import axios from 'axios';
import { Country } from '../../types/country';

jest.mock('axios');

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
      }
];

describe('useFetchCountries Hook', () => {
    it('should fetch countries and set loading to false', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: mockCountries });
      
      const { result, waitForNextUpdate } = renderHook(() => useFetchCountries());
      
      expect(result.current.loading).toBe(true);
      await waitForNextUpdate();
      
      expect(result.current.loading).toBe(false);
      expect(result.current.countries).toEqual(mockCountries);
      expect(result.current.error).toBeNull();
    });
  
    it('should set error when fetch fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));
      
      const { result, waitForNextUpdate } = renderHook(() => useFetchCountries());
      
      await waitForNextUpdate();
      
      expect(result.current.loading).toBe(false);
      expect(result.current.countries).toEqual([]);
      expect(result.current.error).toBe('Network Error');
    });
  });
