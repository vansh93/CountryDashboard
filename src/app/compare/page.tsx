"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetail from '../../components/CountryDetail';
import { Country } from '../../types/country';
import styles from '../../styles/Compare.module.css';

const ComparePage: React.FC = () => {
  const [countryOne, setCountryOne] = useState<Country | null>(null);
  const [countryTwo, setCountryTwo] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch country details for both countries when component mounts
  const fetchCountryData = async (countryName: string, setCountry: React.Dispatch<React.SetStateAction<Country | null>>) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      setCountry(response.data[0]);
    } catch (err) {
      setError('Failed to fetch country data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data for both countries when the component mounts or when the names change
  useEffect(() => {
    const selectedCountryOne = localStorage.getItem('selectedCountryOne');
    const selectedCountryTwo = localStorage.getItem('selectedCountryTwo');

    if (selectedCountryOne) {
      fetchCountryData(selectedCountryOne, setCountryOne);
    }
    if (selectedCountryTwo) {
      fetchCountryData(selectedCountryTwo, setCountryTwo);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.compareContainer}>
      {countryOne && <CountryDetail country={countryOne} />}
      {countryTwo && <CountryDetail country={countryTwo} />}
    </div>
  );
};

export default ComparePage;
