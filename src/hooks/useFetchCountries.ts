import { useState, useEffect } from 'react';
import axios from 'axios';
import { Country } from '../types/country';

const useFetchCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      // Check if countries are already in localStorage
      const cachedData = localStorage.getItem('countries');
      if (cachedData) {
        setCountries(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        localStorage.setItem('countries', JSON.stringify(response.data)); // Cache the data
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useFetchCountries;
