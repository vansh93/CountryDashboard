// src/app/country/[name]/page.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import CountryDetail from '../../../components/CountryDetail';
import { Country } from '../../../types/country';
import axios from 'axios';

interface CountryPageProps {
  country: Country;
}

const CountryPage: React.FC<CountryPageProps> = ({ country }) => {
  return <CountryDetail country={country} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params!;
  const res = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
  const country = res.data[0];

  return {
    props: {
      country,
    },
  };
};

export default CountryPage;
