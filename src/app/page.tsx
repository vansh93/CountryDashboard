// src/pages/index.tsx
"use client";
import React, { useState, useMemo, useCallback } from 'react';
import useFetchCountries from '../hooks/useFetchCountries';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import { sortCountriesByPopulation, filterCountriesByRegion, searchCountries } from '../utils/countryUtils';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const { countries, loading, error } = useFetchCountries();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleCountryClick = useCallback((country: Country) => {
    console.log(country);
  }, []);

  const filteredCountries = useMemo(
    () => filterCountriesByRegion(countries, region),
    [countries, region]
  );
  
  const searchedCountries = useMemo(
    () => searchCountries(filteredCountries, searchQuery),
    [filteredCountries, searchQuery]
  );

  const sortedCountries = useMemo(
    () => sortCountriesByPopulation(searchedCountries, sortOrder),
    [searchedCountries, sortOrder]
  );

  return (
    <div className={styles.container}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className={styles.grid}>
        {sortedCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            country={country}
            onClick={() => handleCountryClick(country)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
