import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, ArrowRight, TrendingUp, Globe, Camera, Compass,
  Mountain, Waves, Building2, Trees, Sunset, Star,
  MapPin, Upload, Users, Image
} from 'lucide-react';
import Masonry from 'react-masonry-css';
import PhotoCard from '../components/PhotoCard';
import Marquee from '../components/Marquee';
import ParallaxText from '../components/ParallaxText';
import MagneticButton from '../components/MagneticButton';
import api, { toArrayPayload } from '../services/api';
import './HomePage.css';

const MapView = lazy(() => import('../components/MapView'));

/* ── Data ─────────────────────────────── */
const CATEGORIES = [
  { label: 'Mountains', icon: Mountain, color: '#7B8FA3' },
  { label: 'Beaches',   icon: Waves,    color: '#4A9FC4' },
  { label: 'Cities',    icon: Building2,color: '#C07050' },
  { label: 'Forests',   icon: Trees,    color: '#5A9A70' },
  { label: 'Sunsets',   icon: Sunset,   color: '#D4854A' },
  { label: 'Explore',   icon: Compass,  color: '#9A75C8' },
];

const RECOMMENDED = [
  {
    name: 'Amalfi Coast',
    tag: 'Coastal',
    location: 'Italy, Europe',
    img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80',
  },
  {
    name: 'Cappadocia',
    tag: 'Adventure',
    location: 'Türkiye, Asia',
    img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
  },
  {
    name: 'Kyoto',
    tag: 'Culture',
    location: 'Japan, Asia',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
  },
  {
    name: 'Patagonia',
    tag: 'Wilderness',
    location: 'Argentina, S. America',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
  },
];

const STATS = [
  { value: '2M+',  label: 'Photos', StatIcon: Image },
  { value: '180+', label: 'Countries', StatIcon: Globe },
  { value: '50K+', label: 'Explorers', StatIcon: Users },
  { value: '99%',  label: 'Free',   StatIcon: Star },
];

const PHRASES = [
  'Find your next adventure...',
  'Explore hidden mountain trails...',
  'Discover secret beaches...',
  'Wander through ancient cities...',
  'Chase golden hour anywhere...',
];

/* Mosaic: 6 curated placeholder images that look great together */
const MOSAIC_IMGS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',  // mountains
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',  // lake
  'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&q=80',  // beach
  'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80',  // city night
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',  // peak
  'https://images.unsplash.com/photo-1502786129293-79981df4e689?w=600&q=80',  // forest
];

