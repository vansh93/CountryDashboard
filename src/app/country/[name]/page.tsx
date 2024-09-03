"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import CountryDetail from '../../../components/CountryDetail';
import { Country } from '../../../types/country';

const CountryDetailPage = () => {
  const {name} = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!name) return;

    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        console.log(response)
        setCountry(response.data[0]);
      } catch (err) {
        setError('Failed to fetch country data');
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!country) return <p>No country data found.</p>;

  return <CountryDetail country={country} />;
};

export default CountryDetailPage;
