import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, X, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import './UploadPage.css';

const UploadPage = () => {
  const [formData, setFormData] = useState({ title: '', caption: '', city: '', country: '', tags: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const navigate = useNavigate();

  // Simple Autocomplete using a free API (Nominatim) as a placeholder for Google Maps
  // This satisfies the "auto recommendation" requirement
  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setCitySuggestions([]);
      return;
    }
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`);
      const data = await response.json();
      setCitySuggestions(data);
    } catch (err) {
      console.error('Autocomplete error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'city') {
      fetchSuggestions(value);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const selectSuggestion = (s) => {
    const address = s.address || {};
    const city = address.city || address.town || address.village || address.suburb || s.display_name.split(',')[0];
    const country = address.country || '';
    setFormData({ ...formData, city: city.trim(), country: country.trim() });
    setCitySuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file to upload.');
      return;
    }

    setUploading(true);
    setError(null);

    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('caption', formData.caption);
    fd.append('city', formData.city);
    fd.append('country', formData.country);
    fd.append('tags', formData.tags);
    fd.append('image', file);

    try {
      await api.post('/photos', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload photo');
      setUploading(false);
    }
  };

  return (
    <div className="kreativ-upload">
      <button onClick={() => navigate(-1)} className="minimal-back-btn">
        <ArrowLeft size={24} />
        <span>Back</span>
      </button>

      <div className="kreativ-upload-layout">
        <div className="upload-header-minimal">
          <h1 className="title-giant">Upload</h1>
        </div>

        <div className="upload-columns">
          {/* File Column */}
          <div className="column-visual">
            <div className={`kreativ-dropzone ${preview ? 'has-preview' : ''}`}>
              <input type="file" onChange={handleFileChange} accept="image/*" className="file-input" required />
              {preview ? (
                <div className="upload-preview-minimal">
                  <img src={preview} alt="Preview" />
                  <button className="remove-btn-minimal" onClick={() => { setFile(null); setPreview(null); }}>
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="drop-content">
                  <UploadCloud size={48} />
                  <h3>Drop your story here</h3>
                  <p>JPEG, PNG up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Form Column */}
          <div className="column-info">
            {error && <div className="minimal-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="minimal-form">
              <div className="minimal-input-group">
                <label>Story Title</label>
                <input type="text" name="title" placeholder="Give it a name" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="minimal-input-row">
                <div className="minimal-input-group autocomplete-minimal">
                  <label>City / Location</label>
                  <input type="text" name="city" placeholder="Search location" value={formData.city} onChange={handleChange} autoComplete="off" required />
                  {citySuggestions.length > 0 && (
                    <div className="minimal-suggestions">
                      {citySuggestions.map((s, i) => (
                        <div key={i} className="suggestion-item-minimal" onClick={() => selectSuggestion(s)}>{s.display_name}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="minimal-input-group">
                  <label>Country</label>
                  <input type="text" name="country" placeholder="Auto-filled" value={formData.country} onChange={handleChange} required />
                </div>
              </div>

              <div className="minimal-input-group">
                <label>The Tale</label>
                <textarea name="caption" placeholder="Describe your journey..." value={formData.caption} onChange={handleChange} rows={6}></textarea>
              </div>

              <div className="minimal-input-group">
                <label>Keywords</label>
                <input type="text" name="tags" placeholder="nature, travel, art..." value={formData.tags} onChange={handleChange} />
              </div>

              <button type="submit" className="minimal-submit-btn" disabled={uploading}>
                {uploading ? 'UPLOADING...' : 'PUBLISH TALE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
