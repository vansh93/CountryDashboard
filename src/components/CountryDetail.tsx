// src/components/CountryDetail.tsx
import React from 'react';
import { Country } from '../types/country';
import styles from '../styles/CountryDetail.module.css';

interface CountryDetailProps {
  country: Country;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  return (
    <div className={styles.detail}>
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} alt={country.name.common} width={200} height={120} />
      <p><strong>Capital:</strong> {country.capital?.join(', ')}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
      <p><strong>Currencies:</strong> {Object.keys(country.currencies || {}).join(', ')}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
    </div>
  );
};

export default CountryDetail;
