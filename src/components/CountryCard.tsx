// src/components/CountryCard.tsx
import React from 'react';
import { Country } from '../types/country';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/CountryCard.module.css';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

const CountryCard: React.FC<CountryCardProps> = React.memo(({ country, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={styles.card} onClick={onClick} ref={ref}>
      {inView && (
        <>
          <Image
            src={country.flags.svg}
            alt={country.name.common}
            width={100}
            height={60}
            layout="responsive"
          />
          <h3>{country.name.common}</h3>
          <p>Capital: {country.capital?.[0]}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
        </>
      )}
    </div>
  );
});

export default CountryCard;
