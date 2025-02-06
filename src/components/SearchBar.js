import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-bar">
      <ion-icon name="search-outline"></ion-icon>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button 
          className="clear-search" 
          onClick={() => onSearchChange('')}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
      )}
    </div>
  );
};

export default SearchBar; 