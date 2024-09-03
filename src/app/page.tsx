"use client"; // Ensure this is a Client Component

import React, { useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import { sortCountriesByPopulation, filterCountriesByRegion, searchCountries } from '../utils/countryUtils';
import styles from '../styles/Home.module.css';
import { Country } from '../types/country';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchCountries();
  }, []);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountries((prev) => {
      if (prev.includes(country)) {
        return prev.filter((c) => c.name.common !== country.name.common);
      } else if (prev.length < 2) {
        return [...prev, country];
      } else {
        return prev;
      }
    });
  };

  const handleCompare = () => {
    if (selectedCountries.length === 2) {
      localStorage.setItem('selectedCountryOne', selectedCountries[0].name.common);
      localStorage.setItem('selectedCountryTwo', selectedCountries[1].name.common);
      router.push('/compare');
    }
  };

  const filteredCountries = filterCountriesByRegion(countries, region);
  const searchedCountries = searchCountries(filteredCountries, searchQuery);
  const sortedCountries = sortCountriesByPopulation(searchedCountries, sortOrder);

  return (
    <div className={styles.container}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} /><br/>
      {selectedCountries.length === 2 && (
        <div className={styles.compareButtonContainer}>
          <button onClick={handleCompare} className={styles.compareButton}>
            Compare
          </button>
        </div>
      )}
      <div className={styles.grid}>
        {sortedCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            country={country}
            onSelect={handleSelectCountry}
            selected={selectedCountries.includes(country)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