/* ── Component ─────────────────────────── */
const HomePage = () => {
  const [photos, setPhotos]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [viewMode, setViewMode]       = useState('gallery');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const navigate = useNavigate();

  /* Typewriter */
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typed, setTyped]         = useState('');
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const phrase = PHRASES[phraseIdx];
      if (!deleting) {
        setTyped(phrase.substring(0, typed.length + 1));
        if (typed.length === phrase.length) setTimeout(() => setDeleting(true), 2200);
      } else {
        setTyped(phrase.substring(0, typed.length - 1));
        if (typed === '') {
          setDeleting(false);
          setPhraseIdx(p => (p + 1) % PHRASES.length);
        }
      }
    }, deleting ? 28 : 72);
    return () => clearTimeout(t);
  }, [typed, deleting, phraseIdx]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    api.get('/photos')
      .then(({ data }) => setPhotos(toArrayPayload(data)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const photoList = Array.isArray(photos) ? photos : [];
  const filteredPhotos = activeCategory
    ? photoList.filter(p =>
        p.tags?.some(t => t.toLowerCase().includes(activeCategory.toLowerCase())) ||
        p.title?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        p.country?.toLowerCase().includes(activeCategory.toLowerCase()))
    : photoList;

  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="hp-root">

      {/* ══════════════════════════════════════
          HERO — split left/right
          ══════════════════════════════════════ */}
      <section className={`hp-hero ${heroVisible ? 'vis' : ''}`}>

        {/* Background layers */}
        <div className="hp-hero-bg">
          <div className="hp-bg-mesh" />
          <div className="hp-orb hp-orb-a" />
          <div className="hp-orb hp-orb-b" />
          <div className="hp-orb hp-orb-c" />
          <div className="hp-grid-lines" />
          <div className="hp-noise" />
        </div>

        {/* ── LEFT COLUMN ── */}
        <div className="hp-hero-left">

          {/* Pill badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hp-hero-badge"
          >
            <span className="hp-badge-dot" />
            <Star size={11} />
            <span>Executive Community Journal · Est. 2024</span>
          </motion.div>

          {/* Big headline */}
          <h1 className="hp-hero-h1">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.9, y: 0 }} transition={{ delay: 0.3 }} className="hp-line hp-line-1">Where Every</motion.span>
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1 }} className="hp-line hp-line-accent">JOURNEY</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.9, y: 0 }} transition={{ delay: 0.7 }} className="hp-line hp-line-3">Becomes a</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="hp-line hp-line-4">STORY.</motion.span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="hp-hero-desc">
            Alishagram is a curated journal of human connection — 
            an elite community of explorers capturing the world's most breathtaking frames.
          </motion.p>

          {/* Search */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="hp-hero-search" 
            onSubmit={handleSearch}
          >
            <Search size={18} className="hp-si" />
            <input
              id="homepage-search"
              className="hp-hero-input"
              type="text"
              placeholder={typed + '|'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <MagneticButton type="submit" id="homepage-search-submit" className="hp-hero-btn">
              <span>Search</span>
              <ArrowRight size={15} />
            </MagneticButton>
          </motion.form>

          {/* Trending chips */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="hp-trending">
            <span className="hp-trend-label">
              <TrendingUp size={13} /> Trending
            </span>
            {['Santorini', 'Patagonia', 'Kyoto', 'Iceland', 'Bali'].map(t => (
              <button key={t} className="hp-chip" onClick={() => navigate(`/search?q=${t}`)}>
                {t}
              </button>
            ))}
          </motion.div>

          {/* Hero inline stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="hp-hero-stats">
            {STATS.map(({ value, label, StatIcon: icon }) => (
              <div key={label} className="hp-hstat">
                {React.createElement(icon, { size: 16, className: 'hp-hstat-icon' })}
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — photo mosaic ── */}
        <div className="hp-hero-right">
          <div className="hp-mosaic">
            {/* top row: 1 tall + 1 short */}
            <div className="hp-mosaic-col hp-mosaic-col-a">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="hp-mosaic-item hp-mi-tall">
                <img src={MOSAIC_IMGS[0]} alt="Mountain" loading="lazy"/>
                <div className="hp-mi-overlay">
                  <MapPin size={12}/> Dolomites, Italy
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="hp-mosaic-item hp-mi-short">
                <img src={MOSAIC_IMGS[1]} alt="Lake" loading="lazy"/>
                <div className="hp-mi-overlay">
                  <MapPin size={12}/> Banff, Canada
                </div>
              </motion.div>
            </div>

            {/* middle col: short top + tall bottom */}
            <div className="hp-mosaic-col hp-mosaic-col-b">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="hp-mosaic-item hp-mi-short">
                <img src={MOSAIC_IMGS[2]} alt="Beach" loading="lazy"/>
                <div className="hp-mi-overlay">
                  <MapPin size={12}/> Maldives
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="hp-mosaic-item hp-mi-tall">
                <img src={MOSAIC_IMGS[3]} alt="City" loading="lazy"/>
                <div className="hp-mi-overlay">
                  <MapPin size={12}/> Tokyo, Japan
                </div>
              </motion.div>
            </div>

            {/* right col: full-height single */}
            <div className="hp-mosaic-col hp-mosaic-col-c">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="hp-mosaic-item hp-mi-full">
                <img src={MOSAIC_IMGS[4]} alt="Peak" loading="lazy"/>
                <div className="hp-mi-overlay">
                  <MapPin size={12}/> Everest Base, Nepal
                </div>
              </motion.div>
            </div>

            {/* Floating decorative cards */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="hp-float-card hp-fc-1">
              <Camera size={14} />
              <div>
                <strong>12 new stories</strong>
                <span>just uploaded</span>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, delay: 3, ease: "easeInOut" }} className="hp-float-card hp-fc-2">
              <Upload size={14} />
              <div>
                <strong>Share yours</strong>
                <span>Join 50K+ explorers</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          className="hp-scroll-cue"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          aria-label="Scroll down"
        >
          <div className="hp-scroll-mouse">
            <div className="hp-scroll-dot" />
          </div>
        </button>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE DIVIDER
          ══════════════════════════════════════ */}
      <div style={{ position: 'relative', height: '15vw', overflow: 'hidden', background: '#0A0C14', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Marquee text="THE JOURNEY IS THE DESTINATION · EXPLORE THE UNKNOWN · CAPTURE THE MOMENT · " speed={30} />
      </div>

      {/* ══════════════════════════════════════
          CATEGORY CARDS
          ══════════════════════════════════════ */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="hp-categories"
      >
        <div className="hp-section-header">
          <div>
            <p className="hp-eyebrow">Browse by Theme</p>
            <h2 className="hp-section-title">Explore Collections</h2>
          </div>
          <button className="hp-text-btn" onClick={() => navigate('/search')} id="explore-all-btn">
            View all <ArrowRight size={15} />
          </button>
        </div>
        <div className="hp-cat-grid">
          {CATEGORIES.map(({ label, icon, color }) => (
            <button
              key={label}
              className={`hp-cat-card ${activeCategory === label ? 'cat-on' : ''}`}
              onClick={() => setActiveCategory(activeCategory === label ? null : label)}
              style={{ '--cc': color }}
            >
              <div className="hp-cat-icon">{React.createElement(icon, { size: 22 })}</div>
              <span className="hp-cat-label">{label}</span>
              {activeCategory === label && <div className="hp-cat-pip" />}
            </button>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          RECOMMENDATIONS
          ══════════════════════════════════════ */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="hp-reco"
      >
        <div className="hp-section-header">
          <div>
            <p className="hp-eyebrow">Curated for You</p>
            <h2 className="hp-section-title">Recommended Destinations</h2>
          </div>
          <button className="hp-text-btn" onClick={() => navigate('/search')} id="reco-all-btn">
            See all <ArrowRight size={15} />
          </button>
        </div>
        <div className="hp-reco-grid">
          {RECOMMENDED.map(({ name, tag, location, img }) => (
            <div
              key={name}
              className="hp-reco-card"
              onClick={() => navigate(`/search?q=${encodeURIComponent(name)}`)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/search?q=${encodeURIComponent(name)}`)}
              aria-label={`Explore ${name}`}
            >
              <img
                src={img}
                alt={name}
                className="hp-reco-img"
                loading="lazy"
                onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = MOSAIC_IMGS[0];
                }}
              />
              <div className="hp-reco-overlay">
                <span className="hp-reco-tag">{tag}</span>
                <div className="hp-reco-name">{name}</div>
                <div className="hp-reco-meta">
                  <MapPin size={11} /> {location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          GALLERY
          ══════════════════════════════════════ */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="hp-gallery"
      >
        <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
           <ParallaxText className="parallax-giant-text">ALISHAGRAM EXHIBITION</ParallaxText>
        </div>
        <div className="hp-section-header">
          <div>
            <p className="hp-eyebrow">Community Picks</p>
            <h2 className="hp-section-title">
              {activeCategory ? `${activeCategory} Stories` : 'Featured Stories'}
            </h2>
          </div>
          <div className="hp-toggle-wrap">
            <button id="view-gallery-btn" className={`hp-tog ${viewMode==='gallery'?'tog-on':''}`} onClick={() => setViewMode('gallery')}>
              <Camera size={15} /> Grid
            </button>
            <button id="view-map-btn" className={`hp-tog ${viewMode==='map'?'tog-on':''}`} onClick={() => setViewMode('map')}>
              <Globe size={15} /> Map
            </button>
          </div>
        </div>

        {loading ? (
          <div className="hp-skel-grid">
            {[...Array(6)].map((_,i) => <div key={i} className="hp-skel" style={{'--d':`${i*0.1}s`}} />)}
          </div>
        ) : viewMode === 'gallery' ? (
          filteredPhotos.length > 0 ? (
            <Masonry breakpointCols={{default:3,1200:2,700:1}} className="hp-masonry" columnClassName="hp-masonry-col">
              {filteredPhotos.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <PhotoCard photo={p} />
                </motion.div>
              ))}
            </Masonry>
          ) : (
            <div className="hp-empty">
              <Compass size={44} className="hp-empty-ico" />
              <p>No stories yet for "{activeCategory}"</p>
              <button className="hp-clear-btn" onClick={() => setActiveCategory(null)}>Clear Filter</button>
            </div>
          )
        ) : (
          <div className="hp-map-wrap">
            <Suspense fallback={null}>
              <MapView photos={filteredPhotos} />
            </Suspense>
          </div>
        )}

        {!loading && viewMode==='gallery' && filteredPhotos.length>0 && (
          <div className="hp-more-wrap">
            <button className="hp-more-btn" onClick={() => navigate('/search')} id="load-more-btn">
              Explore More <ArrowRight size={15}/>
            </button>
          </div>
        )}
      </motion.section>

      {/* ══════════════════════════════════════
          CTA
          ══════════════════════════════════════ */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="hp-cta"
      >
        <div className="hp-cta-glow" />
        <div className="hp-cta-inner">
          <TrendingUp size={30} className="hp-cta-icon" />
          <h2 className="hp-cta-title">Ready to share your story?</h2>
          <p className="hp-cta-sub">
            Join thousands of explorers documenting their journey.
            Upload your travel moments and inspire the world.
          </p>
          <div className="hp-cta-btns">
            <MagneticButton className="hp-cta-prim" onClick={() => navigate('/upload')} id="cta-upload-btn">Start Sharing</MagneticButton>
            <MagneticButton className="hp-cta-out"  onClick={() => navigate('/register')} id="cta-join-btn">Join the Community</MagneticButton>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default HomePage;
