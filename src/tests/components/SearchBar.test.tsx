import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../components/SearchBar';

describe('SearchBar Component', () => {
  const setSearchQueryMock = jest.fn();

  beforeEach(() => {
    setSearchQueryMock.mockClear();
  });

  it('should render the search input with the correct placeholder', () => {
    render(<SearchBar searchQuery="" setSearchQuery={setSearchQueryMock} />);
    
    const searchInput = screen.getByPlaceholderText('Search by country or capital');
    expect(searchInput).toBeInTheDocument();
  });

  it('should display the current search query in the input field', () => {
    render(<SearchBar searchQuery="Canada" setSearchQuery={setSearchQueryMock} />);
    
    const searchInput = screen.getByPlaceholderText('Search by country or capital');
    expect(searchInput).toHaveValue('Canada');
  });

  it('should call setSearchQuery when typing in the search input', () => {
    render(<SearchBar searchQuery="" setSearchQuery={setSearchQueryMock} />);
    
    const searchInput = screen.getByPlaceholderText('Search by country or capital');
    fireEvent.change(searchInput, { target: { value: 'Canada' } });
    
    expect(setSearchQueryMock).toHaveBeenCalledWith('Canada');
  });

  it('should call setSearchQuery with an empty string when input is cleared', () => {
    render(<SearchBar searchQuery="Canada" setSearchQuery={setSearchQueryMock} />);
    
    const searchInput = screen.getByPlaceholderText('Search by country or capital');
    fireEvent.change(searchInput, { target: { value: '' } });
    
    expect(setSearchQueryMock).toHaveBeenCalledWith('');
  });
});
