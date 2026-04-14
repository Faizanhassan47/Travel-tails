import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PhotoCard from '../components/PhotoCard';
import api from '../services/api';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
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

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 24px', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '800' }}>Explore the World</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Discover breathtaking destinations through the eyes of fellow travelers.
        </p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto 60px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ 
              position: 'absolute', 
              left: '18px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)',
              pointerEvents: 'none'
            }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by city, country, or tags..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ paddingLeft: '52px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0 32px' }}>
            {loading ? 'Searching...' : 'Explore'}
          </button>
        </form>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div className="animate-float" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Searching for amazing views...</div>
        </div>
      )}

      {searched && !loading && results.length === 0 && (
        <div className="glass-card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px', maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ marginBottom: '12px' }}>No matches found</h3>
          <p>We couldn't find any photos for "{query}". Try searching for something else like "Japan", "Mountain", or "Sunset".</p>
        </div>
      )}

      <div className="photo-grid">
        {results.map(photo => (
          <PhotoCard key={photo._id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
