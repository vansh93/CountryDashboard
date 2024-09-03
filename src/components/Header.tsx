"use client"; // Ensure this is a Client Component

import React from 'react';
import useDarkMode from '../hooks/useDarkMode';
import SearchBar from './SearchBar';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Country Data Dashboard</h1>
      <div className={styles.searchBar}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <button onClick={toggleTheme} className={styles.toggleButton}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </header>
  );
};

export default Header;
