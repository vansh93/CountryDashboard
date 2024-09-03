// src/components/Header.tsx
import React from 'react';
import useDarkMode from '../hooks/useDarkMode';
import SearchBar from './SearchBar';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <header>
      <h1>Country Data Dashboard</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </header>
  );
};

export default Header;
