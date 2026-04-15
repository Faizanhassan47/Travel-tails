import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import api from '../services/api';
import './SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const { data } = await api.get(`/photos/search?q=${query}`);
      setResults(data);
    } catch (error) {
      console.error('Search failed', error);
      setResults([]);
    }
    setLoading(false);
  };

  // Auto search on enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="kreativ-explore">
      <div className="bg-blob blob-red"></div>
      <div className="bg-blob blob-blue"></div>
      <div className="explore-header-minimal">
        <h1 className="title-giant">Explore</h1>
      </div>

      <div className="explore-content">
        <button onClick={() => navigate(-1)} className="minimal-back-btn">
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>

        <h1 className="explore-title-main">Discover / World</h1>

        <div className="search-field-minimal">
          <input 
            type="text" 
            className="minimal-search-input" 
            placeholder="Type city, country..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>

        {searched && (
          <div className="results-info-minimal">
            {loading ? 'Sifting through memories...' : `${results.length} Stories found for "${query}"`}
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div className="no-results-minimal">
            <h2>No memories found in this region.</h2>
          </div>
        )}

        <div className="explore-grid">
          {results.map(photo => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

