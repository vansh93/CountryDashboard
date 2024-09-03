"use client"; // Ensure this is a Client Component

import React from 'react';
import { Country } from '../types/country';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/CountryCard.module.css';
import { useRouter } from 'next/navigation';

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
  selected: boolean;
}

const CountryCard: React.FC<CountryCardProps> = React.memo(({ country, onSelect, selected }) => {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent the card click event when selecting the checkbox
    onSelect(country);
  };

  const handleViewDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the card click event when clicking the button
    router.push(`/country/${country.name.common}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className={styles.card} ref={ref}>
      {inView && (
        <>
        <div>
          <Image
            src={country.flags.svg}
            alt={country.name.common}
            width={100}
            height={60}
            objectFit="contain"
          />
          <h3 className={styles.countryName} title={country.name.common}>
            {truncateText(country.name.common, 15)}
          </h3>
          <p>Capital: {country.capital?.[0]}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <button onClick={handleViewDetails} className={styles.detailsButton}>
            View Details
          </button>
        </div>
        <div>
        <input
            type="checkbox"
            checked={selected}
            onChange={handleSelect}
            className={styles.checkbox}
          />
        </div>
        </>
      )}
    </div>
  );
});

export default CountryCard;
