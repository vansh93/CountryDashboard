import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/Header';

describe('Header Component', () => {
  const setSearchQueryMock = jest.fn();
  const toggleThemeMock = jest.fn();

  beforeEach(() => {
    setSearchQueryMock.mockClear();
    toggleThemeMock.mockClear();
  });

  it('should render the application title', () => {
    render(
      <Header 
        searchQuery=""
        setSearchQuery={setSearchQueryMock}
      />
    );
    
    expect(screen.getByText('Country Data Dashboard')).toBeInTheDocument();
  });

  it('should render the search input with the correct placeholder', () => {
    render(
      <Header 
        searchQuery=""
        setSearchQuery={setSearchQueryMock}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search by country or capital');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
  });

  it('should call setSearchQuery when typing in the search input', () => {
    render(
      <Header 
        searchQuery=""
        setSearchQuery={setSearchQueryMock}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search by country or capital');
    fireEvent.change(searchInput, { target: { value: 'Canada' } });
    
    expect(setSearchQueryMock).toHaveBeenCalledWith('Canada');
  });

  it('should render the "Toggle Dark Mode" button with the correct text for light mode', () => {
    render(
      <Header 
        searchQuery=""
        setSearchQuery={setSearchQueryMock}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /Switch to Dark Mode/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should render the "Toggle Dark Mode" button with the correct text for dark mode', () => {
    render(
      <Header 
        searchQuery=""
        setSearchQuery={setSearchQueryMock}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /Switch to Light Mode/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should call toggleTheme when "Toggle Dark Mode" button is clicked', () => {
    render(
      <Header 
        searchQuery=""
        setSearchQuery={setSearchQueryMock}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /Switch to Dark Mode/i });
    fireEvent.click(toggleButton);
    
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
